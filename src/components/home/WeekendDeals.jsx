// import React from "react";
// import styled from "styled-components";
// import { ChevronLeft, ChevronRight, Info, Tag } from "lucide-react";
// // Styled Components
// const Container = styled.div`
//   background-color: #1a5151;
//   padding: 1.5rem;
//   padding-bottom: 3rem;
//   color: white;
// `;

// const Header = styled.div`
//   margin-bottom: 1rem;
// `;

// const Title = styled.h1`
//   font-size: 1.875rem;
//   font-weight: bold;
//   margin-bottom: 0.25rem;
// `;

// const DateRange = styled.p`
//   font-size: 0.875rem;
// `;

// const ViewAllButton = styled.button`
//   background-color: white;
//   color: black;
//   border-radius: 9999px;
//   padding: 0.5rem 1rem;
//   font-size: 0.875rem;
//   font-weight: 500;
// `;

// const ButtonContainer = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   margin-bottom: 1rem;
// `;

// const CarouselContainer = styled.div`
//   position: relative;
// `;

// const NavButton = styled.button`
//   position: absolute;
//   top: 50%;
//   transform: translateY(-50%);
//   z-index: 10;
//   background-color: white;
//   color: black;
//   border-radius: 9999px;
//   padding: 0.25rem;
//   ${(props) =>
//     props.position === "left"
//       ? "left: 0; margin-left: -1rem;"
//       : "right: 0; margin-right: -1rem;"}
// `;

// const CardsContainer = styled.div`
//   display: flex;
//   gap: 1rem;
//   overflow-x: auto;
// `;

// const Card = styled.div`
//   flex: none;
//   width: 16rem;
//   background-color: rgba(0, 0, 0, 0.1);
//   border-radius: 0.75rem;
//   overflow: hidden;
// `;

// const ImageContainer = styled.div`
//   position: relative;
// `;

// const Image = styled.img`
//   width: 100%;
//   height: 11rem;
//   object-fit: cover;
// `;

// const ImageControls = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   right: 0;
//   padding: 0.5rem;
//   display: flex;
//   justify-content: space-between;
// `;

// const ImageButton = styled.button`
//   color: white;
// `;

// const MemberTag = styled.div`
//   position: absolute;
//   top: 0.5rem;
//   right: 0.5rem;
//   background-color: #fcd34d;
//   color: black;
//   border-radius: 0.375rem;
//   padding: 0.25rem 0.5rem;
//   font-size: 0.75rem;
//   font-weight: 500;
//   display: flex;
//   align-items: center;
//   gap: 0.25rem;
// `;

// const CardContent = styled.div`
//   padding: 0.75rem;
// `;

// const CategoryText = styled.div`
//   font-size: 0.75rem;
//   color: #d1d5db;
//   margin-bottom: 0.25rem;
// `;

// const HotelName = styled.h3`
//   font-weight: bold;
//   margin-bottom: 0.5rem;
// `;

// const RatingContainer = styled.div`
//   display: flex;
//   align-items: center;
//   margin-bottom: 1rem;
// `;

// const RatingBadge = styled.span`
//   padding: 0.25rem 0.5rem;
//   border-radius: 0.375rem;
//   font-size: 0.875rem;
//   font-weight: bold;
//   background-color: ${(props) => (props.score >= 9 ? "#2563eb" : "#059669")};
// `;

// const RatingText = styled.span`
//   font-size: 0.875rem;
//   margin-left: 0.5rem;
// `;

// const PriceContainer = styled.div`
//   margin-bottom: 0.25rem;
//   display: flex;
//   align-items: center;
//   gap: 0.25rem;
// `;

// const CurrentPrice = styled.span`
//   font-weight: bold;
//   font-size: 1.25rem;
// `;

// const OriginalPrice = styled.span`
//   color: #9ca3af;
//   text-decoration: line-through;
//   font-size: 0.875rem;
// `;

// const InfoText = styled.div`
//   font-size: 0.875rem;
//   color: #d1d5db;
//   margin-bottom: 0.5rem;
// `;

// const DiscountBadge = styled.div`
//   display: inline-flex;
//   align-items: center;
//   gap: 0.25rem;
//   background-color: ${(props) => (props.isMember ? "#fcd34d" : "#059669")};
//   color: ${(props) => (props.isMember ? "black" : "white")};
//   border-radius: 0.375rem;
//   padding: 0.25rem 0.5rem;
//   font-size: 0.875rem;
//   margin-top: 0.5rem;
// `;

// const PaginationContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   margin-top: 1rem;
//   gap: 0.25rem;
// `;

