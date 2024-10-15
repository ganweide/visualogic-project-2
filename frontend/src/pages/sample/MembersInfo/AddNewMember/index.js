import React, {useState, createContext} from 'react';
import PropTypes from 'prop-types';
import { Box, Drawer } from '@mui/material';
import CardHeader from './CardHeader';
import StepControl from './StepControl';
import AppInfoView from '@enjoey/core/AppInfoView';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Divider from '@mui/material/Divider';

export const FormContext = createContext();
const steps = ['Member Validation', 'Member Personal', 'Member Medical'];

const AddNewMember = ({ isOpen, setOpenDialog}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});

  return (
      <Box flex={1}>
        <Drawer
          anchor="right"
          open={isOpen}
          PaperProps={{
            sx: { width: '35%', maxWidth: '80%', flex: 1 },
          }}
        >
          <Box
            sx={{
              position: 'sticky',
              top: 0,
              zIndex: 1,
              backgroundColor: 'background.paper',
            }}
          >
            <CardHeader
              onCloseAddCard={() => {
                setOpenDialog(false);
                setFormData({});
                setActiveStep(0);
              }}
              title={'Create New Member'}
            />
          </Box>
          <FormContext.Provider
            value={{
              activeStep,
              setActiveStep,
              formData,
              setFormData,
              setOpenDialog
            }}>

              <div>
                <Stepper sx={{ pt: 5, pl: 0 }} activeStep={activeStep}>
                  {steps.map((label) => {
                    const stepProps = {};
                    const labelProps = {};

                    return (
                      <Step key={label} {...stepProps}>
                        <StepLabel {...labelProps}>{label}</StepLabel>
                      </Step>
                    );
                  })}
                </Stepper>

                <Divider
                sx={{
                  mb: {xs: 4, md: 6},
                  pt: 2,
                }}
                />

                <StepControl />

              </div>
          </FormContext.Provider>
          <AppInfoView />
        </Drawer>
      </Box>
    
  );
};

export default AddNewMember;

AddNewMember.propTypes = {
  reCallAPI: PropTypes.func,
  isOpen: PropTypes.bool,
  isViewOnly: PropTypes.bool,
  setOpenDialog: PropTypes.func,
};

{/* <MemberFormProvider validationSchema={validationSchema}>
          <Formik
            validateOnBlur={true}
            validateOnChange={true}
            validationSchema={validationSchema}
            onSubmit={(data, { setSubmitting }) => {
              setSubmitting(true);
              postDataApi(
                'api/members',
                infoViewActionsContext,
                data,
                false,
                false,
                {
                  'Content-Type': 'application/json',
                },
              )
                .then(() => {
                  reCallAPI();
                  infoViewActionsContext.showMessage('Successfully submitted!');
                  setSubmitting(false);  // Moved here
                })
                .catch((error) => {
                  infoViewActionsContext.fetchError(error.message);
                  setSubmitting(false);  // Moved here
                });
            }}
          >
            {({ values, errors, setFieldValue }) => {
              console.log(validationSchema);
              return (
                <AddNewMemberForm
                  values={values}
                  errors={errors}
                  setFieldValue={setFieldValue}
                  isViewOnly={false}
                />
              );
            }}
          </Formik>
        </MemberFormProvider> */}