import { defineStore } from 'pinia'
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	onSnapshot,
	orderBy,
	query,
	updateDoc,
} from 'firebase/firestore'

import { db } from '@/js/firebase'

const notesCollectionRef = collection(db, 'notes')
const notesCollectionQuery = query(notesCollectionRef, orderBy('date', 'desc'))

export const useNotesStore = defineStore('notesStore', {
	state: () => ({
		notes: [],
		notesLoaded: false,
	}),
	actions: {
		async addNote(content) {
			const date = new Date().getTime().toString()
			await addDoc(notesCollectionRef, {
				content,
				date,
			})
		},
		async deleteNote(idToDelete) {
			await deleteDoc(doc(notesCollectionRef, idToDelete))
		},
		async getNotes() {
			this.notesLoaded = false

			onSnapshot(notesCollectionQuery, querySnapshot => {
				let notes = []

				querySnapshot.forEach(doc => {
					const note = {
						id: doc.id,
						content: doc.data().content,
						date: doc.data().date,
					}
					notes.push(note)
				})

				this.notes = notes

				this.notesLoaded = true
			})
		},
		async updateNote({ id, content }) {
			await updateDoc(doc(notesCollectionRef, id), {
				id,
				content,
			})
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
