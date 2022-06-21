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

let notesCollectionRef
let notesCollectionQuery

let unsubscribeSnapshots = null

export const useNotesStore = defineStore('notesStore', {
	state: () => ({
		notes: [],
		notesLoaded: false,
	}),
	actions: {
		init(userId) {
			notesCollectionRef = collection(db, 'users', userId, 'notes')
			notesCollectionQuery = query(notesCollectionRef, orderBy('date', 'desc'))

			this.getNotes()
		},
		async addNote(content) {
			const date = new Date().getTime().toString()
			await addDoc(notesCollectionRef, {
				content,
				date,
			})
		},
		clearNotes() {
			this.notes = []

			/* unsubscribe from any active listener when logging out */
			if (unsubscribeSnapshots) {
				unsubscribeSnapshots()
			}
		},
		async deleteNote(idToDelete) {
			await deleteDoc(doc(notesCollectionRef, idToDelete))
		},
		async getNotes() {
			this.notesLoaded = false

			unsubscribeSnapshots = onSnapshot(
				notesCollectionQuery,
				querySnapshot => {
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
				},
				error => {
					console.error('error.message: ', error.message)
				}
			)
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
