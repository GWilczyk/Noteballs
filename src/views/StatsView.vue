<template>
	<div class="stats">
		<table class="table is-fullwidth">
			<thead>
				<tr>
					<th>Stat</th>
					<th>Value</th>
				</tr>
			</thead>

			<tbody>
				<tr>
					<td>Number of Notes</td>
					<td>{{ notesStore.notesNumber }}</td>
				</tr>
				<tr>
					<td>Number of characters (of all notes)</td>
					<td>{{ notesStore.notesCharactersNumber }}</td>
				</tr>
			</tbody>
		</table>

		<input
			class="input"
			placeholder="Do you love Noteballs?"
			type="text"
			v-autofocus
			v-model="loveNoteballs"
		/>
	</div>
</template>

<script setup>
/*
 * imports
 */
import { ref } from 'vue'
import { useNotesStore } from '@/stores/notesStore'
import { vAutofocus } from '@/directives/vAutofocus'
import { useWatchCharacters } from '@/use/useWatchCharacters'
/*
 * store
 */
const notesStore = useNotesStore()
/*
 * love Noteballs
 */
const loveNoteballs = ref('')
useWatchCharacters(loveNoteballs, 20)
</script>
