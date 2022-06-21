import { createRouter, createWebHashHistory } from 'vue-router'

import { useAuthStore } from '@/stores/authStore'

import AuthView from '@/views/AuthView.vue'
import EditNoteView from '@/views/EditNoteView.vue'
import NotesView from '@/views/NotesView.vue'
import StatsView from '@/views/StatsView.vue'

const routes = [
	{
		path: '/',
		name: 'notes',
		component: NotesView,
	},
	{
		path: '/auth',
		name: 'auth',
		component: AuthView,
	},
	{
		path: '/editNote/:noteId',
		name: 'edit-note',
		component: EditNoteView,
	},
	{
		path: '/stats',
		name: 'stats',
		component: StatsView,
	},
]

const router = createRouter({
	history: createWebHashHistory(),
	routes,
})

/* navigation guard */
router.beforeEach(async (to, from) => {
	const authStore = useAuthStore()

	if (!authStore.user.id && to.name !== 'auth') {
		return {
			name: 'auth',
		}
	}

	if (authStore.user.id && to.name === 'auth') {
		return false
	}
})

export default router
