<template>
  <UContainer
    class="hero-container shadow-md rounded-xl transition-all duration-500"
    size="full"
    @mouseover="isHovered = true"
    @mouseleave="isHovered = false"
    :style="containerStyle"
  >


    <UGrid align="center" class="hero-inner max-w-screen-2xl px-4 py-8 hero-gap">
      

      <UGridItem cols="12" md="6" class="flex flex-col items-center text-center">
        <!-- Header -->
        <h1 
        class="heading-hover-effect text-shadow-md text-4xl font-bold text-3xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl 2xl:text-4xl"
        :class="headingColorClass"
        >
          Christopher James Dent
        </h1>
        <!-- Subheading / tooltips -->
        <div class="pt-4">
          <UTooltip
            :content="{ align: 'center', side: 'top', sideOffset: 8 }"
            text="Chris re-learned how to code and transitioned into software development after 15 years of managing scientific and technical projects."
            class="tooltip-content"
          >
            <UText size="lg" class="text-gray-500 dark:text-gray-400 font-medium">
              Software Engineer
            </UText>
          </UTooltip>
          <UTooltip
            :content="{ align: 'center', side: 'top', sideOffset: 8 }"
            text="Father of two amazing kids. My greatest project."
            class="tooltip-content"
          >
            <UText size="lg" class="text-gray-500 dark:text-gray-400 font-medium">
              | Dad
            </UText>
          </UTooltip>
          <UTooltip
            :content="{ align: 'center', side: 'top', sideOffset: 8 }"
            text="Certified cat herder."
            class="tooltip-content"
          >
            <UText size="lg" class="text-gray-500 dark:text-gray-400 font-medium">
              | Project Manager
            </UText>
          </UTooltip>
        </div>
        <!-- Call to Action Buttons -->
        <div class="flex flex-col pt-4 md:flex-row md:space-x-4">
          <UButton icon="i-lucide-scroll-text" size="lg" color="primary" variant="ghost" class="shadow-xl font-semibold">
            View Resume
          </UButton>
          <UButton icon="i-lucide-file-user" size="lg" color="primary" variant="ghost" class="shadow-xl font-semibold">
            Read Bio
          </UButton>
          <UButton icon="i-lucide-laptop" size="lg" color="primary" variant="ghost" class="shadow-xl font-semibold">
            View Projects
          </UButton>
        </div>
      </UGridItem>


      <UGridItem cols="12" md="6" class="flex flex-col items-center">
        <img
          src="https://cjdportfolio.s3.us-east-1.amazonaws.com/hero_portfolio.png"
          alt="Christopher Dent Hero"
          class="hero-image h-[66vh] w-auto object-contain rounded-xl shadow-xl"
        />
        <!-- Centered Theme Toggle under the image -->
        <div class="mt-6 pt-6">
          <ThemeToggle v-model="selectedTheme" />
        </div>
      </UGridItem>
    </UGrid>
    <UText class="mt-25 text-gray-600 dark:text-gray-400 text-sm text-center">
      © {{ new Date().getFullYear() }} Christopher Dent
    </UText>
  </UContainer>
</template>

<script setup>
import { ref, computed } from 'vue'
import ThemeToggle from '~/components/ThemeToggle.vue'

  // track hover state
  const isHovered = ref(false)
  // track selected theme
  const selectedTheme = ref('cosmic')

  // define base colors for each theme
  const themeColors = {
    cosmic: ['#1e293b', '#4c1d95'],
    neon: ['#0f172a', '#10b981'],
    cool: ['#1e293b', '#3b82f6'],
    psychedelic: ['#ff6b6b', '#845ef7']
  }

  const headingColorClass = computed(() => {
    switch (selectedTheme.value) {
      case 'cosmic':
        return 'text-gray-100' 
      case 'neon':
        return 'text-emerald-300'
      case 'cool':
        return 'text-blue-300'
      case 'psychedelic':
        return 'text-yellow-300'
      default:
        return 'text-white'
    }
  })


  // compute inline style for background and glow
  const containerStyle = computed(() => {
    if (isHovered.value) {
      const colors = themeColors[selectedTheme.value] || ['#0d1117', '#0d1117']
      return {
        backgroundImage: `linear-gradient(to bottom right, ${colors.join(', ')})`,
        boxShadow: `0 0 20px rgba(255, 255, 255, 0.3)`
      }
    }
    return {
      backgroundColor: '#0d1117'
    }
  })
</script>

<style scoped>
  /* Custom hover effects */
  .heading-hover-effect {
    transition: filter 0.5s ease-in-out, text-shadow 0.5s;
  }
  .heading-hover-effect:hover {
    filter: brightness(2);
    text-shadow: 0 0 16px #fff, 0 0 8px #fff;
  }
  .hero-image {
    transition: filter 0.5s ease-in-out, box-shadow 0.5s ease-in-out;
  }
  .hero-image:hover {
    filter: brightness(1.1);
    box-shadow: 0 0 20px 10px rgba(255, 255, 255, 0.4);
  }
</style>
