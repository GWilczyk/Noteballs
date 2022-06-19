<template>
	<NavBar />

	<div class="container is-max-desktop px-2 py-4">
		<RouterView />
	</div>
</template>

<script setup>
/* imports */
import { onMounted } from 'vue'
import { useNotesStore } from '@/stores/notesStore'
import NavBar from '@/components/Layout/NavBar.vue'
/* store */
const notesStore = useNotesStore()
/* connecting to firestore */
onMounted(() => notesStore.getNotes())
</script>

<style>
@import 'bulma/css/bulma.min.css';
</style>
