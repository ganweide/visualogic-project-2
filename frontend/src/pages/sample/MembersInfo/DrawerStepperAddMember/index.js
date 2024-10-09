import React from 'react';
import PropTypes from 'prop-types';
import { Box, Drawer } from '@mui/material';
import CardHeader from './CardHeader';
import * as yup from 'yup';
import StepperForm from './StepperForm';
// import { useInfoViewActionsContext } from '@enjoey/utility/AppContextProvider/InfoViewContextProvider';
// import { postDataApi } from '@enjoey/utility/APIHooks';

const validationSchema = yup.object({
  memberValidation: yup.object({
    registrationDate: yup.date().required('Required'),
    membershipStatus: yup.string().required('Required'),
    existingMobileNumber: yup.string().when('membershipStatus', {
      is: 'existing',
      then: yup.string().required('Required'),
    }),
    name: yup.string().required('Required'),
    branch: yup.string().required('Required'),
    paymentMethod: yup.string().required('Required'),
  }),
  memberPersonal: yup.object({
    fullName: yup.string().required('Required'),
    preferredName: yup.string().required('Required'),
    chineseName: yup.string().required('Required'),
    nricPassport: yup.string().required('Required'),
    dateOfBirth: yup.date().required('Required'),
    age: yup.number().required('Required'),
    gender: yup.string().required('Required'),
    address: yup.string().required('Required'),
    city: yup.string().required('Required'),
    postcode: yup.string().required('Required'),
    states: yup.string().required('Required'),
    mobileNumber: yup.string().required('Required'),
    emailAddress: yup.string().required('Required'),
    howDidYouHearAboutUs: yup.string().required('Required'),
    emergencyContactName: yup.string().required('Required'),
    emergencyContactMobileNumber: yup.string().required('Required'),
    emergencyContactRelationship: yup.string().required('Required'),
  }),
  memberMedical: yup.object({
    medicalHistory: yup.string(),
    recentOperation: yup.boolean(),
    severeHeartDisease: yup.boolean(),
    severeCirculatoryProblems: yup.boolean(),
    cardiacPacemaker: yup.boolean(),
    cancer: yup.boolean(),
    severeHighBloodPressure: yup.boolean(),
    skinDisease: yup.boolean(),
    viralInfection: yup.boolean(),
    fever: yup.boolean(),
    recentScars: yup.boolean(),
    pregnancy: yup.boolean(),
    understandAboveInformation: yup.boolean().required('Required'),
  }),
});

const DrawerStepperAddMember = ({ isOpen, setOpenDialog, reCallAPI }) => {
  // const infoViewActionsContext = useInfoViewActionsContext();

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
            onCloseAddCard={() => setOpenDialog(false)}
            title={'Create New Member'}
          />
        </Box>
          <StepperForm
            isViewOnly={false}
            onCloseAddCard={() => setOpenDialog(false)}
          />
      </Drawer>
    </Box>
  );
};

export default DrawerStepperAddMember;

DrawerStepperAddMember.propTypes = {
  reCallAPI: PropTypes.func,
  isOpen: PropTypes.bool,
  isViewOnly: PropTypes.bool,
  setOpenDialog: PropTypes.func,
};