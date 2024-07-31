export const PROMPT = `
Generate a detailed travel plan in JSON format for the following parameters:

- **Location:** {location}
- **Duration:** {totalDays} days and {totalNight} nights
- **Traveler:** {traveller}
- **Budget:** {budget}

Include the following details in the travel plan:

1. **Flight Details:**
   - **Departure:** Departure city
   - **Destination:** Destination city
   - **Flight Duration:** Duration of the flight
   - **Booking URL:** URL for booking the flight
   - **Price:** Price of the flight

2. **Hotel Options:**
   - **Hotel Name:** Name of the hotel
   - **Address:** Address of the hotel
   - **Price:** Price per night
   - **Image URL:** URL of the hotel's image
   - **Geo Coordinates:** Latitude and Longitude
   - **Rating:** Rating of the hotel (e.g., 4.5 out of 5)
   - **Description:** Brief description of the hotel

3. **Places to Visit:**
   - **Place Name:** Name of the place
   - **Place Details:** Description of the place
   - **Image URL:** URL of the place's image
   - **Geo Coordinates:** Latitude and Longitude
   - **Ticket Pricing:** Price of the ticket
   - **Best Time to Visit:** Recommended time to visit the place

4. **Daily Plan:**
   - **Day:** Day number (1, 2, 3, etc.)
   - **Activities:**
     - **Description:** Brief description of the activity
     - **Start Time:** ISO 8601 format (e.g., "2024-08-01T09:00:00Z")
     - **End Time:** ISO 8601 format (e.g., "2024-08-01T10:00:00Z")

Ensure the response adheres to the following interfaces:

\`\`\`typescript
interface TravelPlan {
    location: string;
    duration: {
        days: number;
        nights: number;
    };
    traveler: string;
    budget: string;
    flight: {
        details: {
            departure: string;
            destination: string;
            flightDuration: string;
            bookingUrl: string;
        };
        price: string;
    };
    hotels: Hotel[];
    placesToVisit: Place[];
    dailyPlan: DailyPlan[];
}

interface Hotel {
    hotelName: string;
    address: string;
    price: string;
    imageUrl: string;
    geoCoordinates: {
        latitude: number;
        longitude: number;
    };
    rating: number;
    description: string;
}

interface Place {
    placeName: string;
    placeDetails: string;
    imageUrl: string;
    geoCoordinates: {
        latitude: number;
        longitude: number;
    };
    ticketPricing: string;
    bestTimeToVisit: string;
}

interface DailyPlan {
    day: number;
    activities: Activity[];
}

interface Activity {
    description: string;
    startTime: string; // ISO 8601 format e.g., "2024-08-01T09:00:00Z"
    endTime: string;   // ISO 8601 format e.g., "2024-08-01T10:00:00Z"
}

`