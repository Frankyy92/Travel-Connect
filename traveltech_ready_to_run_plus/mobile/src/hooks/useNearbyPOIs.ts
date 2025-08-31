
import { useEffect, useState } from 'react';
import { apiGet } from '../api';

export function useNearbyPOIs(lat?: number, lng?: number, prefsCsv?: string, radius=1000) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let canceled = false;
    if (lat==null || lng==null) return;
    setLoading(true);
    apiGet('/poi/nearby', { lat, lng, radius, prefs: prefsCsv })
      .then(d => { if (!canceled) setData(d); })
      .finally(() => { if (!canceled) setLoading(false); });
    return () => { canceled = true; };
  }, [lat, lng, prefsCsv, radius]);
  return { data, loading };
}
