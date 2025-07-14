<template>
    <UContainer class="py-12">
        <transition name="slide-fade">
        <div v-if="selected === null"
             class="small p-10">(click item to expand)</div>
        <div v-else
            hover:underline hover:text-blue-400
             class="small p-10 "
             @click="selected = null"
             >(click me to collapse)</div>
</transition>
        <div class="relative border-l border-gray-300 dark:border-gray-700 max-w-3xl mx-auto">
            <div v-for="(item, index) in timelineItems"
                 :key="index"
                 class="mb-10 ml-4 transition-all duration-500 min-h-16">
                <div class="absolute w-3 h-3 bg-blue-500 rounded-full mt-1.5 -left-1.5 border border-white"
                     :class="{ 'animate-ping': selected === index }"></div>
                <h3 :class="[
                    'text-lg font-semibold cursor-pointer transition-colors duration-300',
                    selected === index ? 'text-blue-500 ml-2' : 'text-gray-900 dark:text-white'
                ]"
                    @click="selected = selected === index ? null : index">
                    {{ item.title }}
                </h3>
                <transition name="slide-fade">
                    <p v-if="selected === index"
                       class="text-gray-600 dark:text-gray-300 mt-2 transform transition-all duration-500 ml-2">
                        {{ item.description }}
                    </p>
                </transition>
            </div>
        </div>
    </UContainer>
</template>

<script setup>
import { ref } from 'vue';

const selected = ref(null);

const timelineItems = [
    {
        title: 'Early Life at Sea',
        description: 'Grew up aboard a sailboat, exploring islands and developing a lifelong love of nature and adventure.',
    },
    {
        title: 'Discovering Tech',
        description: 'Began coding as a teen in Sag Harbor, NY, teaching myself HTML, building early websites, and exploring software development.',
    },
    {
        title: 'McGill & Abroad Adventures',
        description: 'Studied at McGill University with a year abroad at Herstmonceux Castle in England, majoring in history and politics.',
    },
    {
        title: 'Project Management Career',
        description: 'Developed over a decade of experience in project management in Washington DC, Scotland, and remotely, earning PMI-ACP, PRINCE2, and Prosci certifications.',
    },
    {
        title: 'Return to Tech',
        description: 'Graduated from Flatiron School in 2020, transitioned into full-stack software engineering, and grew into my current tech role, handling complex integrations and innovative solutions.',
    },
    {
        title: 'Today & Beyond',
        description: 'Currently focused on Vue, Nuxt, AI-driven development, and cloud-native technologies, balancing work with family life and personal growth. Ready for the next adventure!',
    },
    {
        title: 'Contact & Connect',
        description: 'Want to connect to talk about a project?  Or maybe just a coffee and Teams chat?  I\'d love to hear from you! Reach out via the contact form on my portfolio site or connect with me on LinkedIn.',
    },
];
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 0.5s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    opacity: 0;
    transform: translateX(-10px);
}
</style>
