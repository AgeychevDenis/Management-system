<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-xl font-semibold">Система управления</h1>
          </div>
          <div class="flex items-center">
            <button @click="authStore.logout()" class="btn btn-danger">Выйти</button>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Filters -->
      <div class="bg-white p-4 rounded-lg shadow mb-6">
        <h2 class="text-lg font-semibold mb-4">Фильтры</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Дата</label>
            <div class="mt-1 grid grid-cols-2 gap-2">
              <input type="date" v-model="dateFilters.start" class="form-input" @change="applyFilters" />
              <input type="date" v-model="dateFilters.end" class="form-input" @change="applyFilters" />
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Категории</label>
            <select multiple v-model="selectedCategories" class="form-input h-24" @change="applyFilters">
              <option v-for="category in uniqueCategories" :key="category" :value="category">
                {{ category }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <!-- Products Table -->
      <div class="bg-white shadow rounded-lg">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Имя</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Статус</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Цена</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Категория</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Дата создания</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="product in productStore.filteredProducts" :key="product.id">
              <td class="px-6 py-4 whitespace-nowrap">{{ product.id }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ product.name }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="{
                    'px-2 py-1 text-xs rounded-full': true,
                    'bg-green-100 text-green-800': product.status === 'успешный',
                    'bg-red-100 text-red-800': product.status === 'провальный',
                  }"
                >
                  {{ product.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">{{ product.price }} ₽</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ product.category }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ new Date(product.date_created).toLocaleDateString() }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const productStore = useProductStore()

const dateFilters = ref({
  start: '',
  end: '',
})

const selectedCategories = ref<string[]>([])

const uniqueCategories = computed(() => [...new Set(productStore.products.map(p => p.category))])

function applyFilters() {
  productStore.filterByDate(dateFilters.value.start, dateFilters.value.end)
  if (selectedCategories.value.length) {
    productStore.filterByCategory(selectedCategories.value)
  }
}

// Add route middleware
definePageMeta({
  middleware: ['auth'],
})
</script>
