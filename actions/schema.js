import { schema, arrayOf } from 'normalizr';

//export const todo = new Schema('todos');
export const todo = new schema.Entity('todos');
export const arrayOfTodos = [ todo ];