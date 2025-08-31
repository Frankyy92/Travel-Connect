
import { Injectable } from '@nestjs/common';
import { PoiService } from '../poi/poi.service';
import { haversineDistance } from '../common/utils/geo';

@Injectable()
export class ItineraryService {
  constructor(private poiService: PoiService) {}

  async plan(startLat:number, startLng:number, durationTarget=90, prefs?: string) {
    const nearby = await this.poiService.nearby(startLat, startLng, 2000, prefs);
    let current = { lat: startLat, lng: startLng };
    const chosen:any[] = [];
    let totalTime = 0;
    const walkSpeed = 1.3; // m/s
    while (nearby.length && chosen.length < 6 && totalTime < durationTarget) {
      nearby.sort((a,b)=> (b.score/(b.distance+1)) - (a.score/(a.distance+1)));
      const next = nearby.shift();
      if (!next) break;
      const walkTimeMin = (haversineDistance(current.lat,current.lng,next.lat,next.lng)/walkSpeed)/60/1000;
      const visit = Math.min(30, next.durationMin || 20);
      const delta = walkTimeMin + visit;
      if (totalTime + delta > durationTarget + 15) break;
      chosen.push({ id: next.id, title: next.title, lat: next.lat, lng: next.lng, walkTimeMin, visitMin: visit });
      totalTime += delta;
      current = { lat: next.lat, lng: next.lng };
    }
    const totalDistance = chosen.reduce((acc, s, i) => {
      if (i===0) return acc + 0;
      const prev = chosen[i-1];
      return acc + haversineDistance(prev.lat, prev.lng, s.lat, s.lng);
    }, 0);
    return { steps: chosen, totalTimeMin: Math.round(totalTime), totalDistanceM: Math.round(totalDistance) };
  }
}
