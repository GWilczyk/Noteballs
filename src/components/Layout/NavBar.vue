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
					ref="navbarBurgerRef"
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
				ref="navbarMenuRef"
			>
				<div class="navbar-start">
					<button
						v-if="authStore.user.id"
						@click="handleSignout"
						class="button is-small is-warning mt-3 ml-3"
					>
						Sign out {{ authStore.user.email }}
					</button>
				</div>
				<div class="navbar-end">
					<RouterLink
						@click="showMobileNav = false"
						active-class="is-active"
						class="navbar-item"
						to="/"
					>
						Notes
					</RouterLink>

					<RouterLink
						@click="showMobileNav = false"
						active-class="is-active"
						class="navbar-item"
						to="/stats"
					>
						Stats
					</RouterLink>
				</div>
			</div>
		</div>
	</nav>
</template>

<script setup>
/* imports */
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useAuthStore } from '@/stores/authStore'
/* store */
const authStore = useAuthStore()
/* mobile nav */
const showMobileNav = ref(false)
/* click outside to close */
const navbarMenuRef = ref(null)
const navbarBurgerRef = ref(null)

const onClickOutsideHandler = () => (showMobileNav.value = false)

const options = {
	ignore: [navbarBurgerRef],
}

onClickOutside(navbarMenuRef, onClickOutsideHandler, options)
/* handle signout */
const handleSignout = () => {
	onClickOutsideHandler()
	authStore.signoutUser()
}
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
