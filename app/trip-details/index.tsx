import { View, Text, Image, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from 'expo-router'
import { Colors } from '@/constants/Colors'
import moment from 'moment'
import { FlightInfo, HotelList, Places } from '@/components'
import { useStateContext } from '@/context/useStateContext'

const TripDetail = () => {

    const navigation = useNavigation()
    let { currentTrip: trip } = useStateContext()

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: ''
        })
    }, [])

    return trip && (
        <ScrollView>

            {
                trip?.tripData?.locationInfo?.photoRef
                    ?
                    <Image
                        source={{ uri: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + trip?.tripData?.locationInfo?.photoRef + '&key=AIzaSyAFLdTIlAzs6FFrD1_QdH--G2aSENBq9eg' }}
                        style={{ width: '100%', height: 330, objectFit: 'cover' }}
                    />
                    :
                    <Image
                        source={require('@/assets/images/placeholder.jpg')}
                        style={{ width: '100%', height: 330, objectFit: 'cover' }}
                    />
            }

            <View style={{ padding: 15, backgroundColor: Colors.WHITE, height: '100%', marginTop: -30, borderTopLeftRadius: 30, borderTopRightRadius: 30 }} >
                <Text style={{ fontSize: 25, fontFamily: 'outfit-bold' }} >{trip?.tripData?.locationInfo?.name}</Text>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }} >
                    <Text style={{ fontFamily: 'outfit', fontSize: 16, color: Colors.GRAY }} >{moment(trip?.tripData?.startDate).format('DD MMM yyyy')}</Text>
                    <Text style={{ fontFamily: 'outfit', fontSize: 16, color: Colors.GRAY }} >{trip?.tripData?.traveller?.title}</Text>
                </View>

                <FlightInfo flight={trip?.tripPlan?.flight} />
                <HotelList hotels={trip?.tripPlan?.hotels} />
                <Places places={trip?.tripPlan?.placesToVisit} />

            </View>

        </ScrollView>
    )
}

export default TripDetail