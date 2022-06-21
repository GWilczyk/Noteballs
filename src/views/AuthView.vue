<template>
	<div class="auth">
		<div class="tabs is-centered">
			<ul>
				<li :class="{ 'is-active': !onRegister }">
					<a @click.prevent="onRegister = false">Login</a>
				</li>
				<li :class="{ 'is-active': onRegister }">
					<a @click.prevent="onRegister = true">Register</a>
				</li>
			</ul>
		</div>

		<div class="card auth-form">
			<div class="card-content">
				<div class="title has-text-centered">{{ formTitle }}</div>

				<form @submit.prevent="onSubmit">
					<div class="field">
						<label class="label">Email</label>
						<div class="control">
							<input
								class="input"
								placeholder="e.g. alexsmith@gmail.com"
								type="email"
								v-model="credentials.email"
							/>
						</div>
					</div>

					<div class="field">
						<label class="label">Password</label>
						<div class="control">
							<input
								class="input"
								placeholder="Enter a password"
								type="password"
								v-model="credentials.password"
							/>
						</div>
					</div>

					<div class="field is-grouped is-grouped-right pt-3">
						<p class="control">
							<button class="button is-info">{{ formTitle }}</button>
						</p>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script setup>
/* imports */
import { computed, reactive, ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'

const onRegister = ref(false)
const authStore = useAuthStore()

const formTitle = computed(() => (onRegister.value ? 'Register' : 'Login'))

const credentials = reactive({
	email: '',
	password: '',
})
/* submit */
const onSubmit = () => {
	if (!credentials.email || !credentials.password) {
		alert('Please enter an email and password gosh darnit!')
	} else {
		if (onRegister.value) {
			authStore.registerUser(credentials)
		} else {
			authStore.signinUser(credentials)
		}
	}
}
</script>

<style>
.auth-form {
	max-width: 400px;
	margin: 0 auto;
}
</style>
