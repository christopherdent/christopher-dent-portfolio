<script setup>
const resumeUrl = '/pdf/ChristopherDentResume.pdf'
</script>
<template>
  <section class="max-w-5xl pl-4 pt-5">
    <h1>Resume</h1>
    <PdfViewer :file="resumeUrl" class="h-[80vh]" />
  </section>
</template>
