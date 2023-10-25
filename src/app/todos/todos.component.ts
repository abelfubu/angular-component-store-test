import { AsyncPipe, NgForOf, NgIf } from "@angular/common";
import { Component, inject } from "@angular/core";
import { ToDosStore } from "./todos.store";

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [NgForOf, AsyncPipe, NgIf],
  providers: [ToDosStore],
  template: `
  <button (click)="loadToDos()">LOAD</button>
  <div>
    <ul>
      <li *ngFor="let todo of store.toDos$ | async"> <input type="checkbox" [checked]="todo.completed"/> {{ todo.title }}</li>
    </ul>
  </div>`,
})

export class ToDosComponent {
  protected readonly store = inject(ToDosStore);

  loadToDos() {
    this.store.getToDos();
  }
}