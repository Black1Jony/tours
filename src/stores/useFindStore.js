import { create } from "zustand";

const useFindStore = create((set) => ({
    dateFrom: '',
    dateTo: '',
    country: null,   
    nights: [4, 7],
    guests: 2,
    priceMin: 100,
    priceMax: 1000000,
    stars: 4,
    extras: [],

    setDateFrom: (date) => set({ dateFrom: date }),
    setDateTo: (date) => set({ dateTo: date }),
    setCountry: (country) => set({ country }), 

    setNight: (nights) => set({ nights }), 

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
    setPriceMin: (priceMin) => set({ priceMin }),
    setPriceMax: (priceMax) => set({ priceMax }),
    setStars: (stars) => set({ stars }),
    setExtras: (extras) => set({ extras }),
}))

export default useFindStore