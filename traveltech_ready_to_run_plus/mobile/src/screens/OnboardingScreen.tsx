
import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

export default function OnboardingScreen({ navigation }: any) {
  const [prefs, setPrefs] = useState<string[]>([]);
  const toggle = (k:string) => setPrefs(p => p.includes(k) ? p.filter(x=>x!==k) : [...p, k]);
  const go = () => navigation.replace('Map', { prefs });
  const chips = ['histoire', 'art', 'architecture', 'street art', 'gastronomie'];

  return (
    <View style={{ flex:1, backgroundColor: '#f3f4f6', padding: 24, justifyContent:'center' }}>
      <Text style={{ fontSize: 24, fontWeight:'700', marginBottom: 16 }}>Découvrons ta ville autrement</Text>
      <Text style={{ color:'#555', marginBottom: 12 }}>Choisis tes centres d'intérêt :</Text>
      <View style={{ flexDirection:'row', flexWrap:'wrap' }}>
        {chips.map(c => (
          <Pressable key={c} onPress={()=>toggle(c)} style={{ paddingVertical:8, paddingHorizontal:12, backgroundColor: prefs.includes(c)?'#111':'white', borderRadius:20, margin:6 }}>
            <Text style={{ color: prefs.includes(c)?'white':'#111' }}>{c}</Text>
          </Pressable>
        ))}
      </View>
      <Pressable onPress={go} style={{ marginTop: 24, backgroundColor:'#111', borderRadius:12, padding:14, alignItems:'center' }}>
        <Text style={{ color:'white', fontWeight:'700' }}>Commencer</Text>
      </Pressable>
    </View>
  );
}
