import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { GithubRepo } from './models/github-repo.model';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private readonly http = inject(HttpClient);

  getGithubRepos(username: string): Observable<GithubRepo[]> {
    return this.http.get<GithubRepo[]>(
      `https://api.github.com/users/${username}/repos`
    );
  }
}
