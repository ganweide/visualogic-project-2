import React, { useState } from 'react';
import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';

import MemberValidation from './Steps/MemberValidation';
import MemberPersonal from './Steps/MemberPersonal';
import MemberMedical from './Steps/MemberMedical';
import CardHeader from './CardHeader';

const steps = ['Member Validation', 'Member Personal', 'Member Medical'];

const StepperForm = ({ values, errors, onCloseAddCard}) => { 
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };


  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const totalSteps = 3; // Define total steps here
  const isLastStep = activeStep === totalSteps - 1; // Determine if it's the last step

  const finalSubmit = () => {
    console.log('Form data submitted');
    onCloseAddCard();
  };

  console.log('activeStep', activeStep);

  //const isLastStep = activeStep === steps.length - 1;

  return (
    <Box
      sx={{
        pb: 5,
        px: 5,
        mb: 5,
        pt: 5,
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >

      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>


      {activeStep === 0 && (
        <MemberValidation 
          onNext={() => handleNext()} 
          onBack={handleBack}
          values={values}
          errors={errors} 
        />
      )}
      {activeStep === 1 && (
        <MemberPersonal 
          onNext={() => handleNext()} 
          onBack={handleBack}
          values={values}
          errors={errors}  
        />
      )}
      {activeStep === 2 && (
        <MemberMedical 
          onNext={() => finalSubmit()} 
          onBack={handleBack}
          values={values}
          errors={errors}  
        />
      )}
      <Box 
        sx={{
          position: 'sticky',
          bottom: 0,
          zIndex: 1,
          backgroundColor: 'background.paper',
          padding: 2,
          textAlign: 'right',
        }}>
        <Button onClick={handleBack} disabled={activeStep === 0}>
          Back
        </Button>
        
        <Button
          type="button"
          onClick={() => {
            if (isLastStep) {
              finalSubmit(); // Final form submission
            } else {
              handleNext(); // Go to the next step
            }
          }}
        >
          {isLastStep ? 'Submit' : 'Next'}
        </Button>
      </Box>
    </Box>
    
  );
};

export default StepperForm;
