
import React from 'react';
import { View } from 'react-native';

export default function DirectionArrow({ rotation=0 }:{ rotation:number }) {
  return (
    <View style={{ width: 0, height: 0, borderLeftWidth: 20, borderRightWidth: 20, borderBottomWidth: 40, borderLeftColor: 'transparent', borderRightColor: 'transparent', borderBottomColor: 'black', transform: [{ rotate: `${rotation}deg` }], alignSelf: 'center', margin: 16 }} />
  );
}
