
export function bearingBetween(lat1:number, lon1:number, lat2:number, lon2:number) {
  const toRad = (d:number) => d * Math.PI / 180;
  const y = Math.sin(toRad(lon2-lon1)) * Math.cos(toRad(lat2));
  const x = Math.cos(toRad(lat1))*Math.cos(toRad(lat2))*Math.cos(toRad(lon2-lon1)) - Math.sin(toRad(lat1))*Math.sin(toRad(lat2));
  let brng = Math.atan2(y, x);
  brng = brng * 180 / Math.PI;
  return (brng + 360) % 360;
}
