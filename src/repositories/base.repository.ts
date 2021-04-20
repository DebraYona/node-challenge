export interface BaseRepository<T> {
  findById: (id: string) => Promise<T>;
  find: () => Promise<T[]>;
  create: (entity: T) => Promise<T>;
  update: (entity: T, id: string) => Promise<T>;
  delete: (id: string) => Promise<T>;
}
