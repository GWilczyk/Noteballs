<template>
	<div class="card mb-4">
		<div class="card-content">
			<div class="content">
				{{ note.content }}
				<div class="columns is-mobile has-text-grey-light mt-2">
					<small class="column"> {{ dateFormatted }}</small>
					<small class="column has-text-right">{{ characterLength }}</small>
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
import { useDateFormat } from '@vueuse/core'
import ModalDeleteNote from '@/components/Notes/ModalDeleteNote.vue'
/* props */
const props = defineProps({
	note: {
		type: Object,
		required: true,
	},
})
/* modals */
const modals = reactive({
	deleteNote: false,
})
/* characterLength */
const characterLength = computed(() => {
	const noteLength = props.note.content.length

	return `${noteLength} character${noteLength > 1 ? 's' : ''}`
})

/* date formatted */
const dateFormatted = computed(() => {
	const date = new Date(parseInt(props.note.date))

	return useDateFormat(date, 'DD/MM/YYYY @ HH:mm').value
})
</script>
