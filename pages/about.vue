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
    </UContainer>
</template>
