<template>
  <div class="w-full max-w-2xl">
    <div class="flex gap-3 items-center">
      <input
        v-model="query"
        type="text"
        placeholder="Ej: Terrenos en zona 15"
        @keyup.enter="emitSearch"
        :disabled="loading"
        class="flex-1 px-5 py-3 bg-white/20 border border-white/40 text-white placeholder-white/70 rounded-xl focus:outline-none focus:ring-2 focus:ring-white focus:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      />
      <button
        @click="emitSearch"
        :disabled="loading || !query.trim()"
        class="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all whitespace-nowrap flex items-center gap-2"
      >
        <svg v-if="loading" class="w-4 h-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        {{ loading ? 'Buscando...' : 'Buscar' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['search'])
const query = ref('')

function emitSearch() {
  if (!query.value.trim()) {
    return
  }

  emit('search', query.value.trim())
  query.value = ''
}
</script>
