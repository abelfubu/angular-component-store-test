import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { ToDo } from "../models/to-do.model";
import { Injectable, inject } from "@angular/core";
import { AppService } from "../app.service";
import { switchMap } from 'rxjs';

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

  //UPDATER
  readonly updateToDos = this.updater((state, todos: ToDo[]) => ({
    ...state,
    toDos: todos,
  }));
}