
import React from 'react';
import { Text, Pressable } from 'react-native';

export default function FeaturedCard({ item, onPress }:{ item:any; onPress:()=>void }) {
  return (
    <Pressable onPress={onPress} style={{ width: 240, marginRight: 12, backgroundColor: 'white', padding: 12, borderRadius: 12, shadowOpacity: 0.1, shadowRadius: 6 }}>
      <Text style={{ fontWeight: '700' }}>{item.name}</Text>
      <Text style={{ color:'#666' }}>{item.durationTarget} min • {item.city}</Text>
      {item.description ? <Text numberOfLines={2} style={{ marginTop: 6 }}>{item.description}</Text> : null}
    </Pressable>
  );
}
