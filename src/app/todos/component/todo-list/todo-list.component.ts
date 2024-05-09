import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectAllTodos } from '../../todo.selectors';
import { map, tap } from 'rxjs/operators';
import { Todo } from '../../model/todo.model';
import { Observable } from 'rxjs';
import { loadTodo } from '../../todo.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  //todos:Todo[] = [];
  todos$: Observable<Todo[]>;

  constructor(
    private store : Store,
    private router : Router
  ) {
    this.todos$ = this.store.select(selectAllTodos)
  }

  ngOnInit(): void {

  }
  newTodo(){
    this.router.navigate(['todo/create'])
  }

  load(todo:Todo){
    this.router.navigate(['todo/edit/'+todo.id])
  }

  remove(id:any){
    console.log(id);
  }
}
