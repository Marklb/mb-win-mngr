import { Injectable } from '@angular/core'
import { ID } from '@datorama/akita'
import { HttpClient } from '@angular/common/http'

import { TodosStore } from './todos.store'
import { createTodo } from './todo.model'

@Injectable({ providedIn: 'root' })
export class TodosService {

  constructor(private todosStore: TodosStore) {
  }

  get() {
    // this.http.get().subscribe((entities: ServerResponse) => {
      // this.todosStore.set(entities)
    // })
  }

  add(name: string, label: string) {
    // this.http.post().subscribe((entity: ServerResponse) => {
      // this.todosStore.add(entity)
    // })
    const todo = createTodo({ name, label })
    console.log('todo', todo)
    this.todosStore.add(todo)
  }

}
