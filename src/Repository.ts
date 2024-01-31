// create an interface for a repository
export interface IRepository<T> {
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T>;
  create(entity: T): void;
  update(entity: T): Promise<T>;
  delete(id: string): Promise<void>;
}
