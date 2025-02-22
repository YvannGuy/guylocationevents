"use client";
import { useState } from "react";
import ProgressBar from "./progressBar";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import Step4 from "./step4";
import Step5 from "./step5";
import Modal from "./modal";

export default function ReservationStep() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [reservationRef, setReservationRef] = useState("");

  const handleNext = (data) => {
    setFormData({ ...formData, ...data });
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleFinish = () => {
    const ref = "REF-" + Math.floor(Math.random() * 90000 + 10000);
    setReservationRef(ref);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="bg-[#f1f1f1]  pt-20 pb-20">
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg">
        <ProgressBar currentStep={currentStep} totalSteps={5} />
        {currentStep === 1 && <Step1 onNext={handleNext} />}
        {currentStep === 2 && (
          <Step2 formData={formData} onPrev={handlePrev} onNext={handleNext} />
        )}
        {currentStep === 3 && <Step3 onPrev={handlePrev} onNext={handleNext} />}
        {currentStep === 4 && <Step4 onPrev={handlePrev} onNext={handleNext} />}
        {currentStep === 5 && (
          <Step5 onPrev={handlePrev} onFinish={handleFinish} />
        )}
        {showModal && (
          <Modal reservationRef={reservationRef} onClose={handleCloseModal} />
        )}
      </div>
    </div>
  );
}
