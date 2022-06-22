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

				<form @submit.prevent="onSubmit" novalidate="true">
					<div class="field">
						<label class="label">Email</label>
						<div class="control">
							<input
								class="input"
								:class="{ 'is-danger': !!errors.email }"
								placeholder="e.g. alexsmith@gmail.com"
								type="email"
								v-model="credentials.email"
								v-autofocus
							/>

							<div class="error-message-container">
								<p v-if="errors.email.length">{{ errors.email }}</p>
							</div>
						</div>
					</div>

					<div class="field">
						<label class="label">Password</label>
						<div class="control">
							<input
								class="input"
								:class="{ 'is-danger': !!errors.password }"
								placeholder="Enter a password"
								type="password"
								v-model="credentials.password"
							/>

							<div class="error-message-container">
								<p v-if="errors.password.length">{{ errors.password }}</p>
							</div>
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
import { vAutofocus } from '@/directives/vAutofocus'

const onRegister = ref(false)
const authStore = useAuthStore()

const formTitle = computed(() => (onRegister.value ? 'Register' : 'Login'))

const credentials = reactive({
	email: '',
	password: '',
})

const errors = reactive({
	email: '',
	password: '',
})

const validEmail = email => {
	const regex =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	return regex.test(email)
}

const validateEmail = email =>
	(errors.email = !email
		? 'Email required.'
		: !validEmail(email)
		? 'Email not valid.'
		: '')

const validatePassword = password =>
	(errors.password = !password
		? 'Password required.'
		: password.length < 7
		? 'Password must be at least 6 characters long.'
		: '')
/* submit */
const onSubmit = () => {
	validateEmail(credentials.email)
	validatePassword(credentials.password)

	if (!errors.email && !errors.password) {
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
.error-message-container {
	min-height: 24px;
}

.error-message-container > p {
	color: crimson;
}
</style>
