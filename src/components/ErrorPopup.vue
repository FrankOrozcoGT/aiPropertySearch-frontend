<template>
  <Dialog :open="open" @update:open="handleClose">
    <DialogContent class="max-w-md bg-slate-900 border-red-700">
      <DialogHeader>
        <DialogTitle class="text-red-600 flex items-center gap-2">
          <svg class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
          <span>Error en la búsqueda</span>
        </DialogTitle>
        <DialogDescription class="sr-only">
          {{ errorMessage }}
        </DialogDescription>
      </DialogHeader>

      <div class="py-4">
        <p class="text-sm text-white leading-relaxed">
          {{ errorMessage }}
        </p>
      </div>

      <DialogFooter>
        <button
          @click="handleClose"
          class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          Cerrar
        </button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup>
import { computed } from 'vue'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'

const props = defineProps({
  error: {
    type: [String, Object, Error],
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

const errorMessage = computed(() => {
  const err = props.error
  
  if (!err) return 'Error desconocido'
  
  if (typeof err === 'string') {
    return err
  }
  
  if (err instanceof Error) {
    return err.message
  }
  
  if (err?.message) {
    return err.message
  }
  
  return 'Error desconocido'
})
</script>
