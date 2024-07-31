import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { getPhotoRef } from '@/services/GooglePlaceApi'
import { Place as TPlace } from '@/interfaces'

const Place = ({ place }: { place: TPlace }) => {

    const [photoRef, setPhotoRef] = useState<string | null>(null)

    useEffect(() => {
        getGooglePhotoRef()
    }, [])

    const getGooglePhotoRef = async () => {
        const result = await getPhotoRef(place?.placeName)
        const photoref = result?.results[0]?.photos[0]?.photo_reference
        setPhotoRef(photoref)
    }


    return (
        <View style={{ backgroundColor: Colors.LIGHT_BLUE, borderWidth: 1, borderColor: Colors.GRAY, borderRadius: 15, padding: 10, marginTop: 20 }} >
            <Image
                source={photoRef || require('@/assets/images/placeholder.jpg')}
                style={{ width: '100%', height: 120, borderRadius: 15 }}
            />
            <View style={{ marginTop: 5 }} >
                <Text style={{ fontFamily: 'outfit-bold', fontSize: 20 }} >{place?.placeName}</Text>
                <Text style={{ fontFamily: 'outfit', fontSize: 14, color: Colors.GRAY }} >{place?.placeDetails}</Text>
                <View>
                    <Text style={{ fontFamily: 'outfit', fontSize: 16, marginTop: 5 }} >Time to Travel: <Text style={{ fontFamily: 'outfit-bold' }} >{place?.bestTimeToVisit}</Text></Text>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                        <Text style={{ fontFamily: 'outfit', fontSize: 16, marginTop: 5 }} >Ticket Price: <Text style={{ fontFamily: 'outfit-bold' }} >{place?.ticketPricing}</Text></Text>
                        <TouchableOpacity onPress={() => {
                            // pass cooridnates to google map api and navigate to googlemap
                        }} style={{ backgroundColor: Colors.PRIMARY, padding: 8, borderRadius: 7 }} >
                            <Ionicons name='navigate' size={20} color='white' />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Place