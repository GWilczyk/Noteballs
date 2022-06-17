<template>
	<div class="notes">
		<div class="card has-background-info-dark p-5 mb-5">
			<div class="field">
				<div class="control">
					<textarea
						class="textarea"
						placeholder="Write your new note…"
					></textarea>
				</div>
			</div>

			<div class="field is-grouped is-grouped-right">
				<div class="control">
					<button class="button is-link is-warning">Add New Note</button>
				</div>
			</div>
		</div>

		<div v-for="i in 5" class="card mb-4">
			<div class="card-content">
				<div class="content">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
					aspernatur dolores debitis delectus cum placeat odit voluptatibus
					dolor at fuga ex ab quam atque, repudiandae fugit. Omnis saepe
					molestiae odit?
				</div>
			</div>

			<footer class="card-footer">
				<a href="#" class="card-footer-item">Edit</a>
				<a href="#" class="card-footer-item">Delete</a>
			</footer>
		</div>
	</div>
</template>

<script setup></script>

<style scoped></style>
