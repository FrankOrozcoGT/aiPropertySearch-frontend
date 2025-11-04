<template>
  <div class="w-full h-full bg-gradient-to-br from-indigo-600 to-purple-700 flex flex-col pt-12 overflow-hidden">
    <div class="text-center text-white mb-8">
      <h1 class="text-5xl font-bold mb-2">🏠 Búsqueda de Propiedades</h1>
      <p class="text-lg opacity-90">Encuentra propiedades usando lenguaje natural</p>
    </div>

    <div class="flex justify-center mb-8 px-4">
      <SearchBar :loading="loading" @search="handleSearch" />
    </div>

    <div v-if="sqlQuery && !loading" class="max-w-2xl mx-auto mb-4 px-4">
      <div class="bg-white p-3 rounded shadow text-sm text-gray-800">
        <strong>SQL:</strong> {{ sqlQuery }}
      </div>
    </div>

    <LoadingSpinner v-if="loading" />

    <ErrorPopup v-if="error" :error="error" :open="!!error" @close="clearError" />

    <div v-if="!loading && !error && results.length === 0 && searched" class="text-center text-white py-12">
      <p class="text-xl">No se encontraron propiedades</p>
    </div>

    <div v-if="!loading && !error && results.length > 0" class="flex-1 px-4 overflow-y-auto">
      <PropertyList :properties="results" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { searchProperties } from '@/services/api'
import SearchBar from '@/components/SearchBar.vue'
import PropertyList from '@/components/PropertyList.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ErrorPopup from '@/components/ErrorPopup.vue'

const loading = ref(false)
const error = ref(null)
const results = ref([])
const sqlQuery = ref('')
const searched = ref(false)

async function handleSearch(query) {
  loading.value = true
  error.value = null
  searched.value = true

  try {
    const data = await searchProperties(query)
    if (!data || !Array.isArray(data.results)) {
      throw new Error('Respuesta inválida del servidor')
    }
    results.value = data.results
    sqlQuery.value = data.sql || ''
  } catch (err) {
    error.value = err.message || 'Error desconocido'
    results.value = []
  } finally {
    loading.value = false
  }
}

function clearError() {
  error.value = null
}
</script>
