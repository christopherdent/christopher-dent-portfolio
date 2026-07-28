<template>
  <section class="project-showcase mt-12 w-full" aria-labelledby="selected-work-heading">
    <div class="flex items-center justify-center gap-3 mb-5">
      <span class="h-px flex-1 bg-gradient-to-r from-transparent via-white/40 to-white/40"></span>
      <h2 id="selected-work-heading" class="section-label">Selected Work</h2>
      <span class="h-px flex-1 bg-gradient-to-l from-transparent via-white/40 to-white/40"></span>
    </div>

    <article class="project-card project-card--featured">
      <div class="project-card__eyebrow">Featured Project · Bootcamp Capstone</div>
      <h3 class="project-card__title">VolunteerManager</h3>
      <p class="project-card__description">
        A hand-coded full-stack application for organizing volunteers, shifts, and community work.
      </p>
      <a
        href="https://consistent-robinetta-christopherdent-69ec9810.koyeb.app/"
        target="_blank"
        rel="noopener noreferrer"
        class="project-card__link"
      >
        View live demo <span aria-hidden="true">↗</span>
      </a>
    </article>

    <article class="project-card project-card--experiment">
      <div class="project-card__eyebrow">Independent Experiment · AI-Assisted</div>
      <h3 class="project-card__title">Council Bridge</h3>
      <p class="project-card__description">
        A human-directed Chrome and Edge extension that lets two independent AI agents share context,
        iterate on each other, and remain bounded by human approval.
      </p>
      <a
        href="https://github.com/christopherdent/council-bridge"
        target="_blank"
        rel="noopener noreferrer"
        class="project-card__link"
      >
        Explore on GitHub <span aria-hidden="true">↗</span>
      </a>
    </article>
  </section>
</template>

<style scoped>
.project-showcase {
  max-width: 48rem;
}

.section-label,
.project-card__eyebrow {
  font-family: 'Audiowide', sans-serif;
}

.section-label {
  color: var(--subheading-color);
  font-size: 0.8rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  white-space: nowrap;
}

.project-card {
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.9rem;
  padding: 1.25rem 1.4rem;
  text-align: left;
  background: rgba(15, 23, 42, 0.28);
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.16);
  transition: transform 0.25s ease, border-color 0.25s ease, background 0.25s ease;
}

.project-card + .project-card {
  margin-top: 0.9rem;
}

.project-card:hover {
  transform: translateY(-3px);
  border-color: rgba(255, 255, 255, 0.5);
  background: rgba(15, 23, 42, 0.42);
}

.project-card--featured {
  border-color: rgba(253, 224, 71, 0.52);
  background: linear-gradient(135deg, rgba(30, 41, 59, 0.55), rgba(120, 53, 15, 0.2));
}

.project-card__eyebrow {
  color: var(--subheading-color);
  font-size: 0.68rem;
  letter-spacing: 0.1em;
  line-height: 1.5;
  text-transform: uppercase;
}

.project-card__title {
  color: var(--heading-color);
  font-family: var(--font-display);
  font-size: clamp(1.4rem, 1.1rem + 1vw, 2rem);
  line-height: 1.1;
  margin-top: 0.45rem;
}

.project-card__description {
  color: rgba(241, 245, 249, 0.88);
  font-size: 0.95rem;
  line-height: 1.6;
  margin-top: 0.7rem;
}

.project-card__link {
  color: var(--subheading-color);
  display: inline-block;
  font-weight: 700;
  margin-top: 0.9rem;
  transition: color 0.2s ease, transform 0.2s ease;
}

.project-card__link:hover {
  color: var(--heading-color);
  transform: translateX(0.2rem);
}

@media (max-width: 640px) {
  .project-card {
    padding: 1.1rem;
  }

  .project-card__eyebrow {
    font-size: 0.58rem;
  }
}
</style>
