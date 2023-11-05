import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular Editor';
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '25rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
    ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };
  name = new FormControl('');

  toggleFollowNoFollow() {
    const selectedText = window.document.getSelection()!.toString();
    console.log(this.name.value);
    console.log(selectedText);
    if (selectedText && this.name.value)
      this.name.setValue(this.addOrUpdateRelAttribute(this.name.value as string, selectedText))
  }

  addOrUpdateRelAttribute(text: string, searchText: string) {
    const follow = 'rel="follow"';
    const nofollow = 'rel="nofollow"';
    const updatedText = text.replace(/<a(.*?)>(.*?)<\/a>/g, (match, attributes, content) => {
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
    });

    return updatedText;
  }

  addAltToImage(event:MouseEvent) {
    var range = window.getSelection()!.getRangeAt(0)
    var fragment = range.cloneContents()
    var imgs = fragment.querySelectorAll('img')

    const selectedTargetImage = event.target as HTMLElement;

    if (selectedTargetImage && selectedTargetImage.tagName === 'IMG') {
      // Handle the double-click on an <img> element
      console.log('Double-clicked on an image:', selectedTargetImage);
      // You can further manipulate or access the <img> element as needed.

    // console.log(imgs);
    // if(imgs.length > 1) {
    //   alert('Select only one image !');
    // }
    
    // const selectedText = window.document.getSelection()!.toString();
    // console.log(selectedText);
    
    

      const altText = window.prompt('Enter image alt text');
      if (altText) {
        // this.name.value.replace
        this.addOrUpdateAltAttribute(selectedTargetImage, altText);
      } else {
        alert('Please select image to add alt attribute');
      }
    
  }
}

  addOrUpdateAltAttribute(text: string, altText: string) {
    const updatedText = text.replace(/<img(.*?)>/g, (match) => {
      if (!match.includes('alt=')) {
        return match.replace('>', ` alt="${altText}">`);
      } else {
        return match.replace(/alt="([^"]*)"/, `alt="${altText}"`);
      }
    });

    return updatedText;
  }
}
