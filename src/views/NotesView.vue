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

		<progress
			class="progress is-large is-info"
			max="100"
			v-if="!notesStore.notesLoaded"
		/>

		<template v-else>
			<Note :key="note.id" :note="note" v-for="note in notesStore.notes" />

			<div
				class="is-size-4 has-text-centered has-text-grey-light is-family-monospace py-6"
				v-if="!notesStore.notes.length"
			>
				No notes here yet…
			</div>
		</template>
	</div>
</template>

<script setup>
/* imports */
import { ref } from 'vue'
import { useNotesStore } from '@/stores/notesStore'

import { useWatchCharacters } from '@/use/useWatchCharacters'

import AddEditNote from '@/components/Notes/AddEditNote.vue'
import Note from '@/components/Notes/Note.vue'
/* store */
const notesStore = useNotesStore()
/* connecting to firestore */
// onMounted(() => notesStore.init())
/* notes */
const newNote = ref('')
const addEditNoteRef = ref(null)

const addNote = () => {
	notesStore.addNote(newNote.value)
	newNote.value = ''
	addEditNoteRef.value.focusTextarea()
}
/* watch characters */
useWatchCharacters(newNote)
</script>
