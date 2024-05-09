import { createAction, props } from "@ngrx/store";
import { Todo } from "./model/todo.model";


export const loadAllTodos = createAction('[Resolve] Load Todos');

export const allTodoLoaded = createAction(
  '[Load Todo Effect] Todo Loaded',
  props<{ todos: Todo[] }>(),
);

export const createTodo = createAction(
  '[Create Todo Page] Create new Todo',
  props<{ todo: Todo }>(),
);

export const todoCreated = createAction(
  '[Todos Effects] Todo created',
  props<{ todo: Todo }>(),
);


export const loadTodo = createAction(
  '[Todos Eidt Effects] Load Todo',
  props<{ todoId: any }>(),
);

export const todoLoaded = createAction(
  '[Todos Get Effects] Load Todo',
  props<{ todo: Todo }>(),
);

export const updateTodo = createAction(
  '[Edit Todo Page] update Todo',
  props<{ todo: Todo }>(),
);

export const todoUpdated = createAction(
  '[Todos Effects] Todo updated',
  props<{ todo: Todo }>(),
);

export const deleteTodo = createAction(
  '[Delete Todo Page] Delete Todo',
  props<{ todoId : number}>(),
);

export const todoDeleted = createAction(
  '[Todos Effects] Todo deleted',
  props<{ todoId : number}>(),
);
