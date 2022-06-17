<template>
	<nav class="navbar is-info" role="navigation" aria-label="main navigation">
		<div class="container is-max-desktop px-2">
			<div class="navbar-brand">
				<div class="is-family-monospace is-size-4 navbar-item">Noteballs</div>

				<a
					:class="{ 'is-active': showMobileNav }"
					@click.prevent="showMobileNav = !showMobileNav"
					aria-expanded="false"
					aria-label="menu"
					class="navbar-burger"
					data-target="navbarBasicExample"
					role="button"
				>
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
				</a>
			</div>

			<div
				:class="{ 'is-active': showMobileNav }"
				id="navbarBasicExample"
				class="navbar-menu"
			>
				<div class="navbar-end">
					<RouterLink active-class="is-active" class="navbar-item" to="/">
						Notes
					</RouterLink>
					<RouterLink active-class="is-active" class="navbar-item" to="/stats">
						Stats
					</RouterLink>
				</div>
			</div>
		</div>
	</nav>
</template>

<script setup>
/*
 * imports
 */
import { ref } from 'vue'
/*
 * mobile nav
 */
const showMobileNav = ref(false)
</script>

<style>
@media (max-width: 1023px) {
	.navbar-menu {
		position: absolute;
		left: 0;
		width: 100%;
	}
}
</style>
