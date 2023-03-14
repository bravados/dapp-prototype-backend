interface UseCase<T> {
  doit(...args: unknown[]): Promise<T>;
}

export { UseCase };
