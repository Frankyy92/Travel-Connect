
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, Pressable } from 'react-native';
import { apiGet } from '../api';

export default function POIDetailScreen({ route, navigation }: any) {
  const { poi: initialPoi } = route.params;
  const [poi, setPoi] = useState<any>(initialPoi);
  useEffect(() => {
    apiGet(`/poi/${initialPoi.id}`).then(setPoi).catch(()=>{});
  }, [initialPoi.id]);

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight:'700' }}>{poi.title}</Text>
      <Text style={{ color:'#666', marginBottom: 8 }}>{poi.categories?.join(', ')}</Text>
      <Text>{poi.snippet}</Text>
      <Pressable onPress={() => navigation.navigate('Quest', { poi })} style={{ marginTop: 12, backgroundColor:'#111', padding: 12, borderRadius: 12, alignItems:'center' }}>
        <Text style={{ color:'white', fontWeight:'600' }}>Démarrer un défi</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('AR', { poi })} style={{ marginTop: 8, backgroundColor:'white', borderWidth:1, borderColor:'#111', padding: 12, borderRadius: 12, alignItems:'center' }}>
        <Text style={{ color:'#111', fontWeight:'600' }}>Vue AR (boussole)</Text>
      </Pressable>
    </ScrollView>
  );
}
