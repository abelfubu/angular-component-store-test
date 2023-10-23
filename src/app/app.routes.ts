import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'repos',
    loadComponent: () =>
      import('./repos/repos.component').then((m) => m.ReposComponent),
  },
];
