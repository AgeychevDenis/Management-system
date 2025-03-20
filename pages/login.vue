<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 mb-3">Вход в систему</h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm space-y-2">
          <div>
            <label for="username" class="sr-only">Логин</label>
            <input id="username" v-model="username" type="text" required class="form-input" placeholder="Логин" />
          </div>
          <div class="mt-4">
            <label for="password" class="sr-only">Пароль</label>
            <input id="password" v-model="password" type="password" required class="form-input" placeholder="Пароль" />
          </div>
        </div>

        <div v-if="error" class="error-message text-center">
          {{ error }}
        </div>

        <div>
          <button type="submit" class="btn btn-primary w-full">Войти</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const router = useRouter()

const username = ref('')
const password = ref('')
const error = ref('')

async function handleLogin() {
  const success = await authStore.login(username.value, password.value)
  if (success) {
    router.push('/dashboard')
  } else {
    error.value = 'Неправильный логин или пароль'
  }
}
</script>
