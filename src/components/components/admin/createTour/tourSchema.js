export const CURRENCIES = ["USD", "EUR", "KGS", "RUB", "KZT"]
export const AUDIENCE_TYPES = ["solo", "couple", "family", "group", "corporate", "senior", "youth"]
export const MEAL_TYPES = ["BB", "HB", "FB", "AI", "RO"]
export const BAGGAGES = ["hand-only", "20kg", "23kg", "30kg"]

export const iNITIAL_TOUR_DATA = {
  title: "",
  country: "",
  city: "",
  hotel: { name: "", stars: 0, description: "" },
  location: { address: "" },
  duration: { days: 0, nights: 0 },
  photos:[],
  media: {
    cover: "",
    photos: [],
  },
  booking: {
    availableUntil: "",
    totalSeats: 0,
    availableSeats: 0,
    minAge: 0,
    maxAge: null,
  },
  flight: {
    from: "",
    to: "",
    airline: "",
    direct: false,
    baggage: "",
    transferIncluded: false,
  },
  included: {
    meals: "",
    flight: false,
    hotel: false,
    transfer: false,
    insurance: false,
    visa: false,
    guide: false,
  },
  documents: {
    visaRequired: false,
    passportValidityMonths: 0,
    insuranceIncluded: false,
  },
  geo:{
    type: "Point",
    coordinates: [7.65, 45.05],
  },
  days: [],
  price: { amount: 0, currency: "", perPerson: false, discount: 0 },
  audience: { type: [], kidsAllowed: false, petsAllowed: false },
  extras: { wifi: false, spa: false, pool: false, excursionsAvailable: false },
  status: "active",
}
