import helloWorld from './helloWorld';

describe('Test hello world', () => {
  it("should return 'Hello World'", () => {
    expect(helloWorld()).toEqual('Hello World');
  });
});
