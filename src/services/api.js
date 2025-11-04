import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * Busca propiedades basado en una consulta en lenguaje natural
 * @param {string} query - Consulta del usuario en lenguaje natural
 * @returns {Promise} - Respuesta del backend con {sql, results}
 * @throws Error si la consulta es inválida o hay error de conexión
 */
export async function searchProperties(query) {
  // Validación: query no vacío
  if (!query || typeof query !== 'string') {
    throw new Error('La consulta debe ser un texto válido')
  }

  const trimmedQuery = query.trim()

  if (trimmedQuery.length === 0) {
    throw new Error('La consulta no puede estar vacía')
  }

  if (trimmedQuery.length > 500) {
    throw new Error('La consulta es demasiado larga (máximo 500 caracteres)')
  }

  try {
    const response = await apiClient.post('/api/search', {
      query: trimmedQuery,
    })

    // Validar respuesta tiene estructura esperada
    if (!response.data) {
      throw new Error('El servidor respondió sin datos')
    }

    if (!Array.isArray(response.data.results)) {
      throw new Error('Respuesta inválida del servidor: resultados no es array')
    }

    return {
      sql: response.data.sql || '',
      results: response.data.results || [],
    }
  } catch (error) {
    // Manejo específico de errores
    if (error.response) {
      // Error de respuesta del servidor (4xx, 5xx)
      const status = error.response.status
      const detail =
        error.response.data?.detail || 'Error del servidor'

      if (status === 400) {
        throw new Error(`Solicitud inválida: ${detail}`)
      } else if (status === 422) {
        throw new Error(`Datos inválidos: ${detail}`)
      } else if (status === 500) {
        throw new Error(`Error del servidor: ${detail}`)
      } else {
        throw new Error(`Error ${status}: ${detail}`)
      }
    } else if (error.request) {
      // Error de solicitud (sin respuesta)
      throw new Error(
        'No se pudo conectar con el servidor. Verifica que el backend esté corriendo en ' +
          API_BASE_URL
      )
    } else {
      // Error en la configuración de la solicitud
      throw new Error(`Error: ${error.message}`)
    }
  }
}

export default apiClient
