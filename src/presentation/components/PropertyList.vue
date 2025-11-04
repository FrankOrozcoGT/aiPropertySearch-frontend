<template>
  <div class="property-list-container">
    <div class="mb-4">
      <h2 class="text-2xl font-bold">
        Resultados
        <span class="text-lg text-gray-500 ml-2">({{ properties.length }})</span>
      </h2>
    </div>

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
