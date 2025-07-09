import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useUser, RedirectToSignIn } from "@clerk/clerk-react";
import Notification from "./Notification.jsx";

export default function Payment() {
  const [amount, setAmount] = useState(29000);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const store_data = useSelector((state) => state.Data);
  const { isLoaded, isSignedIn, user } = useUser();
  const dispatch = useDispatch();

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };
  const handlePayment = async () => {
    setLoading(true);
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      setLoading(false);
      return;
    }

    try {

      const { data } = await axios.post(import.meta.env.VITE_BACKEND_URL + '/create_order', {
        amount: parseFloat(amount),
        currency: 'INR',
      });

      if (!data.success) {
        alert('Failed to create order: ' + data.message);
        setLoading(false);
        return;
      }

      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: 'Hoststream',
        description: 'Test Transaction',
        order_id: data.orderId,
        handler: async (response) => {
          try {
            // Verify payment with backend
            console.log("while the sending => ", user.id)
            const verifyResponse = await axios.post(import.meta.env.VITE_BACKEND_URL + '/verify_payment', {
              orderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              user_id: user.id
            });

            if (verifyResponse.data.success) {
              // alert('Payment verified successfully!');
              navigate('/dashboard');
            } else {
              alert('Payment verification failed: ' + verifyResponse.data.message);
              dispatch({
                type: 'SET_ERROR',
                payload: {
                  msg: "Payment verification failed "+verifyResponse.data.message,
                  show: true
                }
              })
            }
          } catch (error) {
            alert('Error verifying payment: ' + error.message);
          }
          setLoading(false);
        },
        prefill: {
          name: 'John Doe',
          email: 'john.doe@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#000000',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      alert('Error creating order: ' + error.message);
      setLoading(false);
    }
  };
  return (

    <div className="group relative w-80">
      <div
        className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 p-[1px] shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-cyan-500/25"
      >
        <div
          className="absolute inset-0 bg-gradient-to-b from-cyan-500 to-blue-500 opacity-20"
        ></div>

        <div
          className="relative rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 p-6"
        >
          <div
            className="absolute -left-16 -top-16 h-32 w-32 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/0 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-70"
          ></div>
          <div
            className="absolute -bottom-16 -right-16 h-32 w-32 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/0 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-70"
          ></div>

          <div
            className="absolute -right-[1px] -top-[1px] overflow-hidden rounded-tr-2xl"
          >
            <div
              className="absolute h-20 w-20 bg-gradient-to-r from-cyan-500 to-blue-500"
            ></div>
            <div className="absolute h-20 w-20 bg-slate-950/90"></div>
            <div
              className="absolute right-0 top-[22px] h-[2px] w-[56px] rotate-45 bg-gradient-to-r from-cyan-500 to-blue-500"
            ></div>
            <span
              className="absolute right-1 top-1 text-[10px] font-semibold text-white"
            >POPULAR</span
            >
          </div>

          <div className="relative">
            <h3 className="text-sm font-medium uppercase tracking-wider text-cyan-500">
              Professional
            </h3>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-white">$29</span>
              <span className="text-sm text-slate-400">/month</span>
            </div>
            <p className="mt-2 text-sm text-slate-400">
              Perfect for growing businesses and professionals.
            </p>
          </div>

          <div className="relative mt-6 space-y-4">
            <div className="flex items-start gap-3">
              <div
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-500/10"
              >
                <svg
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4 w-4 text-cyan-500"
                >
                  <path
                    d="M5 13l4 4L19 7"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  ></path>
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-white">Unlimited Projects</p>
                <p className="text-xs text-slate-400">Create as many as you need</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-500/10"
              >
                <svg
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4 w-4 text-cyan-500"
                >
                  <path
                    d="M5 13l4 4L19 7"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  ></path>
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-white">Advanced Analytics</p>
                <p className="text-xs text-slate-400">Detailed insights and reports</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-500/10"
              >
                <svg
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4 w-4 text-cyan-500"
                >
                  <path
                    d="M5 13l4 4L19 7"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  ></path>
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-white">Unlimited Cluster</p>
                <p className="text-xs text-slate-400">Create as many as you need</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-500/10"
              >
                <svg
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4 w-4 text-cyan-500"
                >
                  <path
                    d="M5 13l4 4L19 7"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  ></path>
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-white">24/7 Priority Support</p>
                <p className="text-xs text-slate-400">Get help when you need it</p>
              </div>
            </div>
          </div>

          <div className="relative mt-8">
            <button
              onClick={handlePayment}
              className="group/btn relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 p-px font-semibold text-white shadow-[0_1000px_0_0_hsl(0_0%_100%_/_0%)_inset] transition-colors hover:shadow-[0_1000px_0_0_hsl(0_0%_100%_/_2%)_inset]"
            >
              <div
                className="relative rounded-xl bg-slate-950/50 px-4 py-3 transition-colors group-hover/btn:bg-transparent"
              >
                <span className="relative flex items-center justify-center gap-2">
                  Get Started
                  <svg
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                  >
                    <path
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                      strokeWidth="2"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    ></path>
                  </svg>
                </span>
              </div>
            </button>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2">
            <svg
              stroke="currentColor"
              viewBox="0 0 24 24"
              fill="none"
              className="h-4 w-4 text-slate-400"
            >
              <path
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
              ></path>
            </svg>
            <span className="text-xs font-medium text-slate-400"
            >30-day money-back guarantee</span
            >
          </div>
        </div>
      </div>
    </div>

  )
}
