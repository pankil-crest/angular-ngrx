import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on, State } from '@ngrx/store';
import { Todo } from './model/todo.model';
import { allTodoLoaded, createTodo, deleteTodo, loadTodo, todoCreated, todoLoaded, todoUpdated, updateTodo } from './todo.actions';

export const todosFeatureKey = 'todos';

export const adapter: EntityAdapter<Todo> = createEntityAdapter<Todo>();

export const initialTodosState = adapter.getInitialState(
  {
      areTodosLoaded : false,
      areTodoLoaded : false,
      selectedTodo : null
  }
);

export interface Todostate extends EntityState<Todo> {
  areTodosLoaded: boolean;
  areTodoLoaded : boolean;
  selectedTodo : Todo | null
}

export const reducer = createReducer(
  initialTodosState,
  on(allTodoLoaded, (state, action) => {
    adapter.removeAll(state);
    return adapter.setAll(action.todos, {
      ...state,
      areTodosLoaded: true,
    });
  }),
  on(todoCreated, (state, action) => adapter.addOne(action.todo, state)),
  on(todoUpdated, (state, action) => adapter.upsertOne(action.todo, state)),
  on(deleteTodo, (state, action) => adapter.removeOne(action.todoId, state)),
  on(todoLoaded, (state, action) => {
    return Object.assign({}, state, { selectedTodo: action.todo,areTodoLoaded: true});
  }),
);

export const {
  selectAll,
  selectEntities,
} = adapter.getSelectors();

export const getSelectedTodo = (state:any) => state.selectedTodo;

export function todoReducer(state: any, action: any) {
  return reducer(state, action);
}