// const PaginationDot = styled.div`
//   width: 0.5rem;
//   height: 0.5rem;
//   border-radius: 9999px;
//   background-color: ${(props) => (props.active ? "white" : "#9ca3af")};
// `;

// const WeekendDeals = () => {
//   const hotels = [
//     {
//       id: 1,
//       category: "타이베이",
//       name: "체크 인 타이페이 송잔",
//       rating: 8.6,
//       reviews: 1000,
//       originalPrice: 308691,
//       price: 182128,
//       totalPrice: 420715,
//       discount: 41,
//       isMemberDeal: false,
//       image: "/api/placeholder/400/250",
//     },
//     {
//       id: 2,
//       category: "피리",
//       name: "빌라 알레산드라",
//       rating: 8.6,
//       reviews: 477,
//       originalPrice: 236645,
//       price: 165651,
//       totalPrice: 415221,
//       discount: 30,
//       isMemberDeal: false,
//       image: "/api/placeholder/400/250",
//     },
//     {
//       id: 3,
//       category: "삿포로",
//       name: "SAPPORO STREAM HOTEL",
//       rating: 9.2,
//       reviews: 202,
//       originalPrice: 533197,
//       price: 375819,
//       totalPrice: 826801,
//       discount: 30,
//       isMemberDeal: true,
//       image: "/api/placeholder/400/250",
//     },
//     {
//       id: 4,
//       category: "싱가포르",
//       name: "요텔 싱가포르 오차드 로드",
//       rating: 8.8,
//       reviews: 1371,
//       originalPrice: 270575,
//       price: 194812,
//       totalPrice: 467158,
//       discount: 28,
//       isMemberDeal: true,
//       image: "/api/placeholder/400/250",
//     },
//     {
//       id: 5,
//       category: "홍콩",
//       name: "로얄 플라자 호텔",
//       rating: 8.2,
//       reviews: 1500,
//       originalPrice: 350000,
//       price: 280000,
//       totalPrice: 560000,
//       discount: 20,
//       isMemberDeal: false,
//       image: "/api/placeholder/400/250",
//     },
//   ];

//   const formatPrice = (price) => {
//     return "₩" + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//   };

//   return (
//     <Container>
//       {/* Header */}
//       <Header>
//         <Title>주말여행 마감 특가</Title>
//         <DateRange>특가 상품 포시 날짜: 2월 28일 - 3월 2일</DateRange>
//       </Header>

//       {/* View all button */}
//       <ButtonContainer>
//         <ViewAllButton>특가 상품 모두 보기</ViewAllButton>
//       </ButtonContainer>

//       {/* Card carousel */}
//       <CarouselContainer>
//         {/* Navigation buttons */}

//         {/* Cards container */}
//         <CardsContainer>
//           {hotels.map((hotel) => (
//             <Card key={hotel.id}>
//               {/* Image container */}
//               <ImageContainer>
//                 <Image src={hotel.image} alt={hotel.name} />
//               </ImageContainer>

//               {/* Content */}
//               <CardContent>
//                 <CategoryText>{hotel.category}</CategoryText>
//                 <HotelName>{hotel.name}</HotelName>

//                 {/* Rating */}
//                 <RatingContainer>
//                   <RatingBadge score={hotel.rating}>{hotel.rating}</RatingBadge>
//                   <RatingText>
//                     {hotel.rating >= 9 ? "매우 훌륭해요" : "훌륭해요"} (
//                     {hotel.reviews}개 이용 후기)
//                   </RatingText>
//                 </RatingContainer>

//                 {/* Price */}
//                 <PriceContainer>
//                   <CurrentPrice>{formatPrice(hotel.price)}</CurrentPrice>
//                   <OriginalPrice>
//                     {formatPrice(hotel.originalPrice)}
//                   </OriginalPrice>
//                 </PriceContainer>

//                 <InfoText>1박 기준</InfoText>
//                 <InfoText>총 요금: {formatPrice(hotel.totalPrice)}</InfoText>
//                 <InfoText>세금 및 수수료 포함</InfoText>

//                 <DiscountBadge isMember={hotel.isMemberDeal}>
//                   {hotel.isMemberDeal && <Tag size={14} />}
//                   <span>
//                     {hotel.isMemberDeal
//                       ? `회원가 ${hotel.discount}% 할인`
//                       : `${hotel.discount}% 할인`}
//                   </span>
//                 </DiscountBadge>
//               </CardContent>
//             </Card>
//           ))}
//         </CardsContainer>
//       </CarouselContainer>

//       {/* Pagination dots */}
//       <PaginationContainer>
//         <PaginationDot active={true} />
//         <PaginationDot active={false} />
//         <PaginationDot active={false} />
//       </PaginationContainer>
//     </Container>
//   );
// };

// export default WeekendDeals;
