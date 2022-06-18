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
	</div>
</template>

<script setup>
/*
 * imports
 */
import { useNotesStore } from '@/stores/notesStore'
/*
 * store
 */
const notesStore = useNotesStore()
</script>
