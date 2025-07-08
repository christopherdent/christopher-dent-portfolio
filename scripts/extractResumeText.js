#!/usr/bin/env node
import fs from 'fs'
import fsp from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import pdfParse from 'pdf-parse'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function run() {
  try {
    // 1) resolve the PDF path
    const pdfPath = path.resolve(__dirname, '../public/pdf/ChristopherDentResume.pdf')
    
    if (!fs.existsSync(pdfPath)) {
      console.error(`❌ PDF not found at ${pdfPath}`)
      process.exit(1)
    }

    // 2) Fix the pdf-parse bug by creating the missing test file
    const testDir = path.resolve('./test/data')
    const testFile = path.join(testDir, '05-versions-space.pdf')
    
    if (!fs.existsSync(testFile)) {
      console.log('🔧 Creating missing test file for pdf-parse...')
      fs.mkdirSync(testDir, { recursive: true })
      // Create a minimal dummy PDF - just copy our actual PDF
      const pdfBuffer = await fsp.readFile(pdfPath)
      fs.writeFileSync(testFile, pdfBuffer)
    }

    // 3) read and parse PDF
    const pdfBuffer = await fsp.readFile(pdfPath)
    const { text } = await pdfParse(pdfBuffer)

    // 4) write out to server/utils
    const outDir = path.resolve(__dirname, '../server/utils')
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

    const outPath = path.join(outDir, 'resumeText.txt')
    await fsp.writeFile(outPath, text, 'utf8')

    console.log(`✅ Extracted resume text to ${outPath}`)
    console.log(`📊 Extracted ${text.length} characters`)
    
    // Clean up the test file
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true })
      console.log('🧹 Cleaned up test files')
    }

  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

run()