<template>
  <Dialog :open="open" @update:open="$emit('update:open', $event)">
    <DialogContent class="max-w-2xl max-h-96 bg-slate-900 border-slate-700 overflow-y-auto">
      <DialogHeader>
        <DialogTitle class="text-blue-600 flex items-center gap-2">
          <Database class="w-5 h-5 flex-shrink-0" />
          <span>SQL Generado</span>
        </DialogTitle>
        <DialogDescription class="text-slate-400">
          Esta es la consulta SQL generada a partir de tu búsqueda
        </DialogDescription>
      </DialogHeader>

      <div class="bg-gray-950 text-gray-100 p-4 rounded font-mono text-sm overflow-x-auto border border-slate-700">
        {{ sql }}
      </div>

      <DialogFooter>
        <button
          @click="copySql"
          class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2 font-semibold"
        >
          <Copy v-if="!copied" class="w-4 h-4" />
          <Check v-else class="w-4 h-4" />
          {{ copied ? 'Copiado!' : 'Copiar SQL' }}
        </button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup>
import { ref } from 'vue'
import { Copy, Check, Database } from 'lucide-vue-next'
import Dialog from '@/presentation/components/ui/dialog/Dialog.vue'
import DialogContent from '@/presentation/components/ui/dialog/DialogContent.vue'
import DialogHeader from '@/presentation/components/ui/dialog/DialogHeader.vue'
import DialogTitle from '@/presentation/components/ui/dialog/DialogTitle.vue'
import DialogDescription from '@/presentation/components/ui/dialog/DialogDescription.vue'
import DialogFooter from '@/presentation/components/ui/dialog/DialogFooter.vue'

defineProps({
  sql: {
    type: String,
    required: true,
  },
  open: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['update:open'])

const copied = ref(false)

function copySql() {
  try {
    const props = defineProps()
    navigator.clipboard.writeText(props.sql)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Error copying SQL:', err)
  }
}
</script>
