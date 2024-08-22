import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast, Toaster } from "sonner";

const BookingForm = () => {
  const { id, date, time } = useParams();
  const baseURL = "http://localhost:8080";
  const [email, setEmail] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const navigate = useNavigate();

  const onBookingSuccess = () => {
    setBookingSuccess(true);
    toast.success(
      "Booking confirmed. The ID is copied, keep it safe for cancellation",
      {
        position: "top-center",
        onAutoClose: () => navigate("/"),
      }
    );
  };

  const bookAppointment = async () => {
    try {
      const response = await axios.post(`${baseURL}/api/v1/booking/book`, {
        id: id,
        email,
      });
      if (response.status === 201) {
        console.log("success!");
        navigator.clipboard.writeText(id);
        onBookingSuccess();
      }
    } catch (error) {
      const errorMessage =
        typeof error.response.data === "string"
          ? error.response.data
          : error.response.data.email;
      toast.error(errorMessage, {
        position: "top-center",
      });
    }
  };

  return (
    <div>
      <Toaster richColors />
      <div className="max-w-md mx-auto mt-8 p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Book an Appointment
        </h3>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
          <p className="text-sm text-gray-600 mt-1">
            We will never share your email with anyone else.
          </p>
        </div>
        <button
          type="button"
          onClick={bookAppointment}
          disabled={bookingSuccess}
          className={`w-full py-2 px-4 rounded-lg font-medium text-white transition-colors duration-300 ${
            bookingSuccess
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-teal-600 hover:bg-teal-700"
          }`}
        >
          {bookingSuccess ? "Booked" : "Book Now"}
        </button>
        <div className="mt-6 border-t border-gray-300 pt-4">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">
            Booking Details
          </h4>
          <div className="text-gray-600">
            <p>
              <strong>ID:</strong> {id}
            </p>
            <p>
              <strong>Date:</strong> {date}
            </p>
            <p>
              <strong>Time:</strong> {time}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
