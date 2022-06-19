<template>
	<div class="card mb-4">
		<div class="card-content">
			<div class="content">
				{{ note.content }}
				<div class="has-text-right has-text-grey-light mt-2">
					<small>{{ characterLength }}</small>
				</div>
			</div>
		</div>

		<footer class="card-footer">
			<RouterLink :to="`/editNote/${note.id}`" class="card-footer-item"
				>Edit</RouterLink
			>
			<a
				href="#"
				@click.prevent="modals.deleteNote = true"
				class="card-footer-item"
				>Delete</a
			>
		</footer>

		<ModalDeleteNote
			:noteId="note.id"
			v-if="modals.deleteNote"
			v-model="modals.deleteNote"
		/>
	</div>
</template>

<script setup>
/*
 * imports
 */
import { computed, reactive } from 'vue'
import ModalDeleteNote from '@/components/Notes/ModalDeleteNote.vue'
/*
 * props
 */
const props = defineProps({
	note: {
		type: Object,
		required: true,
	},
})
/*
 * modals
 */
const modals = reactive({
	deleteNote: false,
})
/*
 * characterLength
 */
const characterLength = computed(() => {
	const noteLength = props.note.content.length

	return `${noteLength} character${noteLength > 1 ? 's' : ''}`
})
</script>
