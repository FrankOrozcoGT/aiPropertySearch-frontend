<template>
  <div class="search-bar-container w-full max-w-2xl mx-auto">
    <div class="flex gap-2">
      <input
        v-model="query"
        type="text"
        placeholder="Ej: Terrenos en zona 15"
        @keyup.enter="emitSearch"
        :disabled="loading"
        class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <Button
        @click="emitSearch"
        :disabled="loading || !query.trim()"
        :variant="loading ? 'outline' : 'default'"
      >
        <Loader2 v-if="loading" class="w-4 h-4 mr-2 animate-spin" />
        {{ loading ? 'Buscando...' : 'Buscar' }}
      </Button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
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
