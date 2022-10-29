import { Injectable } from '@angular/core';
import { createStore } from "@ngneat/elf";
import { addEntities, deleteEntities, selectAllEntities, updateEntities, withEntities } from "@ngneat/elf-entities";
import { Product } from "../product";
import { v4 as uuid } from 'uuid';
const store = createStore(
  {name: 'product'},
  withEntities<Product>({
    initialValue: [
      {id: uuid(), name: 'IPhone', description: 'Best phone in the world', price: 14000},
      {id: uuid(), name: 'Samsung', description: 'The most famous phone in the world', price: 4000},
      {id: uuid(), name: 'Xiaomi', description: 'The cheapest phone in the world', price: 500},
      {id: uuid(), name: 'Vestel', description: 'Good phone in Turkey', price: 700},
    ]
  })
)

@Injectable({
  providedIn: 'root'
})
export class ProductRepository {
  constructor() { }

  public items$ = store.pipe(selectAllEntities());

  public add = (item: Product) => {
    store.update(addEntities(item));
  }

  public update = ($event: Product) => {
    store.update(
      updateEntities($event.id, (entity) =>({
        ...entity
      })
    ));
  }

  public delete = ($event: Product) => {
    store.update(
      deleteEntities($event.id)
    )
  }
}
