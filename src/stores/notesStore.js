import { defineStore } from 'pinia'

export const useNotesStore = defineStore('notesStore', {
	state: () => ({
		notes: [
			{
				id: 'id1',
				content:
					'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt aspernatur dolores debitis delectus cum placeat odit voluptatibus dolor at fuga ex ab quam atque, repudiandae fugit. Omnis saepe molestiae odit?',
			},
			{
				id: 'id2',
				content: 'This is a shorter note! Woo!',
			},
		],
	}),
	actions: {
		addNote(content) {
			const id = new Date().getTime().toString()
			const note = { id, content }

			this.notes.unshift(note)
		},
		deleteNote(idToDelete) {
			this.notes = this.notes.filter(note => note.id !== idToDelete)
		},
		updateNote({ id, content }) {
			const index = this.notes.findIndex(note => note.id === id)

			this.notes[index].content = content
		},
	},
	getters: {
		getNoteContent: state => id =>
			state.notes.filter(note => note.id === id)[0].content,

		notesCharactersNumber: state =>
			state.notes.reduce((acc, cur) => acc + cur.content.length, 0),

		notesNumber: state => state.notes.length,
	},
})
