import { create } from "zustand";

const useFindStore = create((set) => ({
    dateFrom: '',
    dateTo: '',
    country: null,   
    night: [4, 7],
    guests: 2,

    setDateFrom: (date) => set({ dateFrom: date }),
    setDateTo: (date) => set({ dateTo: date }),
    setCountry: (country) => set({ country }), 

    setNight: (night) => set({ night }), 

    incrementGuests: () => set((state) => {
        if (state.guests < 6) {
            return { guests: state.guests + 1 } 
        }
        return state
    }),

    decrementGuests: () => set((state) => {
        if (state.guests > 1) {
            return { guests: state.guests - 1 } 
        }
        return state
    }),
}))

export default useFindStore