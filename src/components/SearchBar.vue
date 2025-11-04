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
        class="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all whitespace-nowrap"
      >
        <Loader2 v-if="loading" class="w-4 h-4 mr-2 animate-spin inline" />
        {{ loading ? 'Buscando...' : 'Buscar' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Loader2 } from 'lucide-react'

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
