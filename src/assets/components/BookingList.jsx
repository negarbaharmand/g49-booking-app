import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BookingList = () => {
  const currentDate = new Date();
  console.log(currentDate.toISOString());

  const startDate = currentDate.toISOString().slice(0, 10);
  const unformattedEndDate = new Date(currentDate);
  unformattedEndDate.setDate(currentDate.getDate() + 7);
  const endDate = unformattedEndDate.toISOString().slice(0, 10);

  const baseURL = "http://localhost:8080";

  const [bookings, setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookingsPerPage] = useState(16);
  const navigate = useNavigate();

  useEffect(() => {
    getBookings();
  }, []);

  const getBookings = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/api/v1/booking/from/${startDate}/to/${endDate}`
      );
      if (response.status === 200) {
        setBookings(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.log("Error fetching bookings:", error);
    }
  };

  const datePrettier = (dateTime) => {
    const dateTimeObj = new Date(dateTime);
    const bookingDate = dateTimeObj.toISOString().split("T")[0];
    const bookingTime = dateTimeObj.toLocaleString("en-US", {
      timeZone: "Europe/Amsterdam",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    return [bookingDate, bookingTime];
  };

  const handleButtonClick = (booking) => {
    const [bookingDate, bookingTime] = datePrettier(booking.dateTime);
    const bookingId = booking.id;
    navigate(`/booking-form/${bookingId}/${bookingDate}/${bookingTime}`);
  };

  //Pagination Logic
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  // Get the current bookings to display based on the pagination calculation.
  const currentBookings = bookings.slice(
    indexOfFirstBooking,
    indexOfLastBooking
  );
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="mt-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Booking List
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentBookings.map((booking) => {
            const [bookingDate, bookingTime] = datePrettier(booking.dateTime);

            return (
              <div
                key={booking.id}
                className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
              >
                <div className="p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    {bookingDate}
                    <br />
                    <span className="text-sm text-gray-500">{bookingTime}</span>
                  </h4>
                  <button
                    type="button"
                    className={`w-full py-2 px-4 rounded-lg text-white font-medium transition-colors duration-300 ${
                      booking.booked
                        ? "bg-rose-600 cursor-not-allowed"
                        : "bg-emerald-500 hover:bg-emerald-600"
                    }`}
                    onClick={() => handleButtonClick(booking)}
                    disabled={booking.booked}
                  >
                    {booking.booked ? "Booked" : "Available"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from(
            { length: Math.ceil(bookings.length / bookingsPerPage) },
            (_, index) => (
              <button
                className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors duration-300 ${
                  currentPage === index + 1
                    ? "bg-emerald-700 text-white border border-emerald-600"
                    : "bg-white text-emerald-600 border border-emerald-600 hover:bg-emerald-600 hover:text-emerald-100"
                }`}
                key={index + 1}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingList;
