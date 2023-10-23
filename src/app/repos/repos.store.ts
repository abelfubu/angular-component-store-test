import { Injectable, inject } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { switchMap } from 'rxjs';
import { AppService } from '../app.service';
import { GithubRepo } from '../models/github-repo.model';

interface ReposState {
  loading: false;
  repos: GithubRepo[];
}

@Injectable()
export class ReposStore extends ComponentStore<ReposState> {
  private readonly service = inject(AppService);
  constructor() {
    super({ loading: false, repos: [] });
  }

  // SELECTOR
  readonly repos$ = this.select((state) => state.repos);
  readonly loading$ = this.select((state) => state.loading);

  // EFFECT
  readonly getGithubRepos = this.effect<string>((username$) =>
    username$.pipe(
      switchMap((username) =>
        this.service.getGithubRepos(username).pipe(
          tapResponse({
            next: (repos) => this.updateRepos(repos),
            error: console.log,
          })
        )
      )
    )
  );

  // UPDATER
  readonly updateRepos = this.updater((state, repos: GithubRepo[]) => ({
    ...state,
    repos: repos,
  }));
}
