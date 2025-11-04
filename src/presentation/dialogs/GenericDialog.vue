<template>
  <Dialog :open="open" @update:open="handleClose">
    <DialogContent :class="['max-w-md', backgroundClass, borderClass]">
      <DialogHeader>
        <DialogTitle :class="['flex items-center gap-2', titleClass]">
          <component :is="icon" v-if="icon" class="w-5 h-5 flex-shrink-0" />
          <span>{{ title }}</span>
        </DialogTitle>
        <DialogDescription class="sr-only">
          {{ description }}
        </DialogDescription>
      </DialogHeader>

      <div class="py-4">
        <p class="text-sm text-white leading-relaxed">
          {{ description }}
        </p>
      </div>

      <DialogFooter>
        <button
          @click="handleClose"
          :class="['font-semibold py-2 px-4 rounded-lg transition-colors', buttonClass]"
        >
          {{ buttonLabel }}
        </button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup>
import { computed } from 'vue'
import { AlertCircle, CheckCircle, Info } from 'lucide-vue-next'
import Dialog from '@/presentation/components/ui/dialog/Dialog.vue'
import DialogContent from '@/presentation/components/ui/dialog/DialogContent.vue'
import DialogFooter from '@/presentation/components/ui/dialog/DialogFooter.vue'
import DialogHeader from '@/presentation/components/ui/dialog/DialogHeader.vue'
import DialogTitle from '@/presentation/components/ui/dialog/DialogTitle.vue'
import DialogDescription from '@/presentation/components/ui/dialog/DialogDescription.vue'

const props = defineProps({
  open: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['error', 'success', 'info'],
    default: 'info',
  },
  buttonLabel: {
    type: String,
    default: 'Cerrar',
  },
})

const emit = defineEmits(['close'])

function handleClose() {
  emit('close')
}

const icon = computed(() => {
  switch (props.type) {
    case 'error':
      return AlertCircle
    case 'success':
      return CheckCircle
    case 'info':
      return Info
    default:
      return null
  }
})

const backgroundClass = computed(() => {
  switch (props.type) {
    case 'error':
      return 'bg-slate-900'
    case 'success':
      return 'bg-slate-900'
    case 'info':
      return 'bg-slate-900'
    default:
      return 'bg-slate-900'
  }
})

const borderClass = computed(() => {
  switch (props.type) {
    case 'error':
      return 'border-red-700'
    case 'success':
      return 'border-green-700'
    case 'info':
      return 'border-blue-700'
    default:
      return 'border-slate-700'
  }
})

const titleClass = computed(() => {
  switch (props.type) {
    case 'error':
      return 'text-red-600'
    case 'success':
      return 'text-green-600'
    case 'info':
      return 'text-blue-600'
    default:
      return 'text-slate-400'
  }
})

const buttonClass = computed(() => {
  switch (props.type) {
    case 'error':
      return 'bg-red-500 hover:bg-red-600 text-white'
    case 'success':
      return 'bg-green-500 hover:bg-green-600 text-white'
    case 'info':
      return 'bg-blue-500 hover:bg-blue-600 text-white'
    default:
      return 'bg-slate-500 hover:bg-slate-600 text-white'
  }
})
</script>
