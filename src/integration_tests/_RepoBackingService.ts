export interface RepoBackingService<T> extends Array<T> {
  populate(records: Array<T>): Promise<void>;
  unmake(): Promise<void>;
}
