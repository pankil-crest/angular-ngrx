import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import {
  filter, finalize, first, tap,
} from 'rxjs/operators';
import { areTodosLoaded } from '../todo.selectors';
import { loadAllTodos } from '../todo.actions';

@Injectable()
export class TodoResolver implements Resolve<boolean> {
  loading = false;

  resolve(): Observable<boolean> {
    return this.store.pipe(
      select(areTodosLoaded),
      tap((todosLoaded) => {
        if (!this.loading && !todosLoaded) {
          this.loading = true;
          this.store.dispatch(loadAllTodos());
        }
      }),
      filter((todosLoaded) => todosLoaded),
      first(),
      finalize(() => { this.loading = false; }),
    );
  }

  constructor(private store: Store) {
  }
}
