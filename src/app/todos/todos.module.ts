import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodosRoutingModule } from './todos-routing.module';
import { TodoListComponent } from './component/todo-list/todo-list.component';
import { TodoAddComponent } from './component/todo-add/todo-add.component';
import { TodoUpdateComponent } from './component/todo-update/todo-update.component';
import { TodoResolver } from './resolvers/todo.resolver';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { todoReducer, todosFeatureKey } from './todo.reducer';
import { TodosEffects } from './todo.effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoService } from './services/todo.service';
import { TodoEditResolver } from './resolvers/todo-edit.resolver';
import { TodoComponent } from './component/todo/todo.component';


@NgModule({
  declarations: [
    TodoListComponent,
    TodoAddComponent,
    TodoUpdateComponent,
    TodoComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    TodosRoutingModule,
    EffectsModule.forFeature([
      TodosEffects
    ]),
    StoreModule.forFeature(todosFeatureKey, todoReducer),
  ],
  providers : [
    TodoResolver,
    TodoService,
    TodoEditResolver
  ]
})
export class TodosModule { }
