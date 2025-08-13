export interface SEOEntry {
  title: string;
  description: string;
  canonical?: string;
}

export interface SEOMap {
  [routePattern: string]: SEOEntry; // routePattern can include :param e.g. "/blog/:slug"
}
