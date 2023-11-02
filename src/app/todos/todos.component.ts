import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ToDosStore } from './todos.store';
import { ToDo } from '../models/to-do.model';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [NgForOf, AsyncPipe, NgIf],
  providers: [ToDosStore],
  template: ` <div>
    <ul>
      <li *ngFor="let todo of store.toDos$ | async">
        <input
          type="checkbox"
          [checked]="todo.completed"
          (change)="updateTodos(todo)"
        />
        {{ todo.title }}
      </li>
    </ul>
  </div>`,
})
export class ToDosComponent implements OnInit {
  protected readonly store = inject(ToDosStore);

  ngOnInit(): void {
    this.store.getToDos();
  }

  updateTodos(todo: ToDo): void {
    this.store.put({ ...todo, completed: !todo.completed });
  }
}
