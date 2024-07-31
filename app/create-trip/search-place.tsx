import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { Colors } from '@/constants/Colors'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useStateContext } from '@/context/useStateContext';
import { TripData } from '@/interfaces';

const SearchPlace = () => {

    const navigation = useNavigation()
    const router = useRouter()
    const { setTripData } = useStateContext()

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: 'Search'
        })
    }, [])

    const onContinue = () => {
        setTripData((pre: TripData) => ({
            ...pre,
            locationInfo: {
                name: 'Lahore',
                coordinates: '',
                photoRef: '',
                url: ''
            }
        }))
        router.push('/create-trip/select-traveller')
    }

    return (
        <View style={{ padding: 25, paddingTop: 75, backgroundColor: Colors.WHITE, height: '100%' }} >

            <GooglePlacesAutocomplete
                placeholder='Search Place'
                fetchDetails={true}
                onFail={error => console.error(error)}
                styles={{
                    textInputContainer: {
                        borderWidth: 1,
                        borderRadius: 5,
                        marginTop: 25,
                    }
                }}
                onPress={(data, details = null) => {
                    console.log(data, details);
                    setTripData(pre => ({
                        ...pre,
                        locationInfo: {
                            name: data?.description,
                            coordinates: details?.geometry.location.lat + ',' + details?.geometry.location.lng,
                            // @ts-ignore
                            photoRef: details?.photos[0]?.photo_reference,
                            url: details?.url || "",
                        }
                    }))
                    router.push('/create-trip/select-traveller')
                }}
                query={{
                    key: process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
                    language: 'en',
                }}
            />

            <TouchableOpacity onPress={onContinue} style={{ padding: 15, backgroundColor: Colors.PRIMARY, borderRadius: 15, marginTop: 20 }} >
                <Text style={{ color: Colors.WHITE, textAlign: 'center', fontSize: 20, fontFamily: 'outfit' }} >Continue</Text>
            </TouchableOpacity>

        </View>
    )
}

export default SearchPlace