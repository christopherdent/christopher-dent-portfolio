<template>
  <div class="w-full max-w-4xl mx-auto py-4 px-2 sm:px-6">
    <!-- Dev Terminal Header -->
    <div class="glass-card mb-8 p-4 rounded-xl border border-white/10 shadow-xl overflow-hidden">
      <div class="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
        <div class="flex items-center space-x-2">
          <div class="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div class="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div class="w-3 h-3 rounded-full bg-green-500/80"></div>
          <span class="text-xs font-mono text-gray-400 ml-2">chris@dent-portfolio:~/my-journey</span>
        </div>
        <div class="flex items-center space-x-2 text-xs text-gray-400 font-mono">
          <button 
            @click="toggleExpandAll" 
            class="px-2 py-1 rounded bg-white/5 hover:bg-white/10 transition-colors border border-white/10 flex items-center space-x-1"
          >
            <Sparkles class="w-3 h-3 text-amber-400" />
            <span>{{ allExpanded ? 'Collapse All' : 'Expand All' }}</span>
          </button>
        </div>
      </div>
      
      <!-- Quick Navigation Chips -->
      <div class="flex flex-wrap justify-center gap-2 pt-2">
        <button
          v-for="(item, idx) in timelineItems"
          :key="`chip-${idx}`"
          @click="selectItem(idx)"
          class="px-3 py-1 rounded-full text-xs font-mono transition-all duration-300 flex items-center space-x-1.5"
          :class="[
            selected.includes(idx)
              ? 'bg-primary/20 text-white border border-primary/50 shadow-[0_0_12px_rgba(59,130,246,0.3)] scale-105'
              : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-gray-200 border border-white/5'
          ]"
        >
          <component :is="item.icon" class="w-3 h-3" />
          <span>{{ item.era }}</span>
        </button>
      </div>
    </div>

    <!-- Timeline Body -->
    <div class="relative pl-4 sm:pl-8 border-l-2 border-dashed border-gray-700/60 space-y-6">
      <div
        v-for="(item, index) in timelineItems"
        :key="index"
        class="relative group transition-all duration-300"
      >
        <!-- Timeline Node Circle / Icon -->
        <button
          @click="toggleItem(index)"
          class="absolute -left-[1.65rem] sm:-left-[2.65rem] top-1.5 w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg cursor-pointer z-10"
          :class="[
            selected.includes(index)
              ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white scale-110 ring-4 ring-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.5)]'
              : 'bg-slate-800 text-gray-400 hover:text-white hover:bg-slate-700 border border-white/10'
          ]"
          :aria-label="`Toggle ${item.title}`"
        >
          <component :is="item.icon" class="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110" />
        </button>

        <!-- Card Container -->
        <div
          class="glass-card rounded-2xl p-5 sm:p-6 border transition-all duration-300 cursor-pointer overflow-hidden"
          :class="[
            selected.includes(index)
              ? 'bg-slate-900/80 border-purple-500/40 shadow-[0_10px_30px_rgba(0,0,0,0.5)] translate-x-1'
              : 'bg-slate-900/40 border-white/5 hover:border-white/20 hover:bg-slate-900/60 hover:translate-x-1'
          ]"
          @click="toggleItem(index)"
        >
          <!-- Card Top Bar -->
          <div class="flex items-center justify-between flex-wrap gap-2">
            <div class="flex items-center space-x-3">
              <span class="text-xs font-mono px-2.5 py-0.5 rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/20">
                // {{ item.era }}
              </span>
              <span class="text-xs font-mono text-gray-400">{{ item.year }}</span>
            </div>

            <ChevronDown
              class="w-5 h-5 text-gray-400 transition-transform duration-300"
              :class="{ 'rotate-180 text-purple-400': selected.includes(index) }"
            />
          </div>

          <!-- Title -->
          <h3
            class="text-lg sm:text-xl font-bold mt-2 font-display transition-colors"
            :class="selected.includes(index) ? 'text-white' : 'text-gray-200 group-hover:text-purple-300'"
          >
            {{ item.title }}
          </h3>

          <!-- Expandable Content -->
          <Transition name="expand">
            <div v-show="selected.includes(index)" class="mt-4 pt-3 border-t border-white/10 text-gray-300 leading-relaxed text-sm sm:text-base">
              <p v-html="item.description"></p>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  Compass,
  Code2,
  GraduationCap,
  Briefcase,
  Rocket,
  Cpu,
  Mail,
  ChevronDown,
  Sparkles
} from 'lucide-vue-next'

const selected = ref([0]) // default first node expanded for great initial preview

const timelineItems = [
  {
    era: 'ORIGINS',
    year: 'Childhood',
    title: 'Early Life at Sea',
    icon: Compass,
    description: 'Grew up aboard a sailboat, exploring islands and developing a lifelong love of nature, self-reliance, and adventure.'
  },
  {
    era: 'FIRST CODE',
    year: 'Teens',
    title: 'Discovering Tech',
    icon: Code2,
    description: 'Began coding as a teen in Sag Harbor, NY, teaching myself HTML, building early websites, and exploring software development.'
  },
  {
    era: 'ACADEMICS',
    year: 'University',
    title: 'McGill & Abroad Adventures',
    icon: GraduationCap,
    description: 'Studied at McGill University with a year abroad at Herstmonceux Castle in England, majoring in history and politics.'
  },
  {
    era: 'LEADERSHIP',
    year: '10+ Years',
    title: 'Project Management Career',
    icon: Briefcase,
    description: 'Developed over a decade of experience in project management in Washington DC, Scotland, and remotely, earning PMI-ACP, PRINCE2, and Prosci certifications.'
  },
  {
    era: 'FULL-STACK',
    year: '2020 - Present',
    title: 'Return to Tech',
    icon: Rocket,
    description: 'Graduated from Flatiron School in 2020, transitioned into full-stack software engineering, and grew into my current tech role handling complex integrations and innovative cloud solutions.'
  },
  {
    era: 'INNOVATION',
    year: 'Active Focus',
    title: 'Today & Beyond',
    icon: Cpu,
    description: 'Currently focused on Vue, Nuxt, AI-driven development, and cloud-native technologies, balancing work with family life and personal growth. Ready for the next adventure!'
  },
  {
    era: "LET'S TALK",
    year: 'Reach Out',
    title: 'Contact & Connect',
    icon: Mail,
    description: 'Want to connect to talk about a project? Or maybe just a coffee and Teams chat? I\'d love to hear from you! Reach out via <a href="mailto:christopherdent01@gmail.com" class="text-purple-400 font-semibold underline hover:text-purple-300 transition-colors">email</a> or connect with me on <a href="https://www.linkedin.com/in/christopher-james-dent/" target="_blank" class="text-purple-400 font-semibold underline hover:text-purple-300 transition-colors">LinkedIn</a>.'
  }
]

const allExpanded = computed(() => selected.value.length === timelineItems.length)

const toggleItem = (index) => {
  if (selected.value.includes(index)) {
    selected.value = selected.value.filter((i) => i !== index)
  } else {
    selected.value.push(index)
  }
}

const selectItem = (index) => {
  if (!selected.value.includes(index)) {
    selected.value.push(index)
  }
}

const toggleExpandAll = () => {
  if (allExpanded.value) {
    selected.value = []
  } else {
    selected.value = timelineItems.map((_, idx) => idx)
  }
}
</script>

<style scoped>
.glass-card {
  background: rgba(15, 23, 42, 0.65);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.expand-enter-active,
.expand-leave-active {
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  max-height: 300px;
  opacity: 1;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
  padding-top: 0;
  padding-bottom: 0;
  transform: translateY(-8px);
}
</style>