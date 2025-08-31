
export function poiScore(distanceMeters: number, popularity: number, prefMatch: number, affluence: number) {
  const d = Math.max(50, distanceMeters);
  const w1 = 0.35, w2 = 0.35, w3 = 0.2, w4 = 0.1;
  const sd = 1.0 / d;
  return w1*sd + w2*popularity + w3*prefMatch + w4*(1 - affluence);
}
