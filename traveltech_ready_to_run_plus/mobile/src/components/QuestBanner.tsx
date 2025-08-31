
import React from 'react';
import { View, Text } from 'react-native';

export default function QuestBanner() {
  return (
    <View style={{ backgroundColor: 'white', padding: 12, borderRadius: 12, shadowOpacity: 0.1, shadowRadius: 6 }}>
      <Text style={{ fontWeight: '700' }}>Quêtes proches</Text>
      <Text>Complète un défi photo ou quiz pour gagner des points.</Text>
    </View>
  );
}
