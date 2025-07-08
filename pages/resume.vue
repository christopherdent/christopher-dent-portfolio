<script setup>
const resumeUrl = '/pdf/ChristopherDentResume.pdf';
</script>
<template>
    <div>

<a href="/" class="text-blue-500 hover:underline items-center justify-center">Dent Home</a>
    <div class="flex h-full items-center justify-center">
        <!-- left panel -->
        <section class="flex-none max-w-xl p-8 ml-10">
            <PdfViewer :file="resumeUrl"
                       height="100%" />
        </section>

        <!-- right panel -->
        <section class="flex-1 p-4 align-center">
            <UContainer class="chat-container shadow-md rounded-xl"
                        size="medium"
                        :style="containerStyle">

                        <UText>
                <h1 class="text-2xl font-bold mb-4">Resume</h1>
                <p class="text-gray-700 dark:text-gray-300">
                    This is my resume. It is a PDF file that you can view, download, or print. If you have any questions or need further information, feel free to ask!
                </p>
                        </UText>
            </UContainer>
        </section>
    </div>
</div>


</template>
