<!-- components/LinkList.vue -->
<template>
  <nav class="link-list mt-8 space-y-4">
    <UTooltip
      v-for="item in items"
      :key="item.label"
      :text="item.tooltip"
      :popper="{ placement: 'top' }"
    >
      <a
        :href="item.href"
        :target="item.external ? '_blank' : '_self'"
        rel="noopener noreferrer"
        class="group flex items-center space-x-3 text-lg font-semibold text-gray-300 transition-transform duration-300 hover:translate-x-2"
      >
        <component
          :is="item.icon"
          class="w-6 h-6 text-gray-400 transition-colors duration-300 group-hover:text-primary"
        />
        <span
          class="relative inline-block transition-colors duration-300 group-hover:text-primary"
        >
          {{ item.label }}
          <span
            class="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-primary to-purple-400 transition-all duration-300 group-hover:w-full"
          ></span>
        </span>
      </a>
    </UTooltip>
  </nav>
</template>

<script setup>
import { ScrollText, FileUser, BookOpenText, BookMarked } from "lucide-vue-next";

const items = [
  {
    label: "Interactive Resume",
    href: "/resume",
    icon: ScrollText,
    tooltip: "Check out my interactive resume!",
  },
  {
    label: "Read Bio",
    href: "/about",
    icon: FileUser,
    tooltip: "Learn more about Chris",
  },
  {
    label: "Writing / Blog",
    href: "https://christopher-dent.medium.com/",
    icon: BookOpenText,
    external: true,
    tooltip: "Read Chris's writing on Medium",
  },
  {
    label: "Goodreads / Reading List",
    href: "https://www.goodreads.com/user/show/93276-christopher-dent",
    icon: BookMarked,
    external: true,
    tooltip: "See what Chris is reading on Goodreads",
  },
];
</script>

<style scoped>
.link-list a span::after {
  content: "";
}
</style>
