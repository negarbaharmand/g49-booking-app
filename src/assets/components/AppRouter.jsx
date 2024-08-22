import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import BookingList from "./BookingList";
import BookingForm from "./BookingForm";
import CancelBooking from "./CancelBooking";

const AppRouter = () => {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<BookingList />} />
          <Route
            path="/booking-form/:id/:date/:time"
            element={<BookingForm />}
          />
          <Route path="/cancelation-form" element={<CancelBooking />} />
          <Route path="/booking" element={<BookingForm />} />
        </Routes>
      </Router>
    </div>
  );
};

export default AppRouter;
