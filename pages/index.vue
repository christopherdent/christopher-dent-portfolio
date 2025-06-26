<template>
  <UContainer class="hero-container" size="full">
    <UGrid align="center" class="hero-inner">
      <UGridItem
        cols="12"
        md="6"
        class="flex flex-col items-center text-center md:items-start md:text-left"
      >
        
      <UHeading size="4xl" class="heading-hover-effect text-shadow-md">Christopher James Dent</UHeading>

        <div class="pt-4">
          <UTooltip  
            :content="{  
            align: 'center',  
            side: 'top',  
            sideOffset: 8,  
            }" 
            text="Chris re-learned how to code and transitioned into software development after 15 years of managing scientific and technical projects."
            class="tooltip-content"
            >  
            <UText size="lg" class="text-gray-500 dark:text-gray-400 font-medium">Software Engineer  </UText>
          </UTooltip>

          <UTooltip 
            :content="{  
            align: 'center',  
            side: 'top',  
            sideOffset: 8,  
            }" 
            text="Father of two amazing kids. My greatest project."
            class="tooltip-content"
            >
            <UText size="lg" class="text-gray-500 dark:text-gray-400 font-medium">|  Dad</UText>
          </UTooltip>

          <UTooltip 
            :content="{  
            align: 'center',  
            side: 'top',  
            sideOffset: 8,  
            }" 
            text="Certified cat herder."
            class="tooltip-content"
            >
              <UText size="lg" class="text-gray-500 dark:text-gray-400 font-medium">  |  Project Manager</UText>
          </UTooltip>

        </div>

        <div class="flex flex-col gap-4 pt-8 md:flex-row md:gap-4">
          <UButton
            icon="i-lucide-scroll-text"
            size="lg"
            color="primary"
            variant="solid"
            class="shadow-xl font-semibold"
          >
            View Resume
          </UButton>
          <UButton
            icon="i-lucide-file-user"
            size="lg"
            color="primary"
            variant="outline"
            class="shadow-xl font-semibold"
          >
            Read Bio
          </UButton>
          <UButton
            icon="i-lucide-laptop"
            size="lg"
            color="primary"
            variant="ghost"
            class="font-semibold"
          >
            View Projects
          </UButton>
        </div>
      </UGridItem>

      <UGridItem cols="12" md="6" class="flex justify-center">
        <img
          src="https://cjdportfolio.s3.us-east-1.amazonaws.com/hero_portfolio.png"
          alt="Christopher Dent Hero"
          class="hero-image h-[66vh] w-auto object-contain rounded-xl shadow-xl"
        />
      </UGridItem>
    </UGrid>

    <UText class="mt-16 text-gray-600 dark:text-gray-400 text-sm text-center">
      © {{ new Date().getFullYear() }} Christopher Dent. All rights reserved.
    </UText>
  </UContainer>
</template>

<script setup>
// Nuxt UI components are auto-registered
</script>

<style scoped>
/* Only keep custom hover effects that cannot be done with Tailwind utilities */

/* Illuminate the H1 gradient on hover */
.heading-hover-effect {
  transition: filter 0.5s ease-in-out, text-shadow 0.5s;
  /* Ensure the base color/gradient is handled by UHeading's default styles or a global Tailwind class if needed */
  /* If you want the specific `text-shadow` for the title *always*, add it here or via Tailwind class */
}
.heading-hover-effect:hover {
  filter: brightness(2);
  text-shadow: 0 0 16px #fff, 0 0 8px #fff;
}

/* Glow effect on hero image hover */
.hero-image {
  transition: filter 0.5s ease-in-out, box-shadow 0.5s ease-in-out;
}
.hero-image:hover {
  filter: brightness(1.1);
  box-shadow: 0 0 20px 10px rgba(255, 255, 255, 0.4);
}

/* Optional: If you had a background transition on hero-container, keep it here.
   Otherwise, if it's just the base background, let global styles or color-mode handle it. */
.hero-container {
  transition: background 0.05s linear;
}
.hero-container:hover {
  background: #020282;
}
</style>