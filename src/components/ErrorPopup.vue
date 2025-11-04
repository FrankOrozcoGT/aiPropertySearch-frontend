<template>
  <div v-if="open" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
      <div class="p-6">
        <div class="flex items-center gap-3 mb-4">
          <AlertCircle class="w-6 h-6 text-red-500 flex-shrink-0" />
          <h2 class="text-lg font-semibold text-gray-900">Error en la búsqueda</h2>
        </div>
        
        <p class="text-sm text-gray-600 mb-6 leading-relaxed">
          {{ error }}
        </p>

        <button
          @click="handleClose"
          class="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          Cerrar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { AlertCircle } from 'lucide-react'

defineProps({
  error: {
    type: String,
    required: true,
  },
  open: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['close'])

function handleClose() {
  emit('close')
}
</script>
