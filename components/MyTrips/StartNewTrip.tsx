import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'
import { useRouter } from 'expo-router'

const StartNewTrip = () => {

  const router = useRouter()

  return (
    <View style={{ padding: 20, marginTop: 50, display: 'flex', alignItems: 'center', gap: 25 }} >
      <Ionicons name='location-sharp' size={30} color='black' />
      <Text style={{ fontSize: 25, fontFamily: 'outfit', textAlign: 'center', }} >No trips planned yet.</Text>
      <Text style={{ fontSize: 20, fontFamily: 'outfit', textAlign: 'center', color: Colors.GRAY }} >Looks like its time to plan a new travel experience! Get Started below.</Text>

      <TouchableOpacity
        onPress={() => router.push('/create-trip/search-place')}
        style={{
          padding: 10, backgroundColor: Colors.PRIMARY, borderRadius: 15, paddingHorizontal: 30
        }}
      >
        <Text style={{ color: Colors.WHITE, fontSize: 16, fontFamily: 'outfit' }} >Start a new trip</Text>
      </TouchableOpacity>
    </View>
  )
}

export default StartNewTrip