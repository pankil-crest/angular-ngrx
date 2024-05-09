import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { allTodoLoaded, createTodo, deleteTodo, loadAllTodos, loadTodo, todoCreated, todoDeleted, todoLoaded, todoUpdated, updateTodo } from "./todo.actions";
import { TodoService } from "./services/todo.service";
import { exhaustMap, map } from "rxjs/operators";
import { Todo } from "./model/todo.model";

@Injectable()
export class TodosEffects {
  constructor(
    private actions$: Actions,
    private invoicesService: TodoService,
  ) {
  }

  loadAllTodos$ = createEffect(() => this.actions$
    .pipe(
      ofType(loadAllTodos),
      exhaustMap(() => this.invoicesService.getAllTodos()),
      map((todos) => allTodoLoaded({ todos })),
    ), { dispatch: true });

    createTodo$ = createEffect(() => this.actions$
    .pipe(
      ofType(createTodo),
      exhaustMap((action) => this.invoicesService.createTodo(action.todo)),
      map((todo) => todoCreated({ todo })),
    ));


    updateTodo$ = createEffect(() => this.actions$
    .pipe(
      ofType(updateTodo),
      exhaustMap((action) => this.invoicesService.updateTodos(action.todo.id,action.todo)),
      map((todo) => todoUpdated({ todo })),
    ));

    deleteTodo$ = createEffect(() => this.actions$
    .pipe(
      ofType(deleteTodo),
      exhaustMap((todoId : any) => this.invoicesService.deleteTodo(todoId)),
      map((todoId : any) => todoDeleted(todoId)),
    ));


    loadTodo$ = createEffect(() => this.actions$
    .pipe(
      ofType(loadTodo),
      exhaustMap((todo : any) => this.invoicesService.getTodo(todo.todoId)),
      map((todo : Todo) => todoLoaded({todo})),
    ));



  // updateTodo$ = createEffect(() => this.actions$
  // .pipe(
  //   ofType(updateTodo),
  //   exhaustMap(() => this.invoicesService.getAllTodos()),
  //   map((todos) => allTodoLoaded({ todos })),
  // ), { dispatch: true });



}

