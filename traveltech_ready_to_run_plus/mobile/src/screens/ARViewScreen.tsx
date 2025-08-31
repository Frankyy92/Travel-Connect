
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Magnetometer } from 'expo-sensors';
import DirectionArrow from '../components/DirectionArrow';
import { bearingBetween } from '../utils/geo';
import { useLocation } from '../hooks/useLocation';

export default function ARViewScreen({ route }: any) {
  const { poi } = route.params;
  const { coords } = useLocation();
  const [heading, setHeading] = useState(0);

  useEffect(() => {
    const sub = Magnetometer.addListener((data:any) => {
      let angle = Math.atan2(data.y, data.x) * (180 / Math.PI);
      angle = (angle + 360) % 360;
      setHeading(angle);
    });
    Magnetometer.setUpdateInterval(500);
    return () => sub && sub.remove();
  }, []);

  const targetBearing = coords ? bearingBetween(coords.latitude, coords.longitude, poi.lat, poi.lng) : 0;
  let rotation = (targetBearing - heading + 360) % 360;

  return (
    <View style={{ flex:1, backgroundColor:'#000000cc', justifyContent:'center' }}>
      <DirectionArrow rotation={rotation} />
      <Text style={{ color:'white', textAlign:'center' }}>{poi.title}</Text>
      <Text style={{ color:'white', textAlign:'center' }}>Orientation vers la cible</Text>
    </View>
  );
}
