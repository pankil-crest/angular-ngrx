import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { Todo } from "../model/todo.model";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { catchError, map } from "rxjs/operators";

@Injectable()
export class TodoService {

  API_URL =  environment.API_URL;

  constructor(private readonly http: HttpClient) {
  }

  private handleError(error: HttpErrorResponse) {

    if (error.error.message) {
      return throwError(error.error.message);
    } else if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  getAllTodos() : Observable<Todo[]>  {
    return this.http.get<Todo[]>(`${this.API_URL}/todos`).pipe(
      map((response : any) => {
        return response.todos;
      }),
      catchError((err) => of(err.status))
    )
  }

  createTodo(data : Todo) : Observable<any> {
    let options = {
      headers: new HttpHeaders({ 'Accept': 'application/json' })
    };
    return this.http.post<Todo>(`${this.API_URL}/todos`,data,options).pipe(
      catchError(this.handleError)
    );
  }

  updateTodos(id:any,data:Todo) : Observable<Todo>{
    let options = {
      headers: new HttpHeaders({ 'Accept': 'application/json' })
    };
    return this.http.put<Todo>(`${this.API_URL}/todos/${id}`,data,options)
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteTodo(id : number) : Observable<Todo>  {
    return this.http.delete<any>(`${this.API_URL}/todos/${id}`);
  }

  getTodo(id : number) : Observable<Todo>  {
    return this.http.get<Todo[]>(`${this.API_URL}/todos/${id}`).pipe(
      map((response : any) => {
        return response.todo;
      }),
      catchError((err) => of(err.status))
    )
  }

}
