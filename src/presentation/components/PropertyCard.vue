<template>
  <div class="h-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden hover:bg-white/15 hover:border-white/30 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 flex flex-col">
    <!-- Header -->
    <div class="p-4 border-b border-white/10">
      <h3 class="text-lg font-bold text-white line-clamp-2 mb-3">
        {{ property.titulo }}
      </h3>
      <div class="flex items-center gap-3">
        <span class="px-3 py-1 bg-indigo-500/30 text-indigo-200 rounded-full text-sm font-medium">
          {{ formatType(property.tipo) }}
        </span>
        <span class="text-xl font-bold text-green-400">
          ${{ formatPrice(property.precio) }}
        </span>
      </div>
    </div>

    <!-- Content -->
    <div class="p-4 space-y-4 flex-1">
      <p v-if="property.descripcion" class="text-sm text-white/80 line-clamp-2">
        {{ property.descripcion }}
      </p>

      <!-- Features Grid -->
      <div class="grid grid-cols-3 gap-3">
        <div v-if="property.habitaciones" class="flex items-center gap-2 bg-white/5 rounded-lg p-2">
          <Bed :size="18" class="text-yellow-400 flex-shrink-0" />
          <span class="text-sm font-medium text-white">{{ property.habitaciones }}</span>
        </div>
        <div v-if="property.banos" class="flex items-center gap-2 bg-white/5 rounded-lg p-2">
          <Bath :size="18" class="text-blue-400 flex-shrink-0" />
          <span class="text-sm font-medium text-white">{{ property.banos }}</span>
        </div>
        <div v-if="property.area_m2" class="flex items-center gap-2 bg-white/5 rounded-lg p-2">
          <Ruler :size="18" class="text-purple-400 flex-shrink-0" />
          <span class="text-sm font-medium text-white">{{ property.area_m2 }} m²</span>
        </div>
      </div>

      <!-- Location -->
      <div v-if="property.ubicacion" class="flex items-start gap-2 bg-white/5 rounded-lg p-3 border border-white/10">
        <MapPin :size="18" class="text-red-400 flex-shrink-0 mt-0.5" />
        <span class="text-sm text-white/90 line-clamp-2">{{ property.ubicacion }}</span>
      </div>
    </div>

    <!-- Footer -->
    <div v-if="property.fecha_publicacion" class="p-3 bg-white/5 border-t border-white/10 text-xs text-white/60">
      Publicado: {{ formatDate(property.fecha_publicacion) }}
    </div>
  </div>
</template>

<script setup>
import { Bed, Bath, Ruler, MapPin } from 'lucide-vue-next'

defineProps({
  property: {
    type: Object,
    required: true,
    validator(value) {
      return value.id && value.titulo && value.precio
    },
  },
})

function formatPrice(price) {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

function formatType(type) {
  const types = {
    casa: 'Casa',
    departamento: 'Departamento',
    terreno: 'Terreno',
  }
  return types[type?.toLowerCase()] || type
}

function formatDate(date) {
  if (!date) return ''
  try {
    return new Date(date).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  } catch {
    return ''
  }
}
</script>
