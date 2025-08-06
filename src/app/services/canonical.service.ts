// src/app/services/canonical.service.ts
import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CanonicalService {
  constructor(@Inject(DOCUMENT) private dom: Document) {}

  setCanonicalURL(url?: string) {
    const head = this.dom.getElementsByTagName('head')[0];

    let link: HTMLLinkElement | null = this.dom.querySelector(`link[rel='canonical']`);
    if (link) {
      link.setAttribute('href', url || this.dom.URL);
    } else {
      link = this.dom.createElement('link');
      link.setAttribute('rel', 'canonical');
      link.setAttribute('href', url || this.dom.URL);
      head.appendChild(link);
    }
  }
}
