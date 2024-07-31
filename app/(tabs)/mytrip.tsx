import { View, Text, FlatList, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { StartNewTrip } from '@/components'
import { auth, tripCollection } from '@/configs/firebase'
import { getDocs, query, where } from 'firebase/firestore'
import UserTripsList from '@/components/MyTrips/UserTripsList'
import { useRouter } from 'expo-router'

const MyTrip = () => {

  const user = auth?.currentUser
  const router = useRouter()

  const [trips, setTrips] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    getTrips()
  }, [])
  useEffect(() => {
    console.log('trips', trips)
  }, [])

  const getTrips = async () => {
    setLoading(true)
    const q = query(tripCollection, where('userEmail', '==', user?.email))
    const snapshot = await getDocs(q)
    console.log('snapshot()', snapshot.docs.map(doc => doc.data()))
    setTrips(snapshot.docs.map(doc => doc.data()))
    setLoading(false)
  }

  return (
    <ScrollView style={{ padding: 25, paddingTop: 55, backgroundColor: Colors.WHITE, height: '100%' }} >

      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
        <Text style={{ fontFamily: 'outfit-bold', fontSize: 35 }} >My Trips</Text>
        <TouchableOpacity
          onPress={() => router.push('/create-trip/search-place')}
        >
          <Ionicons name='add-circle' size={50} color='black' />
        </TouchableOpacity>
      </View>

      {
        loading ?
          <ActivityIndicator size='large' color={Colors.PRIMARY} />
          :
          trips.length == 0
            ?
            <StartNewTrip />
            :
            <UserTripsList trips={trips} />
      }

    </ScrollView>
  )
}

export default MyTrip