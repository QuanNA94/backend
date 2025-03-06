export interface BaseRepository<T> {
    findAll(): Promise<T[]>;
    findOne(id: number): Promise<T | null>;
    create(data: Partial<T>): Promise<T>;
    update(id: number, data: Partial<T>): Promise<T | null>;
    delete(id: number): Promise<void>;
}
