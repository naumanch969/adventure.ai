import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { Colors } from '@/constants/Colors'
import { useStateContext } from '@/context/useStateContext'
import { PROMPT } from '@/constants/prompt'
import { chatSession } from '@/configs/ai'
import { addDoc } from 'firebase/firestore'
import { auth, tripCollection } from '@/configs/firebase'
import { removeUndefinedFields } from '@/utils/functions'

const GenerateTrip = () => {

    const { tripData } = useStateContext()
    const router = useRouter()
    const navigation = useNavigation()
    const user = auth?.currentUser

    const [loadingText, setLoadingText] = useState('')


    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: ''
        })
    }, [])
    useEffect(() => {
        tripData && !loadingText && generateAiTrip()
    }, [])

    const generateAiTrip = async () => {
        setLoadingText('Generating your trip plan, please wait...'); // Step 1

        try {
            // Construct the prompt
            const FINAL_PROMPT = PROMPT
                .replaceAll('{location}', tripData?.locationInfo?.name)
                .replaceAll('{totalDays}', tripData?.totalNoOfDays?.toString())
                .replaceAll('{totalNight}', String(Number(tripData?.totalNoOfDays) - 1))
                .replaceAll('{traveller}', tripData?.traveller?.title)
                .replaceAll('{budget}', tripData?.budget?.title)

            setLoadingText('Sending request to AI...'); // Step 2

            // Send request to AI
            const result = await chatSession.sendMessage(FINAL_PROMPT)
            const tripPlan = JSON.parse(result.response.text())

            console.log('TripPlan', tripPlan)

            setLoadingText('Processing your trip plan...'); // Step 3

            const docId = (Date.now()).toString()

            let input = {
                id: docId,
                userEmail: user?.email,
                tripData,
                tripPlan,
                createdAt: new Date(),
                updatedAt: new Date(),
            }

            console.log('input before', input)
            input = removeUndefinedFields(input)
            console.log('input after', input)

            setLoadingText('Saving your trip plan...'); // Step 4

            // Save to Firestore
            await addDoc(tripCollection, input)

            console.log('Document written with ID: ', docId);
            router.push('/mytrip')
        } catch (error) {
            console.error('Error adding document: ', error);
            setLoadingText('Failed to generate trip. Please try again later.'); // Error handling
        } finally {
            setLoadingText(''); // Clear loading text
        }
    }


    return (
        <View style={{ padding: 25, paddingTop: 75, backgroundColor: Colors.WHITE, height: '100%' }} >

            <Text style={{ fontFamily: 'outfit-bold', fontSize: 35, textAlign: 'center', marginTop: 20 }} >Please Wait...</Text>
            <Text style={{ fontFamily: 'outfit', fontSize: 20, textAlign: 'center', marginTop: 20 }} >{loadingText}</Text>

            <Image
                source={require('@/assets/images/plane.gif')}
                style={{ width: '100%', height: 250, objectFit: 'contain', marginTop: 54 }}
            />

            <Text style={{ fontFamily: 'outfit', color: Colors.GRAY, fontSize: 20, textAlign: 'center' }} >Do not Go Back</Text>

        </View>
    )
}

export default GenerateTrip