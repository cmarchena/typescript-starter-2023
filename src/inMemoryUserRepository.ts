import { IRepository } from './Repository';
import { User } from './User';

// implement an inmemory repository using a functional approach
let repo: User[] = [];
export const inMemoryUserRepository: IRepository<User> = {
  getAll: function (): Promise<User[]> {
    return new Promise((resolve, reject) => {
      resolve(repo);
    });
  },
  getById: function (id: string): Promise<User> {
    return new Promise((resolve, reject) => {
      const user = repo.find((item) => id === item?.id);

      if (user !== undefined) {
        resolve(user);
      } else {
        reject(new Error('ID not found'));
      }
    });
  },
  create: function (entity: User): void {
    repo = [...repo, entity];
  },
  update: function (entity: User): Promise<User> {
    return new Promise((resolve, reject) => {
      const user = repo.find((item) => entity.id === item?.id);

      if (user !== undefined) {
        repo = repo.map((item) => (entity.id === item?.id ? entity : item));
        resolve(entity);
      } else {
        reject(new Error('ID not found'));
      }
    });
  },
  delete: function (id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const user = repo.find((item) => id === item?.id);

      if (user !== undefined) {
        repo = repo.filter((item) => id !== item?.id);
        resolve();
      } else {
        reject(new Error('ID not found'));
      }
    });
  },
};
