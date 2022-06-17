<template>
	<div class="card mb-4">
		<div class="card-content">
			<div class="content">
				{{ note.content }}
				<div class="has-text-right has-text-grey-light mt-2">
					<small>{{ characterLength }}</small>
				</div>
			</div>
		</div>

		<footer class="card-footer">
			<a href="#" class="card-footer-item">Edit</a>
			<a href="#" @click.prevent="handleDelete" class="card-footer-item"
				>Delete</a
			>
		</footer>
	</div>
</template>

<script setup>
/*
 * imports
 */
import { computed } from 'vue'
/*
 * props
 */
const props = defineProps({
	note: {
		type: Object,
		required: true,
	},
})
/*
 * emits
 */
const emit = defineEmits(['deletion'])
/*
 * characterLength
 */
const characterLength = computed(() => {
	const noteLength = props.note.content.length

	return `${noteLength} character${noteLength > 1 ? 's' : ''}`
})
/*
 * handleDelete
 */
const handleDelete = () => emit('deletion', props.note.id)
</script>
