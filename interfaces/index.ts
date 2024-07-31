import { Timestamp } from "firebase/firestore";

export interface Trip {
    id?: string,
    userEmail: string,
    tripData: TripData,
    tripPlan: TripPlan,
    createdAt: Date,
    updatedAt: Date
}

export interface TripData {
    budget: { title: string, description: string, icon: string },
    traveller: { title: string, descrition: string, icon: string, people: string },
    locationInfo: { name: string, coordinates: string, url: string, photoRef: string },
    totalNoOfDays: number,
    startDate: Date | Timestamp,
    endDate: Date | Timestamp,
}

export interface TripPlan {
    location: string;
    duration: {
        days: number;
        nights: number;
    };
    traveler: string;
    budget: string;
    flight: Flight;
    hotels: Hotel[];
    placesToVisit: Place[];
    dailyPlan: DailyPlan[];
}

export interface Flight {
    details: {
        departure: string;
        destination: string;
        flightDuration: string;
        bookingUrl: string;
    };
    price: string;
}

export interface Hotel {
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

export interface Place {
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
