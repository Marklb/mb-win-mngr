import { ID, guid } from '@datorama/akita'

export interface Todo {
  id: ID
  name: string
  label: string
  pid: number
}

export function createTodo({
  id = guid(),
  name = '',
  label = '',
  pid = 0
}: Partial<Todo>) {
  return {
    id,
    name,
    label,
    pid
  } as Todo
}
