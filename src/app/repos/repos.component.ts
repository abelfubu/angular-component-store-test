import { AsyncPipe, NgForOf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReposStore } from './repos.store';

@Component({
  selector: 'app-repos',
  standalone: true,
  imports: [NgForOf, AsyncPipe],
  providers: [ReposStore],
  template: ` <input
      type="text"
      #username
      (keyup.Enter)="loadRepos(username.value)"
    />
    <div>
      <ul>
        <li *ngFor="let repo of store.repos$ | async">{{ repo.name }}</li>
      </ul>
    </div>`,
})
export class ReposComponent {
  protected readonly store = inject(ReposStore);

  loadRepos(username: string) {
    if (!username) return;

    this.store.getGithubRepos(username);
  }
}
