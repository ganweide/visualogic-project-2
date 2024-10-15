import React, { useContext } from 'react';
import {
  Box, Button, Card, CardContent, CardHeader, MenuItem, Grid
} from '@mui/material';
import AppGridContainer from '@enjoey/core/AppGridContainer';
import AppTextField from '@enjoey/core/AppFormComponents/AppTextField';
import IntlMessages from '@enjoey/utility/IntlMessages';
import { Form } from 'formik';
import PropTypes from 'prop-types';
import { Fonts } from 'shared/constants/AppEnums';
import { FormContext } from '../../AddNewMember'; // Assuming the context is defined
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  MB_full_name: Yup.string().required('Required'),
  MB_preferred_name: Yup.string().required('Required'),
  MB_chinese_name: Yup.string().required('Required'),
  MB_IC_number: Yup.string().required('Required'),
  MB_dob: Yup.date().required('Required'),
  MB_age: Yup.number().required('Required'),
  MB_gender: Yup.string().required('Required'),
  MB_address: Yup.string().required('Required'),
  MB_city: Yup.string().required('Required'),
  MB_postcode: Yup.string().required('Required'),
  MB_states: Yup.string().required('Required'),
  MB_mobile_number: Yup.string().required('Required'),
  MB_email: Yup.string().required('Required'),
  MB_suggested_by: Yup.string().required('Required'),
  MB_EC_name: Yup.string().required('Required'),
  MB_EC_mobile_number: Yup.string().required('Required'),
  MB_EC_relationship: Yup.string().required('Required'),
});

