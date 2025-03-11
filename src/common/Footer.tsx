import { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { totalSteps } from "../hooks/useGetComponent";
import { loadStripe } from "@stripe/stripe-js";

interface IFooterProps {
  handleNextStep: () => void;
  handlePreviousStep: () => void;
}

const Footer = ({ handleNextStep, handlePreviousStep }: IFooterProps) => {
  const [loading, setLoading] = useState(false);
  const { step } = useContext(AppContext);

  const testPublicKey =
    "pk_test_51NJjPpD341iGIhAd2ohlo0nRAOcBWr00A02fnapdRExU6ipOVaa23aB82Q9viJvln19Zspo2CgpQ5f4moefbs1cS006iWOYmmV";
  // const livePublicKey =
  //   "pk_live_51NJjPpD341iGIhAdQaGd2KMeGgaND4NynhvX8XezEwvGskZIEa3381zHJRfBBK9cYyoV6YN3XBAqanS6KFBtp4KU00U27Ple54";

  const testPriceId = "price_1R1XUWD341iGIhAdDxmYmcLz";
  // const livePriceId = "price_1QzxPuD341iGIhAddqXu6mEN";

  const stripePromise = loadStripe(testPublicKey);

  const handleStripeCheckout = async () => {
    setLoading(true);
    const stripe = await stripePromise;

    if (!stripe) {
      alert("Stripe failed to load.");
      setLoading(false);
      return;
    }

    try {
      const { error } = await stripe.redirectToCheckout({
        lineItems: [{ price: testPriceId, quantity: 1 }],
        mode: "payment",
        successUrl: window.location.origin + "/payment-success",
        cancelUrl: window.location.origin + "/cancel",
      });

      if (error) {
        console.error("Stripe error:", error);
        alert("Payment failed. Try again.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // const handleSubmitForm = async () => {
  //   const scriptURL =
  //     "https://script.google.com/macros/s/AKfycbwbTX0M4zWybNhYXuwTjQ2T8DMoE9UJHH1-oXfIxnl4AClCn8kQ2J1Gup5eXTsiu61j/exec";

  //   try {
  //     setLoading(true);
  //     const response = await fetch(scriptURL, {
  //       method: "POST",
  //       mode: "no-cors", // Prevents CORS errors
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     console.log("Data sent successfully!", response);
  //     alert("Form submitted successfully!");
  //   } catch (error) {
  //     console.error("Error submitting form:", error);
  //     alert("Error submitting form.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div>
      <div className="bg-[#4FB4A5] rounded-b-md text-white mb-5 w-full py-3 font-semibold flex justify-between px-5">
        <div>
          {step !== 1 && (
            <button
              onClick={handlePreviousStep}
              className="flex items-center gap-1 cursor-pointer jiggle-left"
            >
              <FaArrowLeft className="mt-0.5 mx-1 arrow-left" />
              <div className="tracking-widest">PREVIOUS</div>
            </button>
          )}
        </div>

        <div>
          {step !== totalSteps + 1 &&
            step !== 4 &&
            step !== 9 &&
            step !== 16 && (
              <button
                onClick={
                  step === totalSteps ? handleStripeCheckout : handleNextStep
                }
                disabled={loading}
                className={`flex items-center gap-1 cursor-pointer jiggle-right ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <div className="tracking-widest">
                  {loading
                    ? "Submitting..."
                    : step === totalSteps
                    ? "NEXT"
                    : "NEXT"}
                </div>
                {!loading && step !== totalSteps && (
                  <FaArrowRight className="mt-0.5 mx-1 arrow-right" />
                )}
              </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default Footer;
