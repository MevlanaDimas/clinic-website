import { redirect } from 'next/navigation';

// Top-level routes in the app. Add other top-level routes here if needed.
const VALID_ROUTES = ['/', '/about', '/contact', '/doctor', '/news', '/promo', '/privacy', '/terms', '/cookie'];

function getClosestRoute(target: string): string {
  const segments = target.split('/').filter(Boolean);

  // If no segment (root), send to home
  if (segments.length === 0) return '/';

  // Prefer a route that matches the first path segment (e.g. /doctor/xyz -> /doctor)
  const firstSegmentRoute = `/${segments[0]}`;
  if (VALID_ROUTES.includes(firstSegmentRoute)) return firstSegmentRoute;

  // Try fuzzy containment (e.g. '/doctors' -> '/doctor')
  if (segments.length > 0 && segments[0]) {
    for (const route of VALID_ROUTES) {
      if (route === '/') continue;
      const routeSeg = route.replace(/^\//, '');
      if (segments[0].includes(routeSeg) || routeSeg.includes(segments[0])) return route;
    }
  }

  // Default fallback
  return '/';
}

export default async function CatchAllPage({ params }: { params: Promise<{ catchAll?: string[] }> }) {
  const { catchAll = [] } = await params;
  const path = `/${catchAll.join('/')}`;
  const destination = getClosestRoute(path);

  redirect(destination);
}