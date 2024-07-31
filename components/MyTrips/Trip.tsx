import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import moment from 'moment'
import { Colors } from '@/constants/Colors'
import { useStateContext } from '@/context/useStateContext'
import { useRouter } from 'expo-router'

const Trip = ({ trip }: { trip: any }) => {

    const router = useRouter()
    const { setCurrentTrip } = useStateContext()

    const onPress = () => {
        setCurrentTrip(trip)
        router.push('/trip-details')
    }

    return (
        <TouchableOpacity
            onPress={onPress}
            style={{ marginTop: 20, display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center' }}
        >
            {
                trip?.tripData?.locationInfo?.photoRef
                    ?
                    <Image
                        source={{ uri: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + trip?.tripData?.locationInfo?.photoRef + '&key=AIzaSyAFLdTIlAzs6FFrD1_QdH--G2aSENBq9eg' }}
                        style={{ width: 100, height: 100, borderRadius: 15 }}
                    />
                    :
                    <Image
                        source={require('@/assets/images/placeholder.jpg')}
                        style={{ width: 100, height: 100, borderRadius: 15 }}
                    />
            }
            <View>
                <Text style={{ fontFamily: 'outfit', fontSize: 18 }} >{trip?.tripData?.locationInfo?.name}</Text>
                <Text style={{ fontFamily: 'outfit', fontSize: 14, color: Colors.GRAY }} >{moment(trip?.tripData?.startDate?.toDate()).format('DD MMM yyyy')}</Text>
                <Text style={{ fontFamily: 'outfit', fontSize: 14, color: Colors.GRAY }} >Travelling: {trip?.tripData?.traveller?.title}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default Trip