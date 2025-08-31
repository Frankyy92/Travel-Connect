
import React from 'react';
import { View, Text, Pressable } from 'react-native';

export default function POICard({ poi, onPress }:{ poi:any; onPress:()=>void }) {
  return (
    <Pressable onPress={onPress} style={{ padding: 12, borderRadius: 12, backgroundColor: 'white', marginVertical: 6, shadowOpacity: 0.1, shadowRadius: 6 }}>
      <Text style={{ fontWeight: '600', fontSize: 16 }}>{poi.title}</Text>
      <Text style={{ color: '#666' }}>{Math.round(poi.distance)} m • {poi.categories?.join(', ')}</Text>
      <Text numberOfLines={2} style={{ marginTop: 4 }}>{poi.snippet}</Text>
    </Pressable>
  );
}
