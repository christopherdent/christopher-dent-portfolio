<script setup>
import BioTimeline from '~/components/BioTimeline.vue'
</script>

<template>

    
    <UContainer class="hero-container shadow-md rounded-xl transition-all duration-500"
                            size="full"
                            :style="containerStyle">
        <h1 class="text-8xl font-bold text-center pb-6 passions-conflict-regular">~ My Journey ~</h1>
        <div class="flex justify-center">
            <BioTimeline />
        </div>

      <a href="/"
         class="text-5xl font-bold hover:text-blue-800 transition-all duration-300 hover:scale-105 passions-conflict-regular">
        ~ Dent Home ~
      </a>
    </UContainer>
</template>
