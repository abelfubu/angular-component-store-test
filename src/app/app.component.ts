import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ReposStore } from './repos/repos.store';
import { ToDosStore } from './todos/todos.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  providers: [ReposStore, ToDosStore],
  template: `
    <ul>
      <li>
        <a [routerLink]="['/repos']">Repos</a>
      </li>
      <li>
        <a [routerLink]="['/todos']">To Dos</a>
      </li>
    </ul>
    <router-outlet />
  `,
})
export class AppComponent {}
