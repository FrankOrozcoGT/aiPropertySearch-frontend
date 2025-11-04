<template>
  <div class="w-full h-full bg-gradient-to-br from-indigo-600 to-purple-700 flex flex-col items-center justify-center overflow-hidden">
    <div class="text-center text-white mb-12">
      <h1 class="text-5xl font-bold mb-2">🏠 Búsqueda de Propiedades</h1>
      <p class="text-lg opacity-90">Encuentra propiedades usando lenguaje natural</p>
    </div>

    <div class="w-full max-w-2xl px-4 mb-8">
      <SearchBar :loading="loading" @search="handleSearch" />
    </div>

    <div v-if="sqlQuery && !loading" class="max-w-2xl mx-auto mb-4 px-4">
      <div class="bg-white p-3 rounded shadow text-sm text-gray-800">
        <strong>SQL:</strong> {{ sqlQuery }}
      </div>
    </div>

    <LoadingSpinner v-if="loading" />

    <ErrorPopup v-if="error" :error="error" :open="true" @close="clearError" />

    <div v-if="!loading && !error && results.length === 0 && searched" class="text-center text-white py-12">
      <p class="text-xl">No se encontraron propiedades</p>
    </div>

    <div v-if="!loading && !error && results.length > 0" class="w-full px-4 overflow-y-auto max-h-96">
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
    // Extraer mensaje del error correctamente
    let errorMessage = 'Error desconocido'
    
    if (typeof err === 'string') {
      errorMessage = err
    } else if (err instanceof Error) {
      errorMessage = err.message
    } else if (err?.message) {
      errorMessage = err.message
    }
    
    error.value = errorMessage
    results.value = []
  } finally {
    loading.value = false
  }
}

function clearError() {
  error.value = null
}
</script>
