import { inMemoryUserRepository } from './inMemoryUserRepository';
import { User } from './User';
import { faker } from '@faker-js/faker';
let newUser: User;
let newUser1: User;
describe('Test inMemoryUserRepository', () => {
  beforeEach(() => {
    newUser = {
      id: faker.string.uuid(),
      name: faker.person.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
  });
  it('should be defined', () => {
    expect(inMemoryUserRepository).toBeDefined();
  });
  it('should create a new user', async () => {
    inMemoryUserRepository.create(newUser);
    const result1 = await inMemoryUserRepository.getAll();
    expect(result1).toContain(newUser);
    const result2 = await inMemoryUserRepository.getById(newUser.id);
    expect(result2).toEqual(newUser);
  });
  it('should get all users', async () => {
    inMemoryUserRepository.create(newUser);
    inMemoryUserRepository.create(newUser1);
    const result1 = await inMemoryUserRepository.getAll();
    expect(result1).toContain(newUser);
    const result2 = await inMemoryUserRepository.getAll();
    expect(result2).toContain(newUser1);
  });
  it('should get user by id', async () => {
    inMemoryUserRepository.create(newUser);
    const result1 = await inMemoryUserRepository.getById(newUser.id);
    expect(result1).toEqual(newUser);
  });
  it('should return "ID not found" when user not found', async () => {
    await expect(inMemoryUserRepository.getById('1')).rejects.toThrow(
      'ID not found',
    );
  });
  it('should update user by id', async () => {
    inMemoryUserRepository.create(newUser);
    const newEmail = faker.internet.email();
    const updatedUser = { ...newUser, email: newEmail };
    await inMemoryUserRepository.update(updatedUser);
    const result1 = await inMemoryUserRepository.getById(newUser.id);
    expect(result1).toEqual(updatedUser);
  });
  it('should return "ID not found" when user not found', async () => {
    await expect(inMemoryUserRepository.update(newUser)).rejects.toThrow(
      'ID not found',
    );
  });
  it('should delete user by id', async () => {
    inMemoryUserRepository.create(newUser);
    await inMemoryUserRepository.delete(newUser.id);
    const result1 = await inMemoryUserRepository.getAll();
    expect(result1).not.toContain(newUser);
  });
  it('should return "ID not found" when user not found', async () => {
    await expect(inMemoryUserRepository.delete('1')).rejects.toThrow(
      'ID not found',
    );
  });
});
