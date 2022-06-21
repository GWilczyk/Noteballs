<template>
	<NavBar />

	<div class="container is-max-desktop px-2 py-4">
		<RouterView />
	</div>
</template>

<script setup>
/* imports */
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import NavBar from '@/components/Layout/NavBar.vue'
/* store */
const authStore = useAuthStore()
/* manage user authentication */
onMounted(() => authStore.init())
</script>

<style>
@import 'bulma/css/bulma.min.css';
</style>
