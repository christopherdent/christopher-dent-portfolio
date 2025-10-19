declare module 'pdf-parse' {
  function pdf(data: Buffer | Uint8Array): Promise<{ text: string }>
  export default pdf
}
