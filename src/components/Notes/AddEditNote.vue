<template>
	<div class="card p-5 mb-5" :class="`has-background-${bgColor}-dark`">
		<label class="label has-text-white" v-if="label">{{ label }}</label>
		<div class="field">
			<div class="control">
				<textarea
					:placeholder="placeholder"
					@input="$emit('update:modelValue', modelValue)"
					class="textarea"
					maxlength="100"
					ref="textareaRef"
					v-autofocus
					v-model="modelValue"
				></textarea>
			</div>
		</div>

		<div class="field is-grouped is-grouped-right">
			<div class="control">
				<slot name="buttons" />
			</div>
		</div>
	</div>
</template>

<script setup>
/*
 * imports
 */
import { ref } from 'vue'
import { vAutofocus } from '@/directives/vAutofocus'
/*
 * props
 */
defineProps({
	bgColor: {
		type: String,
		default: 'info',
	},
	label: {
		type: String,
	},
	modelValue: {
		type: String,
		required: true,
	},
	placeholder: {
		type: String,
		default: 'Write your new note',
	},
})
/*
 * emits
 */
defineEmits(['update:modelValue'])
/*
 * focus textarea
 */
const textareaRef = ref(null)
const focusTextarea = () => textareaRef.value.focus()

defineExpose({
	focusTextarea,
})
</script>
