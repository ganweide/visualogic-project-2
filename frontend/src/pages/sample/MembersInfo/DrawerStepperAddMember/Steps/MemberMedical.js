import React, {useState, useEffect} from 'react';
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
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  medicalHistory: Yup.string(),
  recentOperation: Yup.boolean(),
  severeHeartDisease: Yup.boolean(),
  severeCirculatoryProblems: Yup.boolean(),
  cardiacPacemaker: Yup.boolean(),
  cancer: Yup.boolean(),
  severeHighBloodPressure: Yup.boolean(),
  skinDisease: Yup.boolean(),
  viralInfection: Yup.boolean(),
  fever: Yup.boolean(),
  recentScars: Yup.boolean(),
  pregnancy: Yup.boolean(),
  understandAboveInformation: Yup.boolean().required('Required'),
});

const MemberMedical = () => {
  const [selectedConditions, setSelectedConditions] = React.useState([]);
  const [understandAboveInformation, setUnderstandAboveInformation] = React.useState(false);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setMemberMedical((prevInfo) => ({ ...prevInfo, [name]: value }));
  // };

  // Handle Checkbox Change
  const handleCheckboxChange = (e) => {
    const { name } = e.target;
    if (selectedConditions.includes(name)) {
      setSelectedConditions(selectedConditions.filter((condition) => condition !== name));
    } else {
      setSelectedConditions([...selectedConditions, name]);
    }
  };

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

    // // Form submission handler
    // const handleSubmit = (values) => {
    //   // You can update the context with the form values on submit
    //   updateFormData('memberValidation', values);
    //   console.log('Form Submitted: ', values);
    // };
  
    return (
      <Formik
        initialValues={{
          medicalHistory: '',
          recentOperation: false,
          severeHeartDisease: false,
          severeCirculatoryProblems: false,
          cardiacPacemaker: false,
          cancer: false,
          severeHighBloodPressure: false,
          skinDisease: false,
          viralInfection: false,
          fever: false,
          recentScars: false,
          pregnancy: false,
          understandAboveInformation: false,
        }}
        validationSchema={validationSchema}
        onSubmit={(data) => handleSubmit(data)}
      >
        {({ values, handleChange, errors, touched }) => (
    <Form noValidate autoComplete='off'>
      <Box sx={{ padding: 5, ml: -6, mr: -6 }}>
        <Box sx={{ pb: 5, px: 5, mb: 5, borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
          <Card variant='outlined' sx={{mt: 2}}>
            <CardHeader
              sx={{p:0, mt:2, ml:2}}
              title={
                <Box component='h6' sx={{ fontSize: 14, fontWeight: Fonts.SEMI_BOLD, mt: 0, mb: 1 }}>
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
        </Box>
      </Box>
    </Form>
        )}
    </Formik>
  );
}

MemberMedical.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
};

export default MemberMedical;
