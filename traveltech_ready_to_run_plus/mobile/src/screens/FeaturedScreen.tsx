
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { getFeaturedItinerary } from '../api';

export default function FeaturedScreen({ route, navigation }: any) {
  const { id } = route.params;
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    getFeaturedItinerary(id).then(setData);
  }, [id]);

  if (!data) return <View style={{ flex:1, alignItems:'center', justifyContent:'center' }}><Text>Chargement…</Text></View>;

  return (
    <View style={{ flex:1, padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight:'700' }}>{data.name}</Text>
      <Text style={{ color:'#666' }}>{data.durationTarget} min • {data.city}</Text>
      <FlatList
        data={data.pois || []}
        keyExtractor={(p:any)=>p.id}
        renderItem={({item,index}) => (
          <View style={{ backgroundColor:'white', padding:12, borderRadius:12, marginTop:10 }}>
            <Text style={{ fontWeight:'600' }}>{index+1}. {item.title}</Text>
            <Text style={{ color:'#666' }}>{item.categories?.join(', ')}</Text>
          </View>
        )}
      />
      <Pressable onPress={() => navigation.navigate('Itinerary', { featuredId: data.id })} style={{ marginTop: 12, backgroundColor:'#111', padding: 14, borderRadius: 12, alignItems:'center' }}>
        <Text style={{ color:'white', fontWeight:'700' }}>Démarrer cet itinéraire</Text>
      </Pressable>
    </View>
  );
}
