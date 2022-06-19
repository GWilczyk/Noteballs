import { defineStore } from 'pinia'
import { collection, getDocs } from 'firebase/firestore'

import { db } from '@/js/firebase'

export const useNotesStore = defineStore('notesStore', {
	state: () => ({
		notes: [],
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
		async getNotes() {
			const querySnapshot = await getDocs(collection(db, 'notes'))

			querySnapshot.forEach(doc => {
				const note = { id: doc.id, content: doc.data().content }
				this.notes.push(note)
			})
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
