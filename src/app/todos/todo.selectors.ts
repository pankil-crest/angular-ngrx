import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Todostate, todosFeatureKey, selectAll } from './todo.reducer';
import * as fromtodos from './todo.reducer';

export const selectTodoState = createFeatureSelector<
Todostate>(todosFeatureKey);

export const areTodosLoaded = createSelector(
  selectTodoState,
  (state) => state.areTodosLoaded
);

export const areTodoLoaded = createSelector(
  selectTodoState,
  (state) => state.areTodoLoaded,
);

export const selectAllTodos = createSelector(
  selectTodoState,
  fromtodos.selectAll,
);

export const selectTodo = createSelector(selectTodoState, fromtodos.getSelectedTodo);
