import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";



























































































/* // Step Components
const PersonalDetails = () => (
  <div>
    <label>
      Name: <input type="text" name="name" />
    </label>
    <br />
    <label>
      Email: <input type="email" name="email" />
    </label>
  </div>
);

const VehicleDetails = () => (
  <div>
    <label>
      Vehicle Make: <input type="text" name="vehicleMake" />
    </label>
    <br />
    <label>
      Vehicle Model: <input type="text" name="vehicleModel" />
    </label>
  </div>
);

const CoverageOptions = () => (
  <div>
    <label>
      Coverage Type: <input type="text" name="coverageType" />
    </label>
    <br />
    <label>
      Deductible: <input type="text" name="deductible" />
    </label>
  </div>
);

// Main MultiStepForm Component
const FormFinal = () => {
  // Steps array with each step's title and content
  const steps = [
    { id: 1, title: "Personal Details", content: <PersonalDetails /> },
    { id: 2, title: "Vehicle Details", content: <VehicleDetails /> },
    { id: 3, title: "Coverage Options", content: <CoverageOptions /> },
  ];

  // State to track the current step
  const [currentStep, setCurrentStep] = useState(0);

  // Handlers for navigation
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <h1>{steps[currentStep]?.title}</h1>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
        >
          {steps[currentStep]?.content}
        </motion.div>
      </AnimatePresence>

      <div style={{ marginTop: "20px" }}>
        <button onClick={handlePrevious} disabled={currentStep === 0}>
          Previous
        </button>
        <button onClick={handleNext} disabled={currentStep === steps.length - 1}>
          Next
        </button>
      </div>
    </div>
  );
};

export default FormFinal; */