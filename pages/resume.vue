<script setup>
import ChatSidebar from '../components/ChatSidebar';
const resumeUrl = '/pdf/ChristopherDentResume.pdf';
</script>
<template>
    <div>
<div class="w-full flex justify-center py-6">
  <a
    href="/"
    class="text-4xl font-bold text-blue-600 hover:text-blue-800 transition-colors"
  >
    Dent Home
  </a>
</div>

        <div class="flex h-full items-center justify-center">
            <!-- left panel -->
            <section class="flex-none max-w-xl p-8 ml-10">
                <PdfViewer :file="resumeUrl"
                           height="100%" />
            </section>

            <!-- right panel -->
            <!-- <section class="flex-1 p-4 align-center"> -->
                <!-- right panel -->
                <section class="flex-1 p-4">
                    <UContainer class="chat-container shadow-md rounded-xl"
                                size="medium"
                                >
                        <!-- replace the static text with our chat -->
                        <ChatSidebar />
                    </UContainer>
                </section>
        </div>
    </div>


</template>
