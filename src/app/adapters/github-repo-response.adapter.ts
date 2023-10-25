import { GithubRepo } from '../models/github-repo.model';
import { ToDo } from '../models/to-do.model';

export function githubRepoResponseAdapter(
  response: GithubRepo[]
): { name: string }[] {
  return response.map((repo) => ({ name: repo.name }));
}

export function toDosResponseAdapter(
  response: ToDo[]
): { title: string}[] {
  return response.map((todo) => ({ title: todo.title }))
}
