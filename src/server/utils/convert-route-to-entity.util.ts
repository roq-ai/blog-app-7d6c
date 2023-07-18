const mapping: Record<string, string> = {
  blogs: 'blog',
  'blog-categories': 'blog_category',
  categories: 'category',
  'newsletter-subscribers': 'newsletter_subscriber',
  publishers: 'publisher',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
