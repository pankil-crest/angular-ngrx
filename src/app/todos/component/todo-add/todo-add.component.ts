import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as fromTodos from '../../todo.reducer';
import { Store } from '@ngrx/store';
import { FormBuilder, Validators } from '@angular/forms';
import { Todo } from '../../model/todo.model';
import { createTodo } from '../../todo.actions';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css']
})
export class TodoAddComponent implements OnInit {

  submited : boolean = false;
  form  = this.initForm({
    name : '',
    description : ''
  });

  constructor(
    private router : Router,
    private fb: FormBuilder,
    private store: Store<fromTodos.Todostate>) {
  }

  ngOnInit(): void {

  }

  initForm(todo?: Todo) {
    return this.fb.group({
      name: [todo && todo.name ? todo.name : '', [Validators.required]],
      description: [todo && todo.description ? todo.description : '', [Validators.required]]
    });
  }

  onSubmit(){
    this.submited = true;
    if (this.form.valid) {
      const todo: Todo = this.form.getRawValue();
      this.store.dispatch(createTodo({ todo }));
      this.submited = false;
      this.router.navigate(['todo']);
    }
  }


}
