
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE = process.env.MOBILE_API_BASE_URL || 'http://localhost:4000';

async function getUserId() {
  let id = await AsyncStorage.getItem('user_id');
  if (!id) {
    id = Math.random().toString(36).slice(2) + Date.now().toString(36);
    await AsyncStorage.setItem('user_id', id);
  }
  return id;
}

export async function apiGet(path: string, params?: any) {
  const userId = await getUserId();
  const res = await axios.get(`${API_BASE}${path}`, { params, headers: { 'X-User-Id': userId }});
  return res.data;
}

export async function apiPost(path: string, body?: any) {
  const userId = await getUserId();
  const res = await axios.post(`${API_BASE}${path}`, body, { headers: { 'X-User-Id': userId }});
  return res.data;
}

export async function getFeaturedItineraries(city?: string) {
  return apiGet('/itinerary/featured', city ? { city } : undefined);
}

export async function getFeaturedItinerary(id: string) {
  return apiGet(`/itinerary/featured/${id}`);
}
