
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Pressable, TextInput, Alert } from 'react-native';
import { apiGet, apiPost } from '../api';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useLocation } from '../hooks/useLocation';

export default function QuestScreen({ route, navigation }: any) {
  const { poi } = route.params;
  const [quests, setQuests] = useState<any[]>([]);
  const [answer, setAnswer] = useState('');
  const [cameraOn, setCameraOn] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const { coords } = useLocation();

  useEffect(() => {
    apiGet(`/quest/poi/${poi.id}`).then(setQuests);
  }, [poi.id]);

  const validate = async (quest:any) => {
    const payload:any = { questId: quest.id, evidence: {} };
    if (coords) { payload.evidence.lat = coords.latitude; payload.evidence.lng = coords.longitude; }
    if (quest.type === 'QUIZ') payload.evidence.text = answer;
    if (quest.type === 'PHOTO') payload.evidence.photo = true;
    const res = await apiPost('/quest/validate', payload);
    if (res.ok) {
      Alert.alert('Bravo !', `+${res.points} points` + (res.badge ? `, badge ${res.badge.name}` : ''));
      navigation.goBack();
    } else {
      Alert.alert('Oups', res.reason === 'too_far' ? `Trop loin du lieu (${res.distance} m).` : 'Validation échouée.');
    }
  };

  const startPhoto = async () => {
    if (!permission || !permission.granted) {
      const p = await requestPermission();
      if (!p.granted) return;
    }
    setCameraOn(true);
  };

  return (
    <View style={{ flex:1 }}>
      {cameraOn ? (
        <CameraView style={{ flex:1 }} facing="back">
          <View style={{ position:'absolute', bottom: 20, left:0, right:0, alignItems:'center' }}>
            <Pressable onPress={()=> setCameraOn(false)} style={{ backgroundColor:'#111', padding: 12, borderRadius: 12 }}>
              <Text style={{ color:'white' }}>Prendre photo (MVP - retour)</Text>
            </Pressable>
          </View>
        </CameraView>
      ) : (
        <View style={{ flex:1, padding: 16 }}>
          <Text style={{ fontSize: 18, fontWeight:'700' }}>{poi.title}</Text>
          {quests.map(q => (
            <View key={q.id} style={{ marginTop: 16, padding: 12, backgroundColor:'white', borderRadius: 12 }}>
              <Text style={{ fontWeight:'600' }}>{q.type} • {q.points} pts</Text>
              <Text style={{ marginVertical: 6 }}>{q.prompt}</Text>

              {q.type === 'QUIZ' && (
                <TextInput placeholder="Ta réponse" value={answer} onChangeText={setAnswer} style={{ backgroundColor:'#f3f4f6', padding: 10, borderRadius: 8 }} />
              )}

              {q.type === 'PHOTO' && (
                <Pressable onPress={startPhoto} style={{ backgroundColor:'#111', padding: 10, borderRadius: 10, alignItems:'center', marginTop: 6 }}>
                  <Text style={{ color:'white' }}>Ouvrir la caméra</Text>
                </Pressable>
              )}

              <Pressable onPress={()=>validate(q)} style={{ marginTop: 8, backgroundColor:'#111', padding: 10, borderRadius: 10, alignItems:'center' }}>
                <Text style={{ color:'white' }}>Valider</Text>
              </Pressable>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