const MemberPersonal = () => {
  const { formData, activeStep, setActiveStep, setFormData} = useContext(FormContext);

  // const [howDidYouHearAboutUs, setHowDidYouHearAboutUs] = React.useState('new');
  // const handleHowDidYouHearAboutUs = (event) => {
  //   setHowDidYouHearAboutUs(event.target.value);
  // };
  // console.log(howDidYouHearAboutUs);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Formik
    initialValues={{
      MB_full_name: formData?.MB_full_name ? formData.MB_full_name : '',
      MB_preferred_name: formData?.MB_preferred_name ? formData.MB_preferred_name : '',
      MB_chinese_name: formData?.MB_chinese_name ? formData.MB_chinese_name : '',
      MB_IC_number: formData?.MB_IC_number ? formData.MB_IC_number : '',
      MB_dob: formData?.MB_dob ? formData.MB_dob : '',
      MB_age: formData?.MB_age ? formData.MB_age : '',
      MB_gender: formData?.MB_gender ? formData.MB_gender : '',
      MB_address: formData?.MB_address ? formData.MB_address : '',
      MB_city: formData?.MB_city ? formData.MB_city : '',
      MB_postcode: formData?.MB_postcode ? formData.MB_postcode : '',
      MB_states: formData?.MB_states ? formData.MB_states : '',
      MB_mobile_number: formData?.MB_mobile_number ? formData.MB_mobile_number : '',
      MB_email: formData?.MB_email ? formData.MB_email : '',
      MB_suggested_by: formData?.MB_suggested_by ? formData.MB_suggested_by : '',
      MB_EC_name: formData?.MB_EC_name ? formData.MB_EC_name : '',
      MB_EC_mobile_number: formData?.MB_EC_mobile_number ? formData.MB_EC_mobile_number : '',
      MB_EC_relationship: formData?.MB_EC_relationship ? formData.MB_EC_relationship : '',
      // fullName: formData?.fullName ?? '',
      // preferredName: formData?.preferredName ?? '',
      // chineseName: formData?.chineseName ?? '',
      // nricPassport: formData?.nricPassport ?? '',
      // dateOfBirth: formData?.dateOfBirth ?? '',
      // age: formData?.age ?? '',
      // gender: formData?.gender ?? '',
      // address: formData?.address ?? '',
      // city: formData?.city ?? '',
      // postcode: formData?.postcode ?? '',
      // states: formData?.states ?? '',
      // mobileNumber: formData?.mobileNumber ?? '',
      // emailAddress: formData?.emailAddress ?? '',
      // howDidYouHearAboutUs: formData?.howDidYouHearAboutUs ?? '',
      // emergencyContactName: formData?.emergencyContactName ?? '',
      // emergencyContactMobileNumber: formData?.emergencyContactMobileNumber ?? '',
      // emergencyContactRelationship: formData?.emergencyContactRelationship ?? '',
    }}
      validationSchema={validationSchema}
      onSubmit={(data) => {
        console.log('***************', data);
        const consolidatedData = {
          ...formData,
          ...data,
        };
        setFormData(consolidatedData);
        setActiveStep(activeStep + 1);
      }}
    >
      {() => (
        <Form noValidate autoComplete='off'>
          <Box sx={{padding: 5, ml: -6, mr: -6}}>
            <Box
              sx={{
                pb: 5,
                px: 5,
                mb: 5,
                borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
              }}
            >
              <Card variant='outlined' sx={{mt: 2}}>
                <CardHeader
                  sx={{p: 0, mt: 2, ml: 2}}
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
                />
                <CardContent>
                  <AppGridContainer spacing={5}>
                    <Grid item xs={12} md={6}>
                      <AppTextField
                        name='MB_full_name'
                        fullWidth
                        label={<IntlMessages id='member.fullName' />}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <AppTextField
                        name='MB_preferred_name'
                        fullWidth
                        label={<IntlMessages id='member.preferredName' />}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <AppTextField
                        name='MB_chinese_name'
                        fullWidth
                        label={<IntlMessages id='member.chineseName' />}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <AppTextField
                        name='MB_IC_number'
                        fullWidth
                        label={<IntlMessages id='member.nricPassport' />}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <AppTextField
                        name='MB_dob'
                        fullWidth
                        label={<IntlMessages id='member.dateOfBirth' />}
                        type='date'
                        InputLabelProps={{shrink: true}}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <AppTextField
                        name='MB_age'
                        fullWidth
                        label={<IntlMessages id='member.age' />}
                        type='number'
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <AppTextField
                        name='MB_gender'
                        fullWidth
                        label={<IntlMessages id='member.gender' />}
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <AppTextField
                        name='MB_address'
                        fullWidth
                        label={<IntlMessages id='member.address' />}
                        multiline
                        rows={3}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <AppTextField
                        name='MB_city'
                        fullWidth
                        label={<IntlMessages id='member.city' />}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <AppTextField
                        name='MB_postcode'
                        fullWidth
                        label={<IntlMessages id='member.postcode' />}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <AppTextField
                        name='MB_states'
                        fullWidth
                        label={<IntlMessages id='member.states' />}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <AppTextField
                        name='MB_mobile_number'
                        fullWidth
                        label={<IntlMessages id='member.mobileNumber' />}
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <AppTextField
                        name='MB_email'
                        fullWidth
                        label={<IntlMessages id='member.emailAddress' />}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <AppTextField
                        name='MB_EC_name'
                        fullWidth
                        label={
                          <IntlMessages id='member.emergencyContactName' />
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <AppTextField
                        name='MB_EC_mobile_number'
                        fullWidth
                        label={
                          <IntlMessages id='member.emergencyContactMobileNumber' />
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <AppTextField
                        name='MB_EC_relationship'
                        fullWidth
                        label={
                          <IntlMessages id='member.emergencyContactRelationship' />
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <AppTextField
                        name='MB_suggested_by'
                        fullWidth
                        label={
                          <IntlMessages id='member.howDidYouHearAboutUs' />
                        }
                        select
                      >
                        <MenuItem value='Family'>
                          <IntlMessages id='member.family' />
                        </MenuItem>
                        <MenuItem value='Friend'>
                          <IntlMessages id='member.friend' />
                        </MenuItem>
                        <MenuItem value='Facebook'>
                          <IntlMessages id='member.facebook' />
                        </MenuItem>
                        <MenuItem value='Advertisement'>
                          <IntlMessages id='member.advertisement' />
                        </MenuItem>
                        <MenuItem value='Anran Outlet'>
                          <IntlMessages id='member.anranOutlet' />
                        </MenuItem>
                        <MenuItem value='Others'>
                          <IntlMessages id='member.others' />
                        </MenuItem>
                      </AppTextField>
                    </Grid>
                  </AppGridContainer>
                </CardContent>
              </Card>
            </Box>
          </Box>
          <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
            <Button
              color='inherit'
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{mr: 1}}
            >
              Back
            </Button>
            <Box sx={{flex: '1 1 auto'}} />

            <Button type='submit'>{'Next'}</Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default MemberPersonal;