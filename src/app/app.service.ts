import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { GithubRepo } from './models/github-repo.model';
import { ToDo } from './models/to-do.model';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private readonly http = inject(HttpClient);

  getGithubRepos(username: string): Observable<GithubRepo[]> {
    return this.http.get<GithubRepo[]>(
      `https://api.github.com/users/${username}/repos`
    );
  }

  getToDos(): Observable<ToDo[]> {
    return this.http.get<ToDo[]>(`https://jsonplaceholder.typicode.com/todos`);
  }

  updateTodos(todo: ToDo): Observable<ToDo> {
    return this.http.put<ToDo>(
      `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
      todo
    );
  }

  deleteTodos(todo: ToDo): Observable<ToDo> {
    return this.http.delete<ToDo>(
      `https://jsonplaceholder.typicode.com/todos/${todo.id}`
    );
  }

  getOne(id: number): Observable<ToDo> {
    return this.http.get<ToDo>(
      `https://jsonplaceholder.typicode.com/todos/${id}`
    );
  }
}
