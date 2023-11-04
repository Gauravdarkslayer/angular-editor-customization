import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [
    CommonModule,
    AngularEditorModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [HttpClient],
  template: `
  
  <angular-editor id="editor1" [formControl]="name" [config]="editorConfig">
  <ng-template #customButtons>
    <ae-toolbar-set>
      <ae-button iconClass="fa fa-html5" title="Angular editor logo"
                 (click)="toggleFollowNoFollow()">
      </ae-button>
    </ae-toolbar-set>
  </ng-template>
</angular-editor>
  `,
})
export class App {
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
    ],
    toolbarPosition: 'top',
    toolbarHiddenButtons: [['bold', 'italic'], ['fontSize']],
  };
  name = new FormControl('');

  toggleFollowNoFollow() {
    const selectedText = window.document.getSelection()!.toString();
    console.log(this.name.value);
    console.log(selectedText);
    if (selectedText && this.name.value)
      this.name.setValue(
        this.addOrUpdateRelAttribute(this.name.value as string, selectedText)
      );
  }

  addOrUpdateRelAttribute(text: string, searchText: string) {
    const follow = 'rel="follow"';
    const nofollow = 'rel="nofollow"';
    const updatedText = text.replace(
      /<a(.*?)>(.*?)<\/a>/g,
      (match, attributes, content) => {
        if (content.includes(searchText)) {
          if (attributes.includes(follow)) {
            return match.replace(follow, nofollow);
          } else if (attributes.includes(nofollow)) {
            return match.replace(nofollow, follow);
          } else {
            return `<a${attributes} rel="follow">${content}</a>`;
          }
        }
        return match;
      }
    );

    return updatedText;
  }
}

bootstrapApplication(App);
