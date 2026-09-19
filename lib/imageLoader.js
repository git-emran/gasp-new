/**
 * Open Source Image CDN Loader (wsrv.nl powered by Cloudflare Edge)
 * Automatically optimizes, resizes, and converts images and animated GIFs to WebP/AVIF.
 * Safely falls back to local assets during local development.
 */

function isDevelopmentOrLocal() {
  if (process.env.NODE_ENV === "development") {
    // Only use CDN in dev if explicitly forced
    if (process.env.NEXT_PUBLIC_FORCE_CDN !== "true") {
      return true;
    }
  }
  if (typeof window !== "undefined" && window.location) {
    const host = window.location.hostname;
    if (host === "localhost" || host === "127.0.0.1" || host.endsWith(".local")) {
      if (process.env.NEXT_PUBLIC_FORCE_CDN !== "true") {
        return true;
      }
    }
  }
  return false;
}

function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (typeof window !== "undefined" && window.location && window.location.origin) {
    const host = window.location.hostname;
    if (host !== "localhost" && host !== "127.0.0.1" && !host.endsWith(".local")) {
      return window.location.origin;
    }
  }
  return "";
}

export function getOptimizedImageUrl(src, { width, quality = 80, format = "webp" } = {}) {
  if (!src || typeof src !== "string") return src;

  // Don't proxy data URIs, blobs, or already-proxied URLs
  if (src.startsWith("data:") || src.startsWith("blob:") || src.startsWith("https://wsrv.nl")) {
    return src;
  }

  // In local development, serve local files directly from public directory
  if (isDevelopmentOrLocal()) {
    return src;
  }

  const baseUrl = getBaseUrl();
  let fullUrl = src;

  if (src.startsWith("/")) {
    if (!baseUrl) {
      // If no public base URL is known, serve the relative path directly
      return src;
    }
    fullUrl = `${baseUrl}${src}`;
  }

  // If the URL is not an absolute http(s) URL, we cannot proxy it through wsrv.nl
  if (!fullUrl.startsWith("http://") && !fullUrl.startsWith("https://")) {
    return src;
  }

  const params = new URLSearchParams();
  params.set("url", fullUrl);

  if (width) {
    params.set("w", String(width));
  }

  if (quality) {
    params.set("q", String(quality));
  }

  if (format) {
    params.set("output", format);
  }

  // Preserve animation for GIFs -> animated WebP
  params.set("n", "-1");
  // Progressive / interlaced delivery
  params.set("il", "1");

  return `https://wsrv.nl/?${params.toString()}`;
}

export default function imageLoader({ src, width, quality }) {
  // If in local development, return local path directly for fast zero-error loading
  if (isDevelopmentOrLocal()) {
    return src;
  }
  return getOptimizedImageUrl(src, { width, quality: quality || 80, format: "webp" });
}

