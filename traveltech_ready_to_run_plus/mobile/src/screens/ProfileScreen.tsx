
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { apiGet } from '../api';

export default function ProfileScreen() {
  const [me, setMe] = useState<any>(null);
  useEffect(() => { apiGet('/profile/me').then(setMe); }, []);
  if (!me) return <View style={{ flex:1, alignItems:'center', justifyContent:'center' }}><Text>Chargement…</Text></View>;

  return (
    <View style={{ flex:1, padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight:'700' }}>Profil</Text>
      <Text>XP: {me.xp} • Niveau: {me.level}</Text>
      <Text style={{ marginTop: 12, fontWeight:'600' }}>Badges</Text>
      <FlatList data={me.badges || []} keyExtractor={(b:any)=>b.id} renderItem={({item}) => (
        <View style={{ padding: 10, backgroundColor:'white', borderRadius: 10, marginVertical: 6 }}>
          <Text>{item.badge?.name} • {item.badge?.tier}</Text>
        </View>
      )} />
    </View>
  );
}
