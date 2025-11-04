<template>
  <Card class="h-full hover:shadow-lg transition-shadow">
    <CardHeader>
      <CardTitle class="line-clamp-2">{{ property.titulo }}</CardTitle>
      <CardDescription class="flex items-center gap-2 mt-2">
        <Badge :variant="getTypeVariant(property.tipo)">
          {{ formatType(property.tipo) }}
        </Badge>
        <span class="text-lg font-semibold text-green-600">
          ${{ formatPrice(property.precio) }}
        </span>
      </CardDescription>
    </CardHeader>

    <CardContent class="space-y-3">
      <p v-if="property.descripcion" class="text-sm text-gray-600 line-clamp-2">
        {{ property.descripcion }}
      </p>

      <div class="grid grid-cols-3 gap-2 text-sm">
        <div v-if="property.habitaciones" class="flex items-center gap-1">
          <Bed class="w-4 h-4 text-gray-500" />
          <span>{{ property.habitaciones }} hab</span>
        </div>
        <div v-if="property.banos" class="flex items-center gap-1">
          <Bath class="w-4 h-4 text-gray-500" />
          <span>{{ property.banos }} baño</span>
        </div>
        <div v-if="property.area_m2" class="flex items-center gap-1">
          <Ruler class="w-4 h-4 text-gray-500" />
          <span>{{ property.area_m2 }} m²</span>
        </div>
      </div>

      <div v-if="property.ubicacion" class="flex items-center gap-2 text-sm text-gray-700 pt-2 border-t">
        <MapPin class="w-4 h-4 text-red-500 flex-shrink-0" />
        <span class="line-clamp-1">{{ property.ubicacion }}</span>
      </div>
    </CardContent>

    <CardFooter v-if="property.fecha_publicacion" class="text-xs text-gray-500">
      Publicado: {{ formatDate(property.fecha_publicacion) }}
    </CardFooter>
  </Card>
</template>

<script setup>
import Card from '@/presentation/components/ui/card/Card.vue'
import CardContent from '@/presentation/components/ui/card/CardContent.vue'
import CardDescription from '@/presentation/components/ui/card/CardDescription.vue'
import CardFooter from '@/presentation/components/ui/card/CardFooter.vue'
import CardHeader from '@/presentation/components/ui/card/CardHeader.vue'
import CardTitle from '@/presentation/components/ui/card/CardTitle.vue'
import Badge from '@/presentation/components/ui/badge/Badge.vue'
import { Bed, Bath, Ruler, MapPin } from 'lucide-react'

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

function getTypeVariant(type) {
  const variants = {
    casa: 'default',
    departamento: 'secondary',
    terreno: 'outline',
  }
  return variants[type?.toLowerCase()] || 'default'
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
    return date
  }
}
</script>
