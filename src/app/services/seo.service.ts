import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { SeoDataService } from './seo-data.service';
import { CanonicalService } from './canonical.service';
import { environment } from '../../environments/environment';
import { SEOEntry } from './seo.model';

@Injectable({ providedIn: 'root' })
export class SeoService {
  constructor(
    private title: Title,
    private meta: Meta,
    private seoData: SeoDataService,
    private canonical: CanonicalService
  ) {}

  applyTagsForPath(path: string) {
    const entry = this.seoData.getEntryForPath(path);
    if (!entry) return;
    this.applyEntry(entry, path);
  }

  applyCustomEntry(entry: SEOEntry, path?: string) {
    this.applyEntry(entry, path);
  }

  private applyEntry(entry: SEOEntry, path?: string) {
    this.title.setTitle(entry.title);

    const descriptionTag = this.meta.getTag('name="description"');
    if (descriptionTag) {
      this.meta.updateTag({ name: 'description', content: entry.description });
    } else {
      this.meta.addTag({ name: 'description', content: entry.description });
    }

    const canonical = entry.canonical || this.buildCanonical(path);
    if (canonical) this.canonical.setCanonicalURL(canonical);
  }

  private buildCanonical(path?: string) {
    const origin = (environment as any).siteOrigin || '';
    if (!origin) return entryOrEmpty(path);
    const p = path ? (path.startsWith('/') ? path : '/' + path) : '/';
    return `${origin}${p}`;
  }
}

function entryOrEmpty(path?: string) {
  return path || undefined;
}
