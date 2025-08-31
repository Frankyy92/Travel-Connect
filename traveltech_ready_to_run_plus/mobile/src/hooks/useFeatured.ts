
import { useEffect, useState } from 'react';
import { getFeaturedItineraries } from '../api';

export function useFeatured(city?: string) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getFeaturedItineraries(city).then(setData).finally(() => setLoading(false));
  }, [city]);
  return { data, loading };
}
