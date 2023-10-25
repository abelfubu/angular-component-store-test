import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'repos',
    loadComponent: () =>
      import('./repos/repos.component').then((m) => m.ReposComponent),
  },
  {
    path: 'todos',
    loadComponent: () =>
      import('./todos/todos.component').then((m) => m.ToDosComponent),
  }
];
