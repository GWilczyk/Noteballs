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
				await signInWithEmailAndPassword(auth, email, password)
			} catch (error) {
				switch (error.code) {
					case 'auth/user-not-found':
						alert('User not found')
						break
					case 'auth/wrong-password':
						alert('Wrong password')
						break
					default:
						alert('Something went wrong')
				}
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
				await createUserWithEmailAndPassword(auth, email, password)
			} catch (error) {
				switch (error.code) {
					case 'auth/email-already-in-use':
						alert('Email already in use')
						break
					case 'auth/invalid-email':
						alert('Invalid email')
						break
					case 'auth/operation-not-allowed':
						alert('Operation not allowed')
						break
					case 'auth/weak-password':
						alert('Weak password')
						break
					default:
						alert('Something went wrong')
				}
			}
		},
	},
})
