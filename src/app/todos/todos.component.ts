import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ToDo } from '../models/to-do.model';
import { ToDosStore } from './todos.store';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [NgForOf, AsyncPipe, NgIf],
  providers: [ToDosStore],
  template: `
    <div>
      <ul>
        <li *ngFor="let todo of store.toDos$ | async">
          <input
            type="checkbox"
            [checked]="todo.completed"
            (change)="updateTodos(todo)"
          />
          {{ todo.title }}
          <button (click)="editTodo(todo)">✏️</button>
          <button (click)="deleteTodos(todo)">🗑</button>
        </li>
      </ul>
    </div>
  `,
})
export class ToDosComponent implements OnInit {
  protected readonly store = inject(ToDosStore);

  ngOnInit(): void {
    this.store.getToDos();
  }

  updateTodos(todo: ToDo): void {
    this.store.put({ ...todo, completed: !todo.completed });
  }

  deleteTodos(todo: ToDo): void {
    this.store.deleteTodos(todo);
  }

  editTodo(todo: ToDo): void {
    this.store.edit(todo);
  }
}
