import { Trip, TripData } from "@/interfaces";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";


interface ContextState {
    tripData: TripData, setTripData: Dispatch<SetStateAction<TripData>>,
    currentTrip: Trip | undefined, setCurrentTrip: Dispatch<SetStateAction<Trip | undefined>>
}

const StateContext = createContext<ContextState | undefined>(undefined)

export const ContextProvider = ({ children }: { children: ReactNode }) => {

    const initialData: TripData = {
        budget: { title: '', description: '', icon: '' },
        traveller: { title: '', descrition: '', icon: '', people: '' },
        locationInfo: { name: '', coordinates: '', url: '', photoRef: '' },
        totalNoOfDays: 0,
        startDate: new Date(),
        endDate: new Date(),
    }

    const [tripData, setTripData] = useState<TripData>(initialData)
    const [currentTrip, setCurrentTrip] = useState<Trip | undefined>(undefined)


    return (
        <StateContext.Provider value={{
            tripData, setTripData,
            currentTrip, setCurrentTrip
        }} >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => {
    const context = useContext(StateContext);
    if (!context) {
        throw new Error('useStateContext must be used within a StateContextProvider');
    }
    return context;
};
