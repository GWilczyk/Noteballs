<template>
	<div class="notes">
		<AddEditNote ref="addEditNoteRef" v-model="newNote">
			<template #buttons>
				<button
					:disabled="!newNote"
					@click="addNote"
					class="button is-link is-warning"
				>
					Add New Note
				</button>
			</template>
		</AddEditNote>

		<Note :key="note.id" :note="note" v-for="note in notesStore.notes" />
	</div>
</template>

<script setup>
/*
 * imports
 */
import { ref } from 'vue'
import { useNotesStore } from '@/stores/notesStore'

import { useWatchCharacters } from '@/use/useWatchCharacters'

import AddEditNote from '@/components/Notes/AddEditNote.vue'
import Note from '@/components/Notes/Note.vue'
/*
 * store
 */
const notesStore = useNotesStore()
/*
 * notes
 */
const newNote = ref('')
const addEditNoteRef = ref(null)

const addNote = () => {
	notesStore.addNote(newNote.value)
	newNote.value = ''
	addEditNoteRef.value.focusTextarea()
}
/*
 * watch characters
 */
useWatchCharacters(newNote)
</script>
