
import React from 'react';
import { View, Text, Pressable, FlatList } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useLocation } from '../hooks/useLocation';
import { useNearbyPOIs } from '../hooks/useNearbyPOIs';
import POICard from '../components/POICard';
import FeaturedCard from '../components/FeaturedCard';
import { useFeatured } from '../hooks/useFeatured';

export default function MapScreen({ navigation, route }: any) {
  const { coords } = useLocation();
  const prefs = (route.params?.prefs || []).join(',');
  const { data: pois } = useNearbyPOIs(coords?.latitude, coords?.longitude, prefs);
  const { data: featured } = useFeatured('Paris');

  const plan90 = () => navigation.navigate('Itinerary', { start: coords, duration: 90, prefs });

  return (
    <View style={{ flex:1 }}>
      {coords ? (
        <MapView style={{ flex:1 }} initialRegion={{ latitude: coords.latitude, longitude: coords.longitude, latitudeDelta: 0.02, longitudeDelta: 0.02 }}>
          <Marker coordinate={{ latitude: coords.latitude, longitude: coords.longitude }} title="Moi" />
          {pois.map((p:any) => (
            <Marker key={p.id} coordinate={{ latitude: p.lat, longitude: p.lng }} title={p.title} onPress={() => navigation.navigate('POI', { poi: p })} />
          ))}
        </MapView>
      ) : (
        <View style={{ flex:1, alignItems:'center', justifyContent:'center' }}><Text>Localisation…</Text></View>
      )}
      <View style={{ position:'absolute', bottom: 0, left:0, right:0, padding: 12 }}>
        <Pressable onPress={plan90} style={{ backgroundColor:'#111', padding: 14, borderRadius: 12, alignItems:'center' }}>
          <Text style={{ color:'white', fontWeight:'700' }}>Parcours 90 min</Text>
        </Pressable>

        <View style={{ marginTop: 8 }}>
          <Text style={{ fontWeight:'700', marginBottom: 6, color:'white', textShadowColor:'#000', textShadowRadius:4 }}>Itinéraires recommandés</Text>
          <FlatList horizontal showsHorizontalScrollIndicator={false} data={featured} keyExtractor={(it:any)=>it.id} renderItem={({item}) => (
            <FeaturedCard item={item} onPress={()=> navigation.navigate('Featured', { id: item.id })} />
          )} />
        </View>

        <FlatList
          data={pois}
          keyExtractor={(item:any) => item.id}
          renderItem={({ item }) => <POICard poi={item} onPress={() => navigation.navigate('POI', { poi: item })} />}
          style={{ maxHeight: 220, marginTop: 8 }}
        />
      </View>
    </View>
  );
}
