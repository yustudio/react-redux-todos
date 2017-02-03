import { schema, arrayOf } from 'normalizr';

//export const todo = new Schema('todos');

// normalized object has todos attribute, but each attribute has value in the form of a todo
// in action's index.js toggleTodo, normalize the todo with this todo schema
export const todo = new schema.Entity('todos'); 
export const arrayOfTodos = [ todo ];