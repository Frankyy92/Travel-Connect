
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

export function useLocation() {
  const [coords, setCoords] = useState<{latitude:number, longitude:number} | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission localisation refusée');
        return;
      }
      const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      setCoords(loc.coords as any);
      const sub = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.Balanced, timeInterval: 60000, distanceInterval: 100 },
        (l) => setCoords(l.coords as any)
      );
      return () => sub.remove();
    })();
  }, []);
  return { coords, error };
}
