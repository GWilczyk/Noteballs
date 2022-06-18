<template>
	<div class="edit-note">
		<AddEditNote
			bgColor="warning"
			label="Edit Note"
			placeholder="Edit note"
			ref="addEditNoteRef"
			v-model="noteContent"
		>
			<template #buttons>
				<button @click="$router.back()" class="button is-link is-light mr-2">
					Cancel
				</button>
				<button
					@click="handleSaveNote"
					:disabled="!noteContent"
					class="button is-link is-warning"
				>
					Save Note
				</button>
			</template>
		</AddEditNote>
	</div>
</template>

<script setup>
/*
 * imports
 */
import { ref } from 'vue'
import { useNotesStore } from '@/stores/notesStore'
import { useRoute, useRouter } from 'vue-router'

import AddEditNote from '@/components/Notes/AddEditNote.vue'
/*
 * store
 */
const notesStore = useNotesStore()
/*
 * router
 */
const route = useRoute()
const router = useRouter()
/*
 * note content
 */
const noteContent = ref('')
noteContent.value = notesStore.getNoteContent(route.params.noteId)
/*
 * save note method
 */
const handleSaveNote = () => {
	const payload = {
		id: route.params.noteId,
		content: noteContent.value,
	}

	notesStore.updateNote(payload)

	router.back()
}
</script>
