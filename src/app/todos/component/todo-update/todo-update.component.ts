import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Todo } from '../../model/todo.model';
import { selectAllTodos, selectTodo } from '../../todo.selectors';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as fromTodos from '../../todo.reducer';
import { updateTodo } from '../../todo.actions';

@Component({
  selector: 'app-todo-update',
  templateUrl: './todo-update.component.html',
  styleUrls: ['./todo-update.component.css']
})
export class TodoUpdateComponent implements OnInit {

  submited : boolean = false;
  form  = this.initForm({
    id: undefined,
    name : '',
    description : ''
  });

  constructor(
    private router : Router,
    private fb: FormBuilder,
    private store: Store<fromTodos.Todostate>) {
  }

  ngOnInit(): void {
    this.store.select(selectTodo).subscribe(todo => {
      this.submited = false;
      this.form = this.initForm(todo)
    })
  }

  initForm(todo?: Todo) {
    return this.fb.group({
      id: [todo && todo.id ? todo.id : undefined],
      name: [todo && todo.name ? todo.name : '', [Validators.required]],
      description: [todo && todo.description ? todo.description : '', [Validators.required]]
    });
  }

  onSubmit(){
    this.submited = true;
    if (this.form.valid) {
      const todo: Todo = this.form.getRawValue();
      this.store.dispatch(updateTodo({ todo }));
      this.submited = false;
      this.router.navigate(['todo']);
    }
  }

}
