<template>
  <GenericDialog
    :open="open"
    type="error"
    title="Error en la búsqueda"
    :description="errorMessage"
    button-label="Cerrar"
    @close="emit('close')"
  />
</template>

<script setup>
import { computed } from 'vue'
import GenericDialog from '@/presentation/dialogs/GenericDialog.vue'

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

