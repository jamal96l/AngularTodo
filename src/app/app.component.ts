import { Component } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Todo } from './models/todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'ToDo';
  private apiURL = 'http://localhost:3000/';
  public fecha: Date;
  public todo: Todo;
  public newTodo: Todo;
  public todoToFind: Todo;
  public todos: Todo[];
  public idToFInd: string;

  constructor(private http: Http) {
    this.newTodo = new Todo('', '', false, this.fecha);
    this.todoToFind = new Todo('', '', null, this.fecha);
    console.log('Todo list');
    this.getData();
  }

  getTodos() {
    return this.http.get(this.apiURL + 'api/getTodos').map((res: Response) => res.json());
  }

  getData() {
    this.getTodos().subscribe(
      response => {
        if (!response) {

        } else {
          this.todos = response;
          console.log(this.todos);
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  getTodo(id) {
    return this.http.get(this.apiURL + 'api/getTodos/' + id).map((res: Response) => res.json());
  }

  onSubmitFind() {
    this.getTodo(this.idToFInd).subscribe(
      response => {
        if (!response) {
          this.todoToFind = new Todo('', '', null, this.fecha);
          console.log("No existe");
        } else {
          if (response._id!=null){
            this.todoToFind = response;
            console.log(this.todoToFind);
          }else {
            this.todoToFind = new Todo('', '', null, this.fecha);
            console.log("No existe");
          }
        }
      },
      error => {
        console.log(<any>error);
      }
    );

  }

  deleteTodo(id) {
    return this.http.delete(this.apiURL + 'api/DeleteTodos/' + id).map((res: Response) => res.json());
  }

  deleteData(id) {
    this.deleteTodo(id).subscribe(
      response => {
        console.log("Deleted");
        this.getData();
        this.onSubmitFind();
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  updateTodo(id) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.put(this.apiURL + 'api/updateTodos/' + id, { completed: true }, { headers: headers }).map((res: Response) => res.json());
  }

  updateData(id) {
    this.updateTodo(id).subscribe(
      response => {
        console.log("Updated");
        this.getData();
        this.onSubmitFind();
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  registro(newTodo) {
    const params = JSON.stringify({ name: newTodo.name });
    console.log(params);
    const headers = new Headers({ 'Content-Type': 'application/json' });

    return this.http.post(this.apiURL + 'api/postTodos', params, { headers: headers })
      .map((res: Response) => res.json());
  }

  onSubmit() {
    this.registro(this.newTodo).subscribe(

      response => {
        this.fecha = new Date(Date.now());
        this.newTodo = new Todo('', '', false, this.fecha);
        this.getData();
      },
      error => {
        console.log(<any>error);
      }
    );
  }
}