import React, { useState, useEffect } from 'react';
import {
  Box, Button, Card, CardContent, CardHeader, MenuItem, Grid
} from '@mui/material';
import AppGridContainer from '@enjoey/core/AppGridContainer';
import AppTextField from '@enjoey/core/AppFormComponents/AppTextField';
import IntlMessages from '@enjoey/utility/IntlMessages';
import { Form } from 'formik';
import PropTypes from 'prop-types';
import { Fonts } from 'shared/constants/AppEnums';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
    fullName: Yup.string().required('Required'),
    preferredName: Yup.string().required('Required'),
    chineseName: Yup.string().required('Required'),
    nricPassport: Yup.string().required('Required'),
    dateOfBirth: Yup.date().required('Required'),
    age: Yup.number().required('Required'),
    gender: Yup.string().required('Required'),
    address: Yup.string().required('Required'),
    city: Yup.string().required('Required'),
    postcode: Yup.string().required('Required'),
    states: Yup.string().required('Required'),
    mobileNumber: Yup.string().required('Required'),
    emailAddress: Yup.string().required('Required'),
    howDidYouHearAboutUs: Yup.string().required('Required'),
    emergencyContactName: Yup.string().required('Required'),
    emergencyContactMobileNumber: Yup.string().required('Required'),
    emergencyContactRelationship: Yup.string().required('Required'),
  });

const MemberPersonal = () => {
  // console.log('formData', formData);
  // const [memberPersonal, setMemberPersonal] = useState(formData.memberPersonal || {});

  // useEffect(() => {
  //   // Initialize form data from context
  //   setMemberPersonal(formData.memberPersonal || {});
  // }, [formData]);

  // useEffect(() => {
  //   // Update context when component unmounts
  //   return () => {
  //     updateFormData('memberPersonal', memberPersonal);
  //   };
  // }, [memberPersonal, updateFormData]);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setMemberPersonal((prevInfo) => ({ ...prevInfo, [name]: value }));
  // };

  // Form submission handler
  // const handleSubmit = (values) => {
  //   updateFormData('memberPersonal', values);
  //   console.log('Form Submitted: ', values);
  //   handleNext(); // Move to the next step after successful submission
  // };

  // Handle How Did You Hear About Us
  const [howDidYouHearAboutUs, setHowDidYouHearAboutUs] = React.useState('new');
  const handleHowDidYouHearAboutUs = (event) => {
    setHowDidYouHearAboutUs(event.target.value);
  }

  return (
    <Formik
      validationSchema={validationSchema}
      onSubmit={(data) => handleSubmit(data)}
    >
      {({ values, setFieldValue, errors, touched }) => (
    <Form noValidate autoComplete="off">
      <Box sx={{ padding: 5, ml: -6, mr: -6 }}>
        <Box sx={{ pb: 5, px: 5, mb: 5, borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
          <Card variant="outlined" sx={{ mt: 2 }}>
            <CardHeader
              sx={{ p: 0, mt: 2, ml: 2 }}
              title={
                <Box component="h6" sx={{ fontSize: 14, fontWeight: Fonts.SEMI_BOLD, mt: 0, mb: 1 }}>
                  <IntlMessages id="member.PersonalDetails" />
                </Box>
              }
            />
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
        </Box>
      </Box>
    </Form>
    )}
    </Formik>
  );
};

MemberPersonal.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
};

export default MemberPersonal;