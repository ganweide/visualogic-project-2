import React, {useState} from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Checkbox,
} from '@mui/material';
import AppGridContainer from '@enjoey/core/AppGridContainer';
import Grid from '@mui/material/Grid';
import AppTextField from '@enjoey/core/AppFormComponents/AppTextField';
import IntlMessages from '@enjoey/utility/IntlMessages';
import {Form} from 'formik';
import PropTypes from 'prop-types';
import {Fonts} from 'shared/constants/AppEnums';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import { Spa } from '@mui/icons-material';

const AddMemberForm = ({values, errors}) => {
  console.log('values', values, errors);

  const [selectedConditions, setSelectedConditions] = React.useState([]);

  // Handle Conditions List
  const conditionsList = [
    "Recent Operation",
    "Severe Heart Disease",
    "Severe Circulatory Problems",
    "Cardiac Pacemaker",
    "Cancer/Cancer Treatment (Chemo/Targeted Therapy)",
    "Severe High Blood Pressure",
    "Skin Disease",
    "Viral Infection",
    "Fever",
    "Recent Scars",
    "Pregnancy",
    "During Period",
    "None of the Above"
  ];

  // Handle Checkbox Change
  const handleCheckboxChange = (e) => {
    const { name } = e.target;
    if (selectedConditions.includes(name)) {
      setSelectedConditions(selectedConditions.filter((condition) => condition !== name));
    } else {
      setSelectedConditions([...selectedConditions, name]);
    }
  };

  // Handle Membership Status Change
  const [membershipStatus, setMembershipStatus] = React.useState('new');
  const handleMembershipStatusChange = (event) => {
    setMembershipStatus(event.target.value);
  }

  // Handle Understand Above Information
  const [understandAboveInformation, setUnderstandAboveInformation] = React.useState(false);

  // Handle How Did You Hear About Us
  const [howDidYouHearAboutUs, setHowDidYouHearAboutUs] = React.useState('new');
  const handleHowDidYouHearAboutUs = (event) => {
    setHowDidYouHearAboutUs(event.target.value);
  }
  return (
    <Form noValidate autoComplete='off'>
      <Box
        sx={{
          padding: 5,
          ml: -6,
          mr: -6,
        }}
      >
        <Box
          sx={{
            pb: 5,
            px: 5,
            mb: 5,
            borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          }}
        >
          <Card variant='outlined' sx={{mt: 2}}>
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
                  {values.membershipStatus === "existing" && ( // Check within Formik's values
                    <Grid item xs={12} md={6}>
                      <AppTextField
                        name='existingMobileNumber'
                        fullWidth
                        label={<IntlMessages id="member.ExistingMobileNumber" />}
                        onChange={handleChange} // Bind to Formik's handleChange
                        value={values.existingMobileNumber} // Bind value to Formik's values
                      />
                    </Grid>
                  )}
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

          <Box sx={{ mt: 3 }}></Box>

          <Card variant='outlined' sx={{mt: 2}}>
            <CardHeader
                  sx={{p:0, mt:2, ml:2}}
                  title={
                  <Box
                      component='h6'
                      sx={{
                        fontSize: 14,
                        fontWeight: Fonts.SEMI_BOLD,
                        mt: 0,
                        mb: 1,
                    }}
                  >
                    <IntlMessages id='member.PersonalDetails' />
                  </Box>
                }
              ></CardHeader>
              <CardContent>
              <AppGridContainer spacing={5}>
                <Grid item xs={12} md={6}>
                  <AppTextField
                    name='fullName'
                    fullWidth
                    label={<IntlMessages id='member.fullName' />}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <AppTextField
                    name='preferredName'
                    fullWidth
                    label={<IntlMessages id='member.preferredName' />}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <AppTextField
                    name='chineseName'
                    fullWidth
                    label={<IntlMessages id='member.chineseName' />}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <AppTextField
                    name='nricPassport'
                    fullWidth
                    label={<IntlMessages id='member.nricPassport' />}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <AppTextField
                    name='dateOfBirth'
                    fullWidth
                    label={<IntlMessages id='member.dateOfBirth' />}
                    type='date'
                    InputLabelProps={{shrink: true}}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <AppTextField
                    name='age'
                    fullWidth
                    label={<IntlMessages id='member.age' />}
                    type='number'
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <AppTextField
                    name='gender'
                    fullWidth
                    label={<IntlMessages id='member.gender' />}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <AppTextField
                    name='address'
                    fullWidth
                    label={<IntlMessages id='member.address' />}
                    multiline
                    rows={3}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <AppTextField
                    name='city'
                    fullWidth
                    label={<IntlMessages id='member.city' />}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <AppTextField
                    name='postcode'
                    fullWidth
                    label={<IntlMessages id='member.postcode' />}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <AppTextField
                    name='states'
                    fullWidth
                    label={<IntlMessages id='member.states' />}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <AppTextField
                    name='mobileNumber'
                    fullWidth
                    label={<IntlMessages id='member.mobileNumber' />}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <AppTextField
                    name='emailAddress'
                    fullWidth
                    label={<IntlMessages id='member.emailAddress' />}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <AppTextField
                      name="howDidYouHearAboutUs"
                      fullWidth
                      label={<IntlMessages id="member.howDidYouHearAboutUs" />}
                      select
                      onChange={handleHowDidYouHearAboutUs}
                    >
                      <MenuItem value ="Family"><IntlMessages id="member.family" /></MenuItem>
                      <MenuItem value ="Friend"><IntlMessages id="member.friend" /></MenuItem>
                      <MenuItem value ="Facebook"><IntlMessages id="member.facebook" /></MenuItem>
                      <MenuItem value ="Advertisement"><IntlMessages id="member.advertisement" /></MenuItem>
                      <MenuItem value ="Anran Outlet"><IntlMessages id="member.anranOutlet" /></MenuItem>
                      <MenuItem value ="Others"><IntlMessages id="member.others" /></MenuItem>
                    </AppTextField>
                </Grid>
              </AppGridContainer>
            </CardContent>
          </Card>

          <Box sx={{ mt: 3 }}></Box>

          <Card variant='outlined' sx={{mt: 2}}>
            <CardHeader
              sx={{p:0, mt:2, ml:2}}
              title={
                <Box
                  component='h6'
                  sx={{
                    fontSize: 14,
                    fontWeight: Fonts.SEMI_BOLD,
                    mt: 0,
                    mb: 1,
                  }}
                >
                  <IntlMessages id='member.MedicalDetails' />
                </Box>
              }
            ></CardHeader>
            <CardContent>
              <AppGridContainer spacing={5}>
                <Grid item xs={12} md={12}>
                  <AppTextField
                    name='medicalHistory'
                    fullWidth
                    label={<IntlMessages id='member.medicalHistory' />}
                    multiline
                    rows={5}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <Box sx={{display: 'flex', flexDirectoin:'collumn'}}>
                    <Grid item xs={12} md={12}>
                      <FormLabel component="legend" sx={{mb: 5}}>Do you have or have you suffered from any of the following?</FormLabel>
                      <FormGroup>
                        {conditionsList.map((condition) => (
                        <FormControlLabel
                          sx={{mb:{xs: 2, xl: 3}, ml: 0, mt: -3}}
                          key={condition}
                          control={
                            <Checkbox
                              name={condition}
                              checked={selectedConditions.includes(condition)}
                              onChange={handleCheckboxChange}
                            />
                          }
                          label={condition}
                        />
                        ))}
                      </FormGroup>
                      <Box mt={2}>
                        {selectedConditions.join(", ")}
                      </Box>
                    </Grid>
                  </Box>
                </Grid>
                <Grid item xs={12} md={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={understandAboveInformation}
                        onChange={(e) => setUnderstandAboveInformation(e.target.checked)}
                        name="understandAboveInformation"
                      />
                    }
                    label={<IntlMessages id="member.understandAboveInformation" />}
                  />
                </Grid>
              </AppGridContainer>
            </CardContent>
          </Card>

          <Box sx={{ mt: 3 }}></Box>

          <Card variant='outlined' sx={{mt: 2}}>
            <CardHeader
              sx={{p:0, mt:2, ml:2}}
              title={
                <Box
                    component='h6'
                    sx={{
                    fontSize: 14,
                    fontWeight: Fonts.SEMI_BOLD,
                    mt: 0,
                    mb: 1,
                  }}
                >
                  <IntlMessages id='member.EmergencyDetails' />
                </Box>
              }
            ></CardHeader>
            <CardContent>
              <AppGridContainer spacing={5}>
                <Grid item xs={12} md={9}>
                  <AppTextField
                    name='emergencyContactName'
                    fullWidth
                    label={<IntlMessages id='member.emergencyContactName' />}
                  />
                </Grid>
                <Grid item xs={12} md={9}>
                  <AppTextField
                    name='emergencyContactMobileNumber'
                    fullWidth
                    label={<IntlMessages id='member.emergencyContactMobileNumber' />}
                  />
                </Grid>
                <Grid item xs={12} md={9}>
                  <AppTextField
                    name='emergencyContactRelationship'
                    fullWidth
                    label={<IntlMessages id='member.emergencyContactRelationship' />}
                  />
                </Grid>
              </AppGridContainer>
            </CardContent>
          </Card>

        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Button
          sx={{
            position: 'relative',
            minWidth: 100,
          }}
          color='primary'
          variant='contained'
          type='submit'
        >
          <IntlMessages id='common.save' />
        </Button>
      </Box>
    </Form>
  );
}
export default AddMemberForm;

AddMemberForm.propTypes = {
    setFieldValue: PropTypes.func,
    values: PropTypes.object,
    errors: PropTypes.object,
    selectedChildren: PropTypes.array,
};