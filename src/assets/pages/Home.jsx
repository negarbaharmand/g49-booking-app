import React from "react";
import Header from "../components/Header";
import BookingForm from "../components/BookingForm";
import { useParams } from "react-router-dom";
import BookingList from "../components/BookingList";

const Home = () => {
  const { id, date, time } = useParams();
  return (
    <div>
      <Header />
      <BookingList />
    </div>
  );
};

export default Home;
