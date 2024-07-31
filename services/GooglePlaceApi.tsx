export const getPhotoRef = async (placeName: string) => {
    const response = await fetch('https://maps.googleapis.com/maps/api/place/textsearch/json'
        + '?query=' + placeName
        + '&key=' + process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY)

    const result = await response.json()

    return result
}
