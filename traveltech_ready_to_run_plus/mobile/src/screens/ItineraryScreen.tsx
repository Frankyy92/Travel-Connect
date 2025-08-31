
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { apiPost } from '../api';

export default function ItineraryScreen({ route }: any) {
  const { start, duration=90, prefs, featuredId } = route.params || {};
  const [plan, setPlan] = useState<any>(null);

  useEffect(() => {
    if (featuredId) {
      fetch(`${process.env.MOBILE_API_BASE_URL || 'http://localhost:4000'}/itinerary/featured/${featuredId}`)
        .then(r=>r.json())
        .then(json => {
          const steps = (json.pois || []).map((p:any, idx:number)=> ({
            id: p.id, title: p.title, lat: p.lat, lng: p.lng, walkTimeMin: idx===0 ? 0 : 10, visitMin: Math.min(30, p.durationMin || 20)
          }));
          const totalTimeMin = steps.reduce((a:any,s:any)=> a + s.walkTimeMin + s.visitMin, 0);
          const totalDistanceM = 1200 * steps.length;
          setPlan({ steps, totalTimeMin, totalDistanceM });
        });
    } else {
      if (!start) return;
      apiPost('/itinerary/plan', { start: { lat: start.latitude, lng: start.longitude }, duration, prefs }).then(setPlan);
    }
  }, [start, duration, prefs, featuredId]);

  if (!plan) return <View style={{ flex:1, alignItems:'center', justifyContent:'center' }}><Text>Calcul du parcours…</Text></View>;

  return (
    <View style={{ flex:1, padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight:'700' }}>Parcours {plan.totalTimeMin} min</Text>
      <Text style={{ color:'#666' }}>{Math.round(plan.totalDistanceM)} m</Text>
      <FlatList data={plan.steps} keyExtractor={(it:any, idx:number)=> String(idx)} renderItem={({item,index}) => (
        <View style={{ marginTop: 12, backgroundColor:'white', padding: 12, borderRadius: 12 }}>
          <Text style={{ fontWeight:'600' }}>{index+1}. {item.title}</Text>
          <Text>{Math.round(item.walkTimeMin)} min de marche • {item.visitMin} min sur place</Text>
        </View>
      )} />
    </View>
  );
}
