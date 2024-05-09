import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import {
  filter, finalize, first, tap,
} from 'rxjs/operators';
import { areTodoLoaded } from '../todo.selectors';
import { loadAllTodos, loadTodo } from '../todo.actions';

@Injectable()
export class TodoEditResolver implements Resolve<boolean> {
  loading = false;
  constructor(
    private store: Store
  ) {
  }
  resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.store.pipe(
      select(areTodoLoaded),
      tap((todoLoaded) => {
        if (!this.loading && !todoLoaded) {
          this.loading = true;
          const todoId = route.paramMap.get("id");
          this.store.dispatch(loadTodo({todoId}));
        }
      }),
      filter((todoLoaded) => todoLoaded),
      first(),
      finalize(() => { this.loading = false; }),
    );
  }
}
