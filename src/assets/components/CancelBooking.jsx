import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";

const CancelBooking = () => {
  const baseURL = "http://localhost:8080";
  const [bookingId, setBookingId] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const onCancelSuccess = () => {
    toast.success("Cancelation successful!", {
      position: "top-center",
      onAutoClose: () => navigate("/"),
    });
  };

  const cancelBooking = async () => {
    try {
      const response = await axios.put(`${baseURL}/api/v1/booking/cancel`, {
        id: bookingId,
        email,
      });
      console.log("Cancellation Response:", response.data);
      if (response.status === 204) {
        onCancelSuccess();
      }
    } catch (error) {
      console.error("Error canceling booking:", error);
      if (error.response && error.response.data) {
        const errorMessage =
          typeof error.response.data === "string"
            ? error.response.data
            : error.response.data.email;
        toast.error(errorMessage, {
          position: "top-center",
        });
      } else {
        toast.error("An error occurred while canceling the booking.", {
          position: "top-center",
        });
      }
    }
  };

  return (
    <div>
      <Toaster richColors />
      <div className="max-w-md mx-auto mt-10 p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          Cancel Booking
        </h3>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="bookingId"
              className="block text-gray-700 font-medium mb-1"
            >
              Booking ID:
            </label>
            <input
              type="text"
              id="bookingId"
              placeholder="Enter Booking ID"
              value={bookingId}
              onChange={(e) => setBookingId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-1"
            >
              Email Address:
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-sm text-gray-500 mt-1">
              We will never share your email with anyone else.
            </p>
          </div>
          <button
            type="button"
            onClick={cancelBooking}
            className="w-full py-2 px-4 bg-rose-600 text-white font-semibold rounded-md shadow hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
          >
            Cancel Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelBooking;
