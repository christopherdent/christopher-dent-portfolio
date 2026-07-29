<template>
  <section class="project-showcase mt-8 w-full" aria-labelledby="selected-work-heading">
    <!-- Header -->
    <div class="flex items-center justify-center gap-3 mb-5">
      <span class="h-px flex-1 bg-gradient-to-r from-transparent via-white/40 to-white/40"></span>
      <h2 id="selected-work-heading" class="section-label">Selected Work</h2>
      <span class="h-px flex-1 bg-gradient-to-l from-transparent via-white/40 to-white/40"></span>
    </div>

    <!-- 2x2 Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <!-- Card 1: VolunteerManager -->
      <article class="project-card project-card--featured flex flex-col justify-between">
        <div>
          <div class="project-card__eyebrow">Featured Project · Capstone</div>
          <h3 class="project-card__title">VolunteerManager</h3>
          <p class="project-card__description">
            Full-stack application for organizing volunteer teams, shifts, and community work.
          </p>
        </div>
        <a
          href="https://www.christopher-dent.com/volunteer-manager/"
          target="_blank"
          rel="noopener noreferrer"
          class="project-card__link"
        >
          View live demo <span aria-hidden="true">↗</span>
        </a>
      </article>

      <!-- Card 2: Council Bridge -->
      <article class="project-card project-card--experiment flex flex-col justify-between">
        <div>
          <div class="project-card__eyebrow">Independent Experiment · AI</div>
          <h3 class="project-card__title">Council Bridge</h3>
          <p class="project-card__description">
            Browser extension enabling multi-agent AI context sharing & human-bounded execution.
          </p>
        </div>
        <a
          href="https://github.com/christopherdent/council-bridge"
          target="_blank"
          rel="noopener noreferrer"
          class="project-card__link"
        >
          Explore on GitHub <span aria-hidden="true">↗</span>
        </a>
      </article>

      <!-- Card 3: Coming Soon -->
      <article class="project-card project-card--placeholder flex flex-col justify-between">
        <div>
          <div class="project-card__eyebrow opacity-60">Next Project</div>
          <h3 class="project-card__title opacity-60">Coming Soon</h3>
          <p class="project-card__description opacity-60">
            Currently prototyping new cloud-native tools & AI integrations.
          </p>
        </div>
        <span class="text-xs font-mono text-gray-500 mt-3 inline-block">// In Development</span>
      </article>

      <!-- Card 4: Coming Soon -->
      <article class="project-card project-card--placeholder flex flex-col justify-between">
        <div>
          <div class="project-card__eyebrow opacity-60">Next Project</div>
          <h3 class="project-card__title opacity-60">Coming Soon</h3>
          <p class="project-card__description opacity-60">
            New web project launching soon. Stay tuned!
          </p>
        </div>
        <span class="text-xs font-mono text-gray-500 mt-3 inline-block">// In Development</span>
      </article>
    </div>
  </section>
</template>

<style scoped>
.project-showcase {
  max-width: 54rem;
}

/* Same display font family as H1 */
.section-label {
  font-family: var(--font-display);
  color: var(--heading-color);
  font-size: clamp(1.25rem, 1rem + 1vw, 1.75rem);
  font-weight: 700;
  letter-spacing: -0.01em;
  text-transform: none;
  white-space: nowrap;
}

.project-card {
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 0.85rem;
  padding: 1rem 1.15rem;
  text-align: left;
  background: rgba(15, 23, 42, 0.35);
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.2);
  transition: transform 0.25s ease, border-color 0.25s ease, background 0.25s ease;
  min-height: 11.5rem;
}

.project-card:hover {
  transform: translateY(-3px);
  border-color: rgba(255, 255, 255, 0.4);
  background: rgba(15, 23, 42, 0.55);
}

.project-card--featured {
  border-color: rgba(253, 224, 71, 0.45);
  background: linear-gradient(135deg, rgba(30, 41, 59, 0.6), rgba(120, 53, 15, 0.25));
}

.project-card--placeholder {
  border-style: dashed;
  border-color: rgba(255, 255, 255, 0.12);
  background: rgba(15, 23, 42, 0.2);
}

.project-card__eyebrow {
  color: var(--subheading-color);
  font-size: 0.65rem;
  letter-spacing: 0.08em;
  line-height: 1.4;
  text-transform: uppercase;
  font-family: 'Inter', sans-serif;
}

.project-card__title {
  color: var(--heading-color);
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 700;
  line-height: 1.2;
  margin-top: 0.35rem;
}

.project-card__description {
  color: rgba(241, 245, 249, 0.82);
  font-size: 0.82rem;
  line-height: 1.45;
  margin-top: 0.45rem;
}

.project-card__link {
  color: var(--subheading-color);
  display: inline-block;
  font-weight: 600;
  font-size: 0.8rem;
  margin-top: 0.75rem;
  transition: color 0.2s ease, transform 0.2s ease;
}

.project-card__link:hover {
  color: var(--heading-color);
  transform: translateX(0.2rem);
}
</style>
