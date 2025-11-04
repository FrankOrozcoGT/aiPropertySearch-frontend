import axios from 'axios'
import type { IPropertyRepository } from '@/domain/repositories/IPropertyRepository'
import { API_BASE_URL } from '@/config/api'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

export class PropertyHttpAdapter implements IPropertyRepository {
  async search(query: string): Promise<{ sql: string; results: Array<any> }> {
    if (!query || query.trim().length === 0) {
      throw new Error('La consulta no puede estar vacía')
    }
    if (query.length > 500) {
      throw new Error('La consulta es demasiado larga (máximo 500 caracteres)')
    }

    try {
      const response = await apiClient.post('/api/search', { query: query.trim() })

      if (!response.data || !Array.isArray(response.data.results)) {
        throw new Error('Respuesta inválida del servidor')
      }

      return {
        sql: response.data.sql || '',
        results: response.data.results || [],
      }
    } catch (error: any) {
      if (error.response?.status === 400) {
        throw new Error(`Solicitud inválida: ${error.response.data?.detail}`)
      }
      if (error.response?.status === 500) {
        throw new Error(`Error del servidor: ${error.response.data?.detail}`)
      }
      if (error.request) {
        throw new Error(`No se pudo conectar con ${API_BASE_URL}`)
      }
      throw new Error(error.message || 'Error desconocido')
    }
  }
}
