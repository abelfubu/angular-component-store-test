import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-edit-todo',
  standalone: true,
  imports: [InputTextModule, ButtonModule],
  template: `
    <label for="title" style="display: block">Title</label>
    <input pInputText #title type="text" [value]="config.data.title" />
    <p-button (onClick)="dialog.close(title.value)">Save</p-button>
  `,
})
export class EditTodoComponent {
  protected readonly config = inject(DynamicDialogConfig);
  protected readonly dialog = inject(DynamicDialogRef);
}
