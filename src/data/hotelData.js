import BestWesternHotel from "@assets/images/bestwestern-hotel.jpg";
import LotteHotel from "@assets/images/lotte-hotel.jpg";

const hotelData = [
    {
      id: 1,
      name: "Lotte Hotel Seoul",
      stars: 5,
      location: "Seoul, Myeongdong",
      rating: 4.8,
      reviews: 1250,
      image: LotteHotel, // 여기서 import한 이미지 사용
      amenities: ["Breakfast", "Pool"],
      rooms: [
        {
          type: "Superior Twin Room",
          price: "169,000",
          perks: ["Free cancellation", "Breakfast included"],
        },
        {
          type: "Superior Double Room",
          price: "204,000",
          perks: ["Free cancellation", "Breakfast included"],
        },
      ]
    },
    {
      id: 2,
      name: "Best Western Busan",
      stars: 4,
      location: "Busan, Haeundae",
      rating: 4.5,
      reviews: 892,
      image: BestWesternHotel,
      amenities: ["Breakfast", "Fitness Center"],
      rooms: [
        {
          type: "Superior Twin Room",
          price: "159,000",
          perks: ["Free cancellation"],
        },
        {
          type: "Superior Double Room",
          price: "189,000",
          perks: ["Free cancellation"],
        },
      ]
    },
    {
      id: 3,
      name: "Best Western Jeju",
      stars: 4,
      location: "Jeju, City Center",
      rating: 4.4,
      reviews: 678,
      image: BestWesternHotel,
      amenities: ["Breakfast", "Pool"],
      rooms: [
        {
          type: "Superior Twin Room",
          price: "149,000",
          perks: ["Free cancellation"],
        },
        {
          type: "Superior Double Room",
          price: "179,000",
          perks: ["Free cancellation"],
        },
      ]
    },
    {
      id: 4,
      name: "Best Western Incheon Airport",
      stars: 4,
      location: "Incheon, Airport",
      rating: 4.3,
      reviews: 945,
      image: BestWesternHotel,
      amenities: ["Breakfast"],
      rooms: [
        {
          type: "Superior Twin Room",
          price: "139,000",
          perks: ["Free cancellation"],
        },
        {
          type: "Superior Double Room",
          price: "169,000",
          perks: ["Free cancellation"],
        },
      ]
    },
    {
      id: 5,
      name: "Best Western Gangneung",
      stars: 4,
      location: "Gangneung, Beach",
      rating: 4.2,
      reviews: 456,
      image: BestWesternHotel,
      amenities: ["Breakfast", "Parking"],
      rooms: [
        {
          type: "Superior Twin Room",
          price: "129,000",
          perks: ["Free cancellation"],
        },
        {
          type: "Superior Double Room",
          price: "159,000",
          perks: ["Free cancellation"],
        },
      ]
    },
    {
      id: 6,
      name: "Best Western Daejeon",
      stars: 4,
      location: "Daejeon, Yuseong",
      rating: 4.1,
      reviews: 567,
      image: BestWesternHotel,
      amenities: ["Breakfast", "Restaurant"],
      rooms: [
        {
          type: "Superior Twin Room",
          price: "119,000",
          perks: ["Free cancellation"],
        },
        {
          type: "Superior Double Room",
          price: "149,000",
          perks: ["Free cancellation"],
        },
      ]
    },
    {
      id: 7,
      name: "Best Western Gwangju",
      stars: 4,
      location: "Gwangju, Downtown",
      rating: 4.0,
      reviews: 432,
      image: BestWesternHotel,
      amenities: ["Breakfast", "Restaurant"],
      rooms: [
        {
          type: "Superior Twin Room",
          price: "109,000",
          perks: ["Free cancellation"],
        },
        {
          type: "Superior Double Room",
          price: "139,000",
          perks: ["Free cancellation"],
        },
      ]
    }
  ];
  
export default hotelData;
