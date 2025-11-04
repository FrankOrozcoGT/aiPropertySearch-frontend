import type { IPropertyRepository } from '@/domain/repositories/IPropertyRepository'

export class SearchPropertyUseCase {
  constructor(private repository: IPropertyRepository) {}

  async execute(query: string): Promise<{ sql: string; results: Array<any> }> {
    return this.repository.search(query)
  }
}
