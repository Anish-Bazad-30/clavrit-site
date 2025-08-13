import { Injectable } from '@angular/core';
import { SEOEntry, SEOMap } from './seo.model';
import { SEO_DATA } from './seo.data';


@Injectable({ providedIn: 'root' })
export class SeoDataService {
  private data: SEOMap = SEO_DATA;

  getEntryForPath(path: string): SEOEntry | undefined {
    const clean = this.cleanPath(path);

    // 1) exact
    if (this.data[clean]) return this.data[clean];

    // 2) pattern match /blog/:slug -> ^/blog/[^/]+$
    for (const pattern of Object.keys(this.data)) {
      const regexStr = '^' + pattern.replace(/:[^/]+/g, '[^/]+') + '$';
      try {
        const regex = new RegExp(regexStr);
        if (regex.test(clean)) return this.data[pattern];
      } catch (e) {
        // ignore invalid regex patterns
      }
    }

    // 3) prefix fallback: if path starts with a config key (like '/services' and '/services/abc')
    for (const key of Object.keys(this.data)) {
      if (key !== '/' && clean.startsWith(key + '/')) return this.data[key];
    }

    // 4) root fallback
    return this.data['/'];
  }

  private cleanPath(path: string) {
    if (!path) return '/';
    const noQuery = path.split('?')[0].split('#')[0];
    return noQuery.endsWith('/') && noQuery !== '/' ? noQuery.replace(/\/+$/, '') : noQuery || '/';
  }
}
