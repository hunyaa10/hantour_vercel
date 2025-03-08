import OrakaiHotelMain from "@assets/images/orakaiHotel/orakai-main.jpg";
import OrakaiHotelSub from "@assets/images/orakaiHotel/orakai-sub.jpg";
import OrakaiHotelRoom from "@assets/images/orakaiHotel/orakai-room.jpg";

import OrakaiHotelPool from "@assets/images/orakaiHotel/facilities/orakai-pool.png";
import OrakaiHotelGym from "@assets/images/orakaiHotel/facilities/orakai-gym.jpg";
import OrakaiHotelSauna from "@assets/images/orakaiHotel/facilities/orakai-sauna.png";
import OrakaiHotelPlayroom from "@assets/images/orakaiHotel/facilities/orakai-playroom.png";
import OrakaiHotelRestaurant from "@assets/images/orakaiHotel/facilities/restaurant.jpg";

const hotelData = [
  {
    id: 1,
    name: "Orakai Insadong Suites",
    stars: 4,
    region: "Seoul",
    location: "Jongno-Gu, Seoul",
    address: "8, Insadong 4-gil, Jongno-Gu, 03163 Seoul, Republic of Korea",
    phone: "02-6262-8888",
    rating: 4.5,
    reviews: 856,
    images: {
      main: OrakaiHotelMain,
      sub: OrakaiHotelSub,
      room: OrakaiHotelRoom,
      facilities: {
        pool: OrakaiHotelPool,
        gym: OrakaiHotelGym,
        sauna: OrakaiHotelSauna,
        playroom: OrakaiHotelPlayroom,
        restaurant: OrakaiHotelRestaurant
      }
    },
    amenities: [
      "Free Wi-Fi",
      "Parking",
      "Indoor Swimming Pool",
      "Sauna & Steam Room",
      "Gymnasium",
      "Children's Playroom"
    ],
    checkIn: "16:00",
    checkOut: "11:00",
    cancellationPolicy: "Free cancellation is available up to 14 days before check-in date.",
    breakfast: {
      available: true,
      price: "18,000"
    },
    rooms: [
      {
        type: "One Bedroom",
        defaultCapacity: 2,
        bedType: "King bed (1)",
        price: {
          weekday: "240,000",
          friday: "250,000",
          saturday: "265,000"
        },
        perks: ["Free cancellation", "Free Wi-Fi"]
      },
      {
        type: "Two Bedroom Premier",
        defaultCapacity: 3,
        bedType: "King bed (1) + Single bed (1)",
        price: {
          weekday: "300,000",
          friday: "330,000",
          saturday: "350,000"
        },
        perks: ["Free cancellation", "Free Wi-Fi"]
      },
      {
        type: "Three Bedroom",
        defaultCapacity: 4,
        bedType: "King bed (1) + Single bed (2)",
        price: {
          weekday: "370,000",
          friday: "410,000",
          saturday: "430,000"
        },
        perks: ["Free cancellation", "Free Wi-Fi"]
      }
    ]
  }
];

export default hotelData;
