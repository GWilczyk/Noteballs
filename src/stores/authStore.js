import { defineStore } from 'pinia'
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth'

import { auth } from '@/js/firebase'
import { useNotesStore } from '@/stores/notesStore'

export const useAuthStore = defineStore('authStore', {
	state: () => ({
		user: {},
	}),
	actions: {
		init() {
			const notesStore = useNotesStore()

			onAuthStateChanged(auth, user => {
				if (user) {
					this.user = { email: user.email, id: user.uid }

					this.router.push('/')

					notesStore.init(this.user.id)
				} else {
					this.user = {}
					notesStore.clearNotes()
					this.router.replace('/auth')
				}
			})
		},
		async signinUser({ email, password }) {
			try {
				const userCredential = await signInWithEmailAndPassword(
					auth,
					email,
					password
				)

				const user = userCredential.user
			} catch (error) {
				console.error(`Error code ${error.code}: ${error.message}`)
			}
		},
		async signoutUser() {
			try {
				await signOut(auth)
			} catch (error) {
				console.error(`Error code ${error.code}: ${error.message}`)
			}
		},
		async registerUser({ email, password }) {
			try {
				const userCredential = await createUserWithEmailAndPassword(
					auth,
					email,
					password
				)

				const user = userCredential.user
			} catch (error) {
				console.error(`Error code ${error.code}: ${error.message}`)
			}
		},
	},
})