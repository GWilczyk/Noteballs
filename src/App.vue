<template>
  <RouterLink to="/">Notes</RouterLink> |
  <RouterLink to="/stats">Stats</RouterLink>

  <RouterView />
</template>

<script setup>
import NotesView from "@/views/NotesView.vue";
import StatsView from "@/views/StatsView.vue";
</script>
