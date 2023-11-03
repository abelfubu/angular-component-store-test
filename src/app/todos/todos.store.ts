import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { ToDo } from '../models/to-do.model';
import { Injectable, inject } from '@angular/core';
import { AppService } from '../app.service';
import { switchMap, tap } from 'rxjs';

interface ToDosState {
  toDos: ToDo[];
}

@Injectable()
export class ToDosStore extends ComponentStore<ToDosState> {
  private readonly service = inject(AppService);
  constructor() {
    super({ toDos: [] });
  }

  //SELECTOR
  readonly toDos$ = this.select((state) => state.toDos);

  //EFFECT
  readonly getToDos = this.effect((trigger$) =>
    trigger$.pipe(
      switchMap(() =>
        this.service.getToDos().pipe(
          tapResponse({
            next: (todos) => this.updateToDos(todos),
            error: console.log,
          })
        )
      )
    )
  );

  readonly put = this.effect<ToDo>((todo$) =>
    todo$.pipe(
      switchMap((todo) =>
        this.service.updateTodos(todo).pipe(
          tapResponse({
            next: (todo) => this.updateOneTodo(todo),
            error: console.log,
          })
        )
      )
    )
  );

  readonly delete = this.effect<ToDo>((todo$) =>
    todo$.pipe(
      switchMap((todo) =>
        this.service.deleteTodos(todo).pipe(
          tapResponse({
            next: (todo) => this.deleteTodos(todo),
            error: console.log,
          })
        )
      )
    )
  );

  //UPDATER
  readonly updateToDos = this.updater((state, todos: ToDo[]) => ({
    ...state,
    toDos: todos,
  }));

  readonly updateOneTodo = this.updater((state, todo: ToDo) => ({
    ...state,
    toDos: state.toDos.map((t) => (t.id === todo.id ? todo : t)),
  }));

  readonly deleteTodos = this.updater((state, todo: ToDo) => ({
    ...state,
    toDos: state.toDos.filter((t) => t.id !== todo.id),
  }));
}
