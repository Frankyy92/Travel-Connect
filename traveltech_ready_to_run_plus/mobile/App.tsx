
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from './src/screens/OnboardingScreen';
import MapScreen from './src/screens/MapScreen';
import POIDetailScreen from './src/screens/POIDetailScreen';
import QuestScreen from './src/screens/QuestScreen';
import ItineraryScreen from './src/screens/ItineraryScreen';
import ARViewScreen from './src/screens/ARViewScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import FeaturedScreen from './src/screens/FeaturedScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="POI" component={POIDetailScreen} />
        <Stack.Screen name="Quest" component={QuestScreen} />
        <Stack.Screen name="Itinerary" component={ItineraryScreen} />
        <Stack.Screen name="AR" component={ARViewScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Featured" component={FeaturedScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
