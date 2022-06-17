<template>
	<div class="notes">
		<div class="card has-background-info-dark p-5 mb-5">
			<div class="field">
				<div class="control">
					<textarea
						class="textarea"
						placeholder="Write your new note…"
						ref="textareaRef"
						v-model="newNote"
					></textarea>
				</div>
			</div>

			<div class="field is-grouped is-grouped-right">
				<div class="control">
					<button
						:disabled="!newNote"
						@click="addNote"
						class="button is-link is-warning"
					>
						Add New Note
					</button>
				</div>
			</div>
		</div>

		<Note
			:key="note.id"
			:note="note"
			@deletion="deleteNote"
			v-for="note in notes"
		/>
	</div>
</template>

<script setup>
/*
 * imports
 */
import { ref } from 'vue'
import Note from '@/components/Notes/Note.vue'
/*
 * notes
 */
const newNote = ref('')

const notes = ref([
	{
		id: 'id1',
		content:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt aspernatur dolores debitis delectus cum placeat odit voluptatibus dolor at fuga ex ab quam atque, repudiandae fugit. Omnis saepe molestiae odit?',
	},
	{
		id: 'id2',
		content: 'This is a shorter note! Woo!',
	},
])

const textareaRef = ref(null)

const addNote = () => {
	const id = new Date().getTime().toString()
	const note = { id, content: newNote.value }

	notes.value.unshift(note)
	newNote.value = ''
	textareaRef.value.focus()
}

const deleteNote = idToDelete =>
	(notes.value = notes.value.filter(note => note.id !== idToDelete))
</script>
