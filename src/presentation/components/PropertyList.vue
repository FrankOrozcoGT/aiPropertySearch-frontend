<template>
  <div>
    <h2 class="text-2xl font-bold text-white mb-6">
      Resultados
      <span class="text-lg text-white/60 ml-2">({{ properties.length }})</span>
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <PropertyCard
        v-for="property in properties"
        :key="property.id"
        :property="property"
      />
    </div>
  </div>
</template>

<script setup>
import PropertyCard from './PropertyCard.vue'

defineProps({
  properties: {
    type: Array,
    required: true,
    default: () => [],
    validator(value) {
      return Array.isArray(value)
    },
  },
})
</script>
