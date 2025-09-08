<template>
    <UContainer class="py-6">
        <div class="border border-gray-300 dark:border-gray-700 rounded-lg p-6 max-w-3xl mx-auto">
        <!--  Nuxt's transition component -->
        <Transition name="slide-fade" mode="out-in">
            <div v-if="selected === null"
                 key="expand-hint"
                 class="text-sm pb-5 text-center text-gray-500">
                (click item to expand)
            </div>
            <div v-else
                 key="collapse-hint"
                 class="text-sm p-10 text-center text-blue-500 hover:text-blue-400 cursor-pointer transition-colors"
                 @click="selected = null">
                (click me to collapse)
            </div>
        </Transition>
        
        <div class="relative border-l border-gray-300 dark:border-gray-700 max-w-3xl mx-auto">
            <div v-for="(item, index) in timelineItems"
                 :key="index"
                 class="mb-10 ml-4 will-change-transform">
                
                <div class="absolute w-3 h-3 bg-blue-500 rounded-full mt-2 -left-5.5 border border-white transition-all duration-500 ease-out will-change-transform"
                     :class="{ 'ring-4 ring-blue-200 ring-opacity-75 scale-125': selected === index }"></div>
                
                <h3 class="text-lg font-semibold cursor-pointer transition-all duration-300 ease-out will-change-transform"
                    :class="[
                        selected === index ? 'text-blue-500 ml-2' : 'text-gray-900 dark:text-white hover:text-blue-400'
                    ]"
                    @click="toggleItem(index)">
                    {{ item.title }}
                </h3>
                
                <Transition name="expand">
                    <div v-show="selected === index"
                         class="mt-2 ml-2 overflow-hidden will-change-transform">
                        <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                            {{ item.description }}
                        </p>
                    </div>
                </Transition>
            </div>
        </div>
        </div>
    </UContainer>
</template>

<script setup>

const selected = ref(null)

// Simple, smooth toggle
const toggleItem = (index) => {
    selected.value = selected.value === index ? null : index
}

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
        description: 'Want to connect to talk about a project? Or maybe just a coffee and Teams chat? I\'d love to hear from you! Reach out via <a href="mailto:christopherdent01@gmail.com">email</a>  or connect with me on <a href="https://www.linkedin.com/in/christopher-james-dent/" target="_blank">LinkedIn.</a>',
    },
]
</script>

<style scoped>
/* Hint text transitions */
.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    opacity: 0;
    transform: translateY(-8px);
}

/* Expand/collapse transitions with smooth layout shift */
.expand-enter-active {
    transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    overflow: hidden;
}

.expand-leave-active {
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    overflow: hidden;
}

.expand-enter-from {
    opacity: 0;
    max-height: 0;
    transform: translateY(-12px);
}

.expand-leave-to {
    opacity: 0;
    max-height: 0;
    transform: translateY(-8px);
}

.expand-enter-to,
.expand-leave-from {
    opacity: 1;
    max-height: 400px;
}

/* Performance optimizations - only for animating elements */
.will-change-transform {
    will-change: transform, opacity;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
}
</style>