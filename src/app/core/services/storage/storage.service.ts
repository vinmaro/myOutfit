import { Storage } from '@ionic/storage-angular';
import { StorageEnum } from 'src/app/shared/enums/StorageEnum';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init()
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  /**
   * Get all value for requested entity
   * @param entity Requested entity
   */
  public async get<T>(entity: StorageEnum): Promise<T[]> {
    return (await this._storage?.get(entity) || []) as T[];
  }

  /**
   *
   * Get all value for requested entity
   * @param entity Requested entity
   */
  public async getById<T>(
    entity: StorageEnum,
    id: string
  ): Promise<T | undefined> {
    const actualEntity = (await this._storage?.get(entity)) || [];
    return actualEntity.find((values: any) => values.id === id) as T;
  }

  /**
   * Push new object in a selected entity
   * @param entity Selected enity
   * @param value New object
   */
  public async insert<T>(entity: StorageEnum, value: T): Promise<T[]> {
    let actualEntity = await (this._storage?.get(entity) || []) as T[];
    value = {
      ...value,
      id: Guid.create().toString(),
    };
    actualEntity = [...(actualEntity || []), value]
    return await this._storage?.set(entity, actualEntity);
  }

  /**
   * Update an existing object in a selected entity
   * @param entity Selected enity
   * @param id Id of selected object
   * @param value New object
   */
  public async update<T>(
    entity: StorageEnum,
    id: string,
    value: T
  ): Promise<T[] | false> {
    const actualEntity = (await this._storage?.get(entity)) || [];
    const selectedIndex = actualEntity.findIndex(
      (values: { id: string }) => values.id
    );
    if (selectedIndex !== -1)
      actualEntity[selectedIndex] = {
        ...value,
        id,
      };
    else return false;
    return await this._storage?.set(entity, actualEntity);
  }

  /**
   * Delete an existing object in a selected entity
   * @param entity Selected enity
   * @param id Id of selected object
   */
  public async remove<T>(
    entity: StorageEnum,
    id: string
  ): Promise<T[] | false> {
    const actualEntity = (await this._storage?.get(entity)) || [];
    const selectedIndex = actualEntity.findIndex(
      (values: { id: string }) => values.id
    );
    if (selectedIndex !== -1) actualEntity.splice(selectedIndex, 1);
    else return false;
    return await this._storage?.set(entity, actualEntity);
  }
}
