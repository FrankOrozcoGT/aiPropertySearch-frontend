export interface IPropertyRepository {
  search(query: string): Promise<{ sql: string; results: Array<any> }>
}
