import { useState, useEffect } from "react";
import { ENDPOINTS, apiFetch } from "../api";
import { normalizeBundle } from "../api/bundleHelpers";

/**
 * Fetches all bundles with optional filters.
 * Paginates automatically to load all pages.
 *
 * @param {{ category?: string, currency?: string, network_operator?: string }} filters
 */
export function useBundles(filters = {}) {
  const [bundles, setBundles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchAll() {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({
          limit: 100,
          page: 1,
          ...filters,
        });
        const res = await apiFetch(`${ENDPOINTS.bundles}?${params}`);
        const all = [...(res.data ?? [])];

        const totalPages = res.pagination?.total_pages ?? 1;
        if (totalPages > 1) {
          const rest = await Promise.all(
            Array.from({ length: totalPages - 1 }, (_, i) => {
              const p = new URLSearchParams({ ...filters, limit: 100, page: i + 2 });
              return apiFetch(`${ENDPOINTS.bundles}?${p}`).then(r => r.data ?? []);
            })
          );
          all.push(...rest.flat());
        }

        if (!cancelled) setBundles(all.filter(b => b.active).map(normalizeBundle));
      } catch (e) {
        if (!cancelled) setError(e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchAll();
    return () => { cancelled = true; };
  }, [JSON.stringify(filters)]);

  return { bundles, loading, error };
}

/**
 * Fetches bundles for a single category.
 * @param {string} category - e.g., "data", "voice", "social", "night"
 */
export function useBundlesByCategory(category) {
  return useBundles({ category });
}