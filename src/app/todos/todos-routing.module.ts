import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './component/todo-list/todo-list.component';
import { TodoResolver } from './resolvers/todo.resolver';
import { TodoUpdateComponent } from './component/todo-update/todo-update.component';
import { TodoEditResolver } from './resolvers/todo-edit.resolver';
import { TodoAddComponent } from './component/todo-add/todo-add.component';

const route:Routes =[
  // {
  //   path:'',
  //   component: TodoListComponent,
  //   resolve: {
  //     data : TodoResolver
  //   }
  // },
  // {
  //   path:'edit/:id',
  //   component: TodoUpdateComponent,
  //   resolve: {
  //     data : TodoEditResolver
  //   }
  // }
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'todo',
  },
  {
    path: 'todo',
    component: TodoListComponent,
    resolve: {
      data : TodoResolver
    }
  },
  {
    path: 'todo/create',
    component: TodoAddComponent
  },
  {
    path: 'todo/edit/:id',
    component: TodoUpdateComponent,
    resolve: {
      data: TodoEditResolver
    }
  }

]

@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule]
})
export class TodosRoutingModule { }
