<template>
  <Dialog :open="open" @update:open="handleClose">
    <DialogContent class="max-w-md">
      <DialogHeader>
        <DialogTitle class="flex items-center gap-2">
          <AlertCircle class="w-5 h-5 text-red-500 flex-shrink-0" />
          <span>Error en la búsqueda</span>
        </DialogTitle>
      </DialogHeader>

      <div class="py-4">
        <p class="text-sm text-gray-700 leading-relaxed">
          {{ error }}
        </p>
      </div>

      <DialogFooter>
        <Button @click="handleClose" variant="default">
          Cerrar
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup>
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
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
