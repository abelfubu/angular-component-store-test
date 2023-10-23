import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ReposStore } from './repos/repos.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  providers: [ReposStore],
  template: `
    <ul>
      <li>
        <a [routerLink]="['/repos']">Repos</a>
      </li>
    </ul>
    <router-outlet />
  `,
})
export class AppComponent {}
