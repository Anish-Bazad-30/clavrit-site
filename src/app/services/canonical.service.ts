// src/app/services/canonical.service.ts

import { Injectable, Renderer2, RendererFactory2, Inject } from '@angular/core';

import { DOCUMENT } from '@angular/common';
 
@Injectable({

  providedIn: 'root',

})

export class CanonicalService {

  private renderer: Renderer2;
 
  constructor(

    private rendererFactory: RendererFactory2,

    @Inject(DOCUMENT) private document: Document

  ) {

    this.renderer = rendererFactory.createRenderer(null, null);

  }
 
  setCanonicalURL(url?: string) {

    const existing = this.document.querySelector("link[rel='canonical']");

    const href = url || this.document.URL;
 
    if (existing) {

      this.renderer.setAttribute(existing, 'href', href);

    } else {

      const link = this.renderer.createElement('link');

      this.renderer.setAttribute(link, 'rel', 'canonical');

      this.renderer.setAttribute(link, 'href', href);

      this.renderer.appendChild(this.document.head, link);

    }

  }

}

 