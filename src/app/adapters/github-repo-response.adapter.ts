import { GithubRepo } from '../models/github-repo.model';

export function githubRepoResponseAdapter(
  response: GithubRepo[]
): { name: string }[] {
  return response.map((repo) => ({ name: repo.name }));
}
