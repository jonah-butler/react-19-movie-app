interface ErrorConstructor<T extends string> {
  name: T;
  message: string;
}

export class ServiceError<T extends string> extends Error {
  name: T;
  message: string;

  constructor({ name, message }: ErrorConstructor<T>) {
    super();
    this.name = name;
    this.message = message;
  }
}
