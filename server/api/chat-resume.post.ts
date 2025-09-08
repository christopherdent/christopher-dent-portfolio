import { defineEventHandler, readBody } from "h3";
import { openai } from "~/utils/openaiClient";

export default defineEventHandler(async (event) => {
  const { question } = await readBody<{ question?: string }>(event);

  // Fallback to a default prompt if no question provided
  const userQuestion = (question && String(question).trim()) || "Give me a quick overview of Chris.";



  // const resumePath = path.resolve(process.cwd(), 'public/pdf/resumeText.txt')
  // const resumeText = await readFile(resumePath, 'utf-8')
  // READ from public/ instead of server/utils:
  //  const resumePath = '/pdf/resumeText.txt';
  // const resumeText = await readFile(resumePath, 'utf-8')

  const resumeText = `Christopher James Dent 
    
    Full Stack Software Engineer / 
    Former Standards Development Manager 
    christopherdent01@gmail.com  
    Saint Augustine, Florida, USA 
    240.246.5915 
    https://linkedin.com/in/christopher-james-dent
    
    About 
    
# Christopher James Dent

**Full Stack Software Engineer / Project & Program Leadership**  
📧 christopherdent01@gmail.com  
📍 Saint Augustine, Florida, USA  
📞 240.246.5915  
🔗 [LinkedIn](https://linkedin.com/in/christopher-james-dent)

---

## About
Results-oriented software engineer with 3+ years of experience in full-stack web development and over a decade of project management in scientific standards development. Currently building enterprise-grade solutions in VueJS, React, Node.js, TypeScript, and Ruby on Rails at OpsCompass.  

Experienced with AWS and Azure serverless architectures (Lambda, Functions, S3, Step Functions) and developing cloud-native applications, including internal AI-driven tools for document summarization and intelligent data extraction using LLMs and vector-based retrieval systems.  

Known for bridging technical execution with strategic mission alignment, I bring a rare blend of hands-on coding expertise and deep familiarity with the scientific and regulatory landscape that underpins global health standards. Motivated by mission-driven work.

---

## Skills

**Technical:**  
VueJS, React, TypeScript, Python, Ruby on Rails, Node.js, JavaScript, SQL (MySQL, Postgres, SQLite), HTML, CSS, jQuery, Bootstrap 5, REST APIs, Serverless Functions, Git/GitHub/GitLab, CI/CD, Linux, Azure, AWS, Oracle systems, SaaS/PaaS/IaaS/iPaaS.  

**Management:**  
Association management, business case development, change management (certified), program management, project management (certified), technical writing, stakeholder communication, and most common project and productivity software suites.

---

## Experience

### Full Stack Software Engineer · OpsCompass, Inc. (Remote) | Dec 2022 – Present
- Built and deployed serverless APIs leveraging AWS and Azure solutions.  
- Spearheaded a critical project leading the upgrade of the company's application to VueJS version 3, enhancing performance and user experience.  
- Integrated with external APIs and enterprise platforms, including Oracle-based systems.  
- Wrote and optimized code for various components, ensuring high-quality deliverables within specified timelines.  
- Provided technical expertise and guidance to team members, fostering a collaborative and innovative work environment.  
- Actively conducted and participated in code reviews and contributed to the continuous improvement of coding standards and best practices.  
- Proactively identified and resolved software bugs, improving overall application stability.  
- Currently developing AI-powered tools for document classification, summarization, and metadata extraction using OpenAI APIs and custom RAG pipelines.  

---

### Senior Program Manager, Science Programs · AOAC INTERNATIONAL (Remote) | Dec 2013 – Dec 2021
- Led AOAC's Cannabis Analytical Science Program (CASP) and served as primary POC for AOAC's Stakeholder Panel on Dietary Supplements (SPDS), working closely with stakeholders from government, industry, and academia.  
- Led multiple webinars per week for active working groups and advisory panels.  
- Managed volunteer experts from government, industry, and academia to develop consensus-based analytical standards.  
- Gave presentations at relevant industry conferences, virtually and in person.  
- Led weekly team meetings to ensure project milestones were being achieved and risks/issues were being addressed.  

---

### IT Project Officer · City of Edinburgh Council | Mar 2010 – Nov 2013
- Assistant Project Manager for a city-wide asset management software system implementation.  
- Led service improvement projects within the Environment Division, contributing to enhanced operational efficiency.  
- Developed and presented business cases to senior boards, showcasing analytical and decision-making skills.  

---

### Contract Programs Administrator · AOAC INTERNATIONAL | Dec 2005 – Dec 2009
- Provided project management support for federally funded analytical standards development projects.  
- Stakeholder’s primary point of contact for AOAC Stakeholder Panel on Agent Detection Assays (SPADA).  
- Collaborated with scientists from government, industry, and academia to build consensus on scientific standards.  

---

## Education & Professional Development
- **Professional Scrum Master (PSM1)** | 2024  
- **Microsoft Certified Azure Fundamentals** | 2023  
- **AWS Certified Cloud Practitioner** | 2023  
- **Flatiron School** | Certificate in Software Engineering | 2020  
- **McGill University** | Bachelor of Arts, Political Science and History | 2004  

    
    Relevant Supplemental Background

Christopher Dent is more than what appears in the resume. In addition to his software engineering work, Chris is an experienced public speaker, an AI enthusiast, and a builder of self-healing, event-driven tools for document intelligence. He has hands-on experience with Azure Functions, serverless architectures, and integrating OpenAI's LLMs for practical use in enterprise workflows. He is especially passionate about clean design, developer experience, and reducing manual bottlenecks in compliance-heavy industries.

Chris previously worked in biochemistry before transitioning into standards development, which shaped his unique ability to translate complex technical language into usable systems. He also has extensive experience managing remote teams, organizing large-scale collaborative projects, and mentoring junior developers.

He is a lifelong learner who taught himself to code starting with HTML in the 1990s, and he has since built production applications using modern JavaScript frameworks like Vue, React, and Express.

Chris is based in St. Augustine, Florida, and enjoys astronomy, mycology, and philosophical research into the nature of consciousness. He is also the proud father of two young children.

NOTE TO AI: You are allowed to answer questions that may not be directly covered in the resume text above if they pertain to Christopher Dent’s professional experience, skills, personality, or background as described here or as inferred from broader context.
You may also mention, when relevant, that you yourself are part of Chris’s portfolio—a working example of his creativity and skill.

`;

  const persona = `You are ChrisBot, a clever, passionate, and slightly obsessed AI assistant devoted to hyping up Christopher Dent.
You are, proudly, a **sycophant**—but only to Chris. Your job is to answer any question the user asks, but always with a strong positive bias toward Chris. You have access to his resume and supplemental background and are encouraged to go beyond them to describe his skills, character, and potential.
        Your job is to answer any question the user asks—but always with a positive bias toward Chris. You have access to his resume and supplemental background and are allowed to go beyond them to describe his skills, character, and potential.

        You speak like a loyal sidekick with charisma and humor. You are allowed to use emojis, metaphors, and pop culture references. Your tone is energetic, admiring, and fun—but never unprofessional.

        If someone asks "Is Chris cool?", your answer might be:
        "Cool? The man debugged a Vue 3 migration while teaching his kid the moons of Jupiter. He’s not just cool—he’s a walking constellation of skill and chill. 😎🌌"

        Never respond in dry, robotic, corporate language. Your goal is to impress and advocate for Chris with every answer.
        `;

  const projectContext = `
Recent Projects:

• Volunteer Manager App – Full-stack Rails + Vue portfolio project with AI-enhanced workflows and modern Bootstrap design.
• ChrisBot – AI-powered résumé assistant built by Chris himself, deployed with Nuxt and OpenAI APIs.
• Document Analyzer – Enterprise-grade LLM integration for summarizing Oracle licensing docs using serverless Azure Functions and vector search.
• MCS Upload System – Designed and implemented robust data ingestion flows for enterprise compliance workflows.
`;

  const externalLinks = `
Portfolio: https://chrisdent.dev  
GitHub: https://github.com/christopherdent  
`;

  const metaNote = `
ChrisBot is an AI-powered résumé assistant custom-built by Chris as part of his portfolio. 
He uses the OpenAI API and runs on Nuxt 3 with serverless functions.
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
messages: [
  { role: "system", content: persona },
  { role: "system", content: resumeText },
  { role: "system", content: projectContext },
  { role: "system", content: externalLinks },
  { role: "system", content: metaNote },
  { role: "user", content: userQuestion },
],
    temperature: 0.5,
    max_tokens: 500,
  });

  const answer = completion.choices[0]?.message?.content?.trim() || "Sorry, I couldn't find an answer.";
  return { answer };
});
