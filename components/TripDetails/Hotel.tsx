import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getPhotoRef } from '@/services/GooglePlaceApi'
import { Hotel as THotel } from '@/interfaces'

const Hotel = ({ item }: { item: THotel }) => {

    const [photoRef, setPhotoRef] = useState<string | null>(null)

    useEffect(() => {
        getGooglePhotoRef()
    }, [])

    const getGooglePhotoRef = async () => {
        const result = await getPhotoRef(item?.hotelName)
        const photoref = result?.results[0]?.photos[0]?.photo_reference
        setPhotoRef(photoref)
    }


    return (
        <View style={{ marginRight: 15, width: 180 }} >
            <Image
                source={photoRef || require('@/assets/images/placeholder.jpg')}
                style={{ width: 180, height: 120, borderRadius: 15 }}
            />
            <View style={{ padding: 5 }} >
                <Text style={{ fontFamily: 'outfit', fontSize: 17 }} >{item?.hotelName}</Text>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                    <Text style={{ fontFamily: 'outfit' }} >⭐ {item?.rating}</Text>
                    <Text style={{ fontFamily: 'outfit' }} >💲 {item?.price}</Text>
                </View>
            </View>
        </View>
    )
}

export default Hotel