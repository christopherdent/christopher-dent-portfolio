<template>
  <UContainer class="hero-container shadow-md rounded-xl transition-all duration-500"
              size="full"
              >

    <UGrid align="center" class="hero-inner max-w-screen-2xl px-4 py-8 hero-gap">

      <!-- Left: Title, subtitles, buttons -->
      <div class="hero-left">
        <!-- Header -->
        <h1 class="heading-hover-effect heading-theme text-shadow-md text-4xl font-bold text-3xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl 2xl:text-4xl">
          Christopher James Dent
        </h1>

        <!-- Subheading / tooltips -->
     <div class="pt-4 subheading-theme">
  <UTooltip 
    :content="{ align: 'center', side: 'top', sideOffset: 8 }"
    text="Chris re-learned how to code and transitioned into software development after 15 years of managing scientific and technical projects."
    class="tooltip-content"
  >
    <span class="text-lg font-medium">Software Engineer </span>
  </UTooltip>

  <UTooltip 
    :content="{ align: 'center', side: 'top', sideOffset: 8 }"
    text="Father of two amazing kids. My greatest project."
    class="tooltip-content"
  >
    <span class="text-lg font-medium">| Dad </span>
  </UTooltip>

  <UTooltip 
    :content="{ align: 'center', side: 'top', sideOffset: 8 }"
    text="Certified cat herder."
    class="tooltip-content"
  >
    <span class="text-lg font-medium">| Project Manager</span>
  </UTooltip>
</div>

          <LinkList />

        <!-- </div> -->
      </div>

      <!-- Right: Hero + Theme Picker -->
      <div class="hero-right mt-8">
        <!-- <img
          src="https://cjdportfolio.s3.us-east-1.amazonaws.com/hero_portfolio.png"
          alt="Christopher Dent Hero"
          class="hero-image mx-auto rounded-xl shadow-xl w-auto h-[40vh] sm:h-[48vh] md:h-[56vh] 2xl:h-[66vh] object-contain" /> -->
          <img
  src="https://cjdportfolio.s3.us-east-1.amazonaws.com/hero_portfolio.png"
  alt="Christopher Dent Hero"
  class="hero-image mx-auto rounded-xl shadow-xl w-auto h-[40vh] sm:h-[48vh] md:h-[56vh] 2xl:h-[66vh] object-contain lg:mt-8"
/>


        <!-- Centered Theme Toggle under the image -->
        <div class="mt-6 pt-6 w-full">
          <div class="text-sm text-gray-500 dark:text-gray-400 text-center picker-text">Theme Picker</div>
          <div class="flex justify-center mt-2">
            <ThemeToggle v-model="theme" />
          </div>
        </div>
      </div>
    </UGrid>

    <UText class="mt-25 text-gray-600 dark:text-gray-400 text-sm text-center">
      © {{ new Date().getFullYear() }} Christopher Dent
    </UText>
  </UContainer>
</template>

<script setup>
import { ref, computed } from 'vue';
import ThemeToggle from '~/components/ThemeToggle.vue';
import { useTheme } from '~/composables/useTheme'

const { theme } = useTheme()

const projectUrl = 'https://consistent-robinetta-christopherdent-69ec9810.koyeb.app/';

// track hover state
const isHovered = ref(false);
// track selected theme

</script>

<style scoped>
/* Base layout: 1 column by default; switch to 2 columns at ≥1600px */
.hero-inner {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}
@media (min-width: 1600px) {
  .hero-inner {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-items: center;
  }
}

/* Left block centered <1600, left-aligned ≥1600 */
.hero-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-inline: auto;
  max-width: 900px;
}
@media (min-width: 1600px) {
  .hero-left {
    align-items: flex-start;
    text-align: left;
    margin-inline: 0;
    max-width: none;
  }
}

/* Right block */
.hero-right {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Buttons: centered stack; row + left at ≥1600 */
.hero-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: .75rem;
  padding-top: 1rem;
}
@media (min-width: 768px) {
  .hero-actions {
    flex-direction: row;
  }
}
@media (min-width: 1600px) {
  .hero-actions {
    justify-content: flex-start;
  }
}

/* Fancy bits */
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
.picker-text {
  font-family: 'Audiowide', sans-serif !important;
  font-weight: 100;
  transition: color 0.3s ease-in-out;
}
</style>
