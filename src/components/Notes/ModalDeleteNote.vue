<template>
	<div class="modal is-active p-2">
		<div class="modal-background"></div>
		<div class="modal-card" ref="modalCardRef">
			<header class="modal-card-head">
				<p class="modal-card-title">Delete Note?</p>
				<button @click="closeModal" aria-label="close" class="delete"></button>
			</header>
			<section class="modal-card-body">
				Are you sure you want to delete this note?
			</section>
			<footer class="modal-card-foot is-justify-content-flex-end">
				<button @click="closeModal" class="button is-warning">Cancel</button>
				<button @click="handleDeleteNote" class="button is-danger">
					Delete
				</button>
			</footer>
		</div>
	</div>
</template>

<script setup>
/*
 * imports
 */
import { onMounted, onUnmounted, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

import { useNotesStore } from '@/stores/notesStore'
/*
 * props
 */
const props = defineProps({
	modelValue: {
		type: Boolean,
		default: false,
	},
	noteId: {
		type: String,
		required: true,
	},
})
/*
 * store (for deleteNote method)
 */
const notesStore = useNotesStore()
/*
 * emits
 */
const emit = defineEmits(['update:modelValue'])
/*
 * handle Delete Note
 */
const handleDeleteNote = () => notesStore.deleteNote(props.noteId)
/*
 * close modal
 */
const closeModal = () => emit('update:modelValue', false)
/*
 * click outside to close modal
 */
const modalCardRef = ref(null)

onClickOutside(modalCardRef, closeModal)
/*
 * keyboard control
 */
const handleKeyboardEvents = event => event.key === 'Escape' && closeModal()

onMounted(() => {
	document.addEventListener('keyup', handleKeyboardEvents)
})

onUnmounted(() => {
	document.removeEventListener('keyup', handleKeyboardEvents)
})
</script>
