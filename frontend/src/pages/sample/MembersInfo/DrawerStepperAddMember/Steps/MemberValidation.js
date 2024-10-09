import React from 'react';
import {
  Box,
  Card,
  CardContent,
  FormControlLabel,
  FormLabel,
  Button,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import AppGridContainer from '@enjoey/core/AppGridContainer';
import AppTextField from '@enjoey/core/AppFormComponents/AppTextField';
import IntlMessages from '@enjoey/utility/IntlMessages';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import { Formik, Form } from 'formik'; 
import * as Yup from 'yup'; 

const validationSchema = Yup.object({
  registrationDate: Yup.string().required('Required'),
  membershipStatus: Yup.string().required('Required'),
  name: Yup.string().required('Required'),
  branch: Yup.string().required('Required'),
  existingMobileNumber: Yup.string().when('membershipStatus', {
    is: 'existing',
    then: Yup.string().required('Mobile number is required for existing members'),
  }),
  paymentMethod: Yup.string().required('Required'),
});

const MemberValidation = () => {

  // Handle Membership Status Change
  const [membershipStatus, setMembershipStatus] = React.useState('new');
  const handleMembershipStatusChange = (event) => {
    setMembershipStatus(event.target.value);
  }

  // const handleSubmit = async (values) => {
  //   // updateFormData('memberValidation', values);
  //   // console.log('Form Submitted: ', values);
  //   // handleNext(validationSchema.isValidSync(values));
  //   try {
  //     // Validate values
  //     await validationSchema.validate(values, { abortEarly: false });
  
  //     updateFormData('memberValidation', values);
  //     console.log('Form Submitted: ', values);
  
  //     // Proceed to next step
  //     handleNext();
  //   } catch (err) {
  //     console.error('Validation Errors:', err.errors);
  //     // Handle validation errors (e.g., set a local error state or let Formik handle it)
  //   }
  // };  

  return (
    <Formik
      validationSchema={validationSchema}
      onSubmit={(data) => handleSubmit(data)}
    >
      {({ values, handleChange, errors, touched}) => (
        <Form noValidate autoComplete="off">
          <Box sx={{ padding: 5, ml: -6, mr: -6 }}>
            <Box sx={{ pb: 5, px: 5, mb: 5, borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
              <Card variant="outlined" sx={{ mt: 2 }}>
                <CardContent>
                  <AppGridContainer spacing={4}>
                  <Grid item xs={12} md={6}>
                    <AppTextField
                      name='registrationDate'
                      fullWidth
                      type='date'
                      label= {IntlMessages.id='member.RegistrationDate'}
                      InputLabelProps={{shrink: true}}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <AppTextField
                      name="membershipStatus"
                      fullWidth
                      label={<IntlMessages id="member.MembershipStatus" />}
                      select
                      onChange={handleMembershipStatusChange}
                    >
                      <MenuItem value ="new">
                        <IntlMessages id="member.newMember" />
                      </MenuItem>
                      <MenuItem value ="existing">
                        <IntlMessages id="member.existingMember" />
                      </MenuItem>
                    </AppTextField>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <AppTextField
                      name='name'
                      fullWidth
                      label={<IntlMessages id='member.Name' />}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <AppTextField
                      name='branch'
                      fullWidth
                      label={<IntlMessages id='member.branch' />}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    {membershipStatus === "existing" && (
                      <Grid item xs={12} md={6}>
                        <AppTextField
                          name='existingPhoneNumber' // Bind input to state
                          fullWidth
                          label={<IntlMessages id="member.ExistingPhoneNumber" />}
                        />
                      </Grid>
                    )}
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Payment Method</FormLabel>
                      <RadioGroup
                        row // Display radio buttons horizontally
                        label={<IntlMessages id="member.PaymentMethod" />}
                        name="paymentMethod"
                      >
                        <FormControlLabel value="One-off" control={<Radio />} label="Debit/Credit Card (One-off)" />
                        <FormControlLabel value="Installment" control={<Radio />} label="Debit/Credit Card (Installment)" />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  </AppGridContainer>
                </CardContent>
              </Card>
            </Box>
            {/* Navigation Buttons */}
            <Box
              sx={{
                position: 'sticky',
                bottom: 0,
                zIndex: 1,
                backgroundColor: 'background.paper',
                padding: 2,
                textAlign: 'right',
              }}
            >
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default MemberValidation;
