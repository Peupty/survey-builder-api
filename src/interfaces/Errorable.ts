export abstract class aErrorable<T> {
  protected abstract _errors: T[]

  abstract get errors(): T[]
}
