import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import moment from 'moment'
import { Colors } from '@/constants/Colors'
import Trip from './Trip'
import { useRouter } from 'expo-router'
import { Trip as TTrip } from '@/interfaces'
import { Timestamp } from 'firebase/firestore'
import { useStateContext } from '@/context/useStateContext'

const UserTripsList = ({ trips }: { trips: TTrip[] }) => {

    const latestTrip = trips[0]
    const router = useRouter()
    const { setCurrentTrip } = useStateContext()

    const onContinue = () => {
        setCurrentTrip(latestTrip)
        router.push('/trip-details')
    }

    return (
        <View>

            <View style={{ marginTop: 20 }} >
                {
                    latestTrip?.tripData?.locationInfo?.photoRef
                        ?
                        <Image
                            source={{ uri: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + latestTrip?.tripData?.locationInfo?.photoRef + '&key=AIzaSyAFLdTIlAzs6FFrD1_QdH--G2aSENBq9eg' }}
                            style={{ width: '100%', height: 240, objectFit: 'cover', borderRadius: 15 }}
                        />
                        :
                        <Image
                            source={require('@/assets/images/placeholder.jpg')}
                            style={{ width: '100%', height: 240, objectFit: 'cover', borderRadius: 15 }}
                        />
                }
            </View>

            <View style={{ marginTop: 10 }} >
                <Text style={{ fontFamily: 'outfit', fontSize: 20 }} >{latestTrip?.tripData?.locationInfo?.name}</Text>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }} >
                    <Text style={{ fontFamily: 'outfit', fontSize: 16, color: Colors.GRAY }} >{moment((latestTrip?.tripData?.startDate as Timestamp)?.toDate()).format('DD MMM yyyy')}</Text>
                    <Text style={{ fontFamily: 'outfit', fontSize: 16, color: Colors.GRAY }} >{latestTrip?.tripData?.traveller?.title}</Text>
                </View>
                <TouchableOpacity
                    onPress={onContinue}
                    style={{ backgroundColor: Colors.PRIMARY, padding: 15, borderRadius: 15, marginTop: 10 }}
                >
                    <Text style={{ color: Colors.WHITE, textAlign: 'center', fontFamily: 'outfit', fontSize: 15 }} >See your plan</Text>
                </TouchableOpacity>
            </View>


            <FlatList
                data={trips}
                renderItem={({ item, index }) => (
                    <Trip trip={item} key={index} />
                )}
            />

            <View style={{ marginBottom: 100 }} />

        </View >
    )
}

export default UserTripsList