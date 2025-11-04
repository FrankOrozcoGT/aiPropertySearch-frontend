<template>
  <div :class="['w-full h-screen bg-gradient-to-br from-indigo-600 to-purple-700 flex flex-col overflow-hidden', hasResults ? '' : 'justify-center']">
    <!-- Header -->
    <div :class="['text-center text-white flex-shrink-0', hasResults ? 'pt-4 pb-2' : 'py-8']">
      <h1 class="text-4xl font-bold mb-1">🏠 Búsqueda de Propiedades</h1>
      <p class="text-base opacity-90">Encuentra propiedades usando lenguaje natural</p>
    </div>

    <!-- Search Bar -->
    <div class="w-full px-4 flex-shrink-0 flex justify-center" :class="[hasResults ? 'mb-2' : 'mb-8']">
      <div class="w-full max-w-2xl">
        <SearchBar
          :loading="loading"
          :has-sql="!!sqlQuery"
          @search="handleSearch"
          @show-sql="showSqlModal = true"
        />
      </div>
    </div>

    <!-- Modals -->
    <SqlViewerDialog
      :sql="sqlQuery"
      :open="showSqlModal"
      @update:open="showSqlModal = $event"
    />

    <LoadingSpinner v-if="loading" />

    <ErrorPopup v-if="error" :error="error" :open="true" @close="clearError" />

    <!-- Content Area (scrollable when has results) -->
    <div class="flex-1 overflow-y-auto px-4 pb-4" :class="[hasResults ? 'pt-2' : 'pt-4']">
      <!-- No Results -->
      <div v-if="!loading && !error && results.length === 0 && searched" class="text-center text-white py-12">
        <p class="text-xl">No se encontraron propiedades</p>
      </div>

      <!-- Results List -->
      <div v-if="!loading && !error && results.length > 0" class="max-w-7xl mx-auto w-full">
        <PropertyList :properties="results" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { PropertyHttpAdapter } from '@/infrastructure/adapters/http/PropertyHttpAdapter'
import { SearchPropertyUseCase } from '@/application/use-cases/SearchPropertyUseCase'
import SearchBar from '@/presentation/components/SearchBar.vue'
import PropertyList from '@/presentation/components/PropertyList.vue'
import LoadingSpinner from '@/presentation/components/LoadingSpinner.vue'
import ErrorPopup from '@/presentation/components/ErrorPopup.vue'
import SqlViewerDialog from '@/presentation/dialogs/SqlViewerDialog.vue'

const loading = ref(false)
const error = ref(null)
const results = ref([])
const sqlQuery = ref('')
const searched = ref(false)
const showSqlModal = ref(false)

let searchUseCase

const hasResults = computed(() => !loading.value && !error.value && results.value.length > 0)

onMounted(() => {
  const repository = new PropertyHttpAdapter()
  searchUseCase = new SearchPropertyUseCase(repository)
})

async function handleSearch(query) {
  loading.value = true
  error.value = null
  searched.value = true

  try {
    const data = await searchUseCase.execute(query)
    if (!data || !Array.isArray(data.results)) {
      throw new Error('Respuesta inválida del servidor')
    }
    results.value = data.results
    sqlQuery.value = data.sql || ''
  } catch (err) {
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
