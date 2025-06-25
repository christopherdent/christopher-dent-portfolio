<template>
  <UContainer class="hero-container" size="full">
    <UGrid align="center" class="hero-inner">
      <!-- Text Section -->
      <UGridItem
        cols="12"
        md="6"
        class="hero-text flex flex-col items-center text-center"
      >
        <UHeading size="xLarge" class="hero-title">Christopher James Dent</UHeading>
        <UText size="large" class="hero-subtitle">
          Software Engineer | Tech Enthusiast | Project Manager
        </UText>
        <div class="hero-buttons">
          <UButton icon="i-lucide-scroll-text" size="md" color="primary" variant="solid">
            View Resume
          </UButton>
          <UButton icon="i-lucide-file-user" size="md" color="primary" variant="solid">
            Read Bio
          </UButton>
          <UButton icon="i-lucide-laptop" size="md" color="primary" variant="solid">
            View Projects
          </UButton>
        </div>
      </UGridItem>

      <!-- Image Section -->
      <UGridItem cols="12" md="6" class="hero-image-wrapper">
        <UCard flat>
        <img
          src="https://cjdportfolio.s3.us-east-1.amazonaws.com/hero_portfolio.png"
          alt="Christopher Dent Hero"
          class="hero-image"
        />
        </UCard>
      </UGridItem>
    </UGrid>

    <!-- Footer -->
    <UText class="hero-footer">
      © {{ new Date().getFullYear() }} Christopher Dent. All rights reserved.
    </UText>
  </UContainer>
</template>

<script setup>
// Nuxt UI components are auto-registered
</script>

<style scoped>
/* Illuminate the H1 gradient on hover */
.hero-title {
  transition: filter 0.5s ease-in-out, text-shadow 0.5s;
}
.hero-title:hover {
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

.hero-container {
    transition: background
}
.hero-container:hover {
  background: rgb(8, 13, 71);
}

</style>