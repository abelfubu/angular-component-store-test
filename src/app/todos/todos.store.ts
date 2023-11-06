import { Injectable, inject } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { DialogService } from 'primeng/dynamicdialog';
import { filter, switchMap } from 'rxjs';
import { AppService } from '../app.service';
import { ToDo } from '../models/to-do.model';
import { EditTodoComponent } from './edit-todo.component';

interface ToDosState {
  toDos: ToDo[];
}

@Injectable()
export class ToDosStore extends ComponentStore<ToDosState> {
  private readonly service = inject(AppService);
  private readonly dialogService = inject(DialogService);

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

  readonly edit = this.effect<ToDo>((todo$) =>
    todo$.pipe(
      // Pide el todo a la API
      switchMap((todo) =>
        this.service.getOne(todo.id).pipe(
          // Abre el modal y le pasa el todo
          switchMap((todo) =>
            this.dialogService
              .open(EditTodoComponent, { data: todo, header: '✏️ Edit todo' })
              // Filtro por si cierran el modal con la X
              .onClose.pipe(filter(Boolean))
          ),
          // Guarda el todo en la API
          switchMap((title) =>
            this.service.updateTodos({ ...todo, title }).pipe(
              tapResponse({
                // Actualizo el estado
                next: (todo) => this.updateOneTodo(todo),
                error: console.log,
              })
            )
          )
        )
      )
    )
  );

  readonly create = this.effect((trigger$) =>
    trigger$.pipe(
      switchMap(
        () =>
          this.dialogService.open(EditTodoComponent, {
            data: { title: '' },
            header: 'Create todo',
          }).onClose
      ),
      filter(Boolean),
      switchMap((title) =>
        this.service
          .createOne({ id: 0, title, userId: 0, completed: false })
          .pipe(
            tapResponse({
              next: (todo) => this.createNewTodo(todo),
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

  readonly createNewTodo = this.updater((state, todo: ToDo) => ({
    ...state,
    toDos: state.toDos.concat(todo),
  }));
}
