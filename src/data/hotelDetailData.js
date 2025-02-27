export const hotelDetailData = {
  name: "Lotte Hotel Seoul",
  address: "30, Euljiro, Jung-gu, Seoul, South Korea",
  rating: "5",
  checkIn: "PM 3:00",
  checkOut: "AM 11:00",

  amenities: ["Breakfast Provided", "Swimming Pool", "Fitness Center"],

  breakfastServices: {
    breakfast: {
      price: 60000,
      isOptional: true,
    },
  },

  rooms: [
    {
      name: "Deluxe Room",
      bedType: "1 King Bed",
      standardOccupancy: 2,
      maxOccupancy: 2,
      price: 100000,
    },
    {
      name: "Standard Room",
      bedType: "2 Single Beds",
      standardOccupancy: 2,
      maxOccupancy: 2,
      price: 80000,
    },
    {
      name: "Family Suite",
      bedType: "2 Double Beds",
      standardOccupancy: 4,
      maxOccupancy: 6,
      price: 150000,
    },
  ],

  nearbyAttractions: ["N Seoul Tower", "Bukchon Hanok Village"],
};
