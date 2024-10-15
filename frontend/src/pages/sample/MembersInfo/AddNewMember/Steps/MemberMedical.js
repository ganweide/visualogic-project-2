import React, {useContext} from 'react';
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
import { FormContext } from '../../AddNewMember';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { postDataApi } from '@enjoey/utility/APIHooks';
import { useInfoViewActionsContext } from '@enjoey/utility/AppContextProvider/InfoViewContextProvider';

const validationSchema = Yup.object({
  MB_MC_medical_history: Yup.string(),
  MB_MC_recent_operation: Yup.boolean(),
  MB_MC_severe_heart_disease: Yup.boolean(),
  MB_MC_severe_circulatory_problems: Yup.boolean(),
  MB_MC_cardiac_pacemaker: Yup.boolean(),
  MB_MC_cancer_treatment: Yup.boolean(),
  MB_MC_severe_high_blood_pressure: Yup.boolean(),
  MB_MC_skin_disease: Yup.boolean(),
  MB_MC_viral_infection: Yup.boolean(),
  MB_MC_fever: Yup.boolean(),
  MB_MC_recent_scars: Yup.boolean(),
  MB_MC_pregnancy_during_period: Yup.boolean(),
  MB_MC_none_of_the_above: Yup.boolean(),
  // conditions: Yup.array().required('Please select at least one condition'),
  MB_MC_consent: Yup.boolean().required('Required'),
});

const MemberMedical = () => {
  const { formData, activeStep, setActiveStep, setFormData, setOpenDialog } = useContext(FormContext);
  console.log('formData', formData);
  const infoViewActionsContext = useInfoViewActionsContext();
  // const [selectedConditions, setSelectedConditions] = React.useState([]);
  // const [understandAboveInformation, setUnderstandAboveInformation] = React.useState(false);

  // // Handle Checkbox Change for Conditions
  // const handleCheckboxChange = (e) => {
  // const { name } = e.target;
  //   if (selectedConditions.includes(name)) {
  //     setSelectedConditions(
  //       selectedConditions.filter((condition) => condition !== name)
  //     );
  //   } else {
  //     setSelectedConditions([...selectedConditions, name]);
  //   }
  // };

  // const conditionsList = [
  //     "Recent Operation",
  //     "Severe Heart Disease",
  //     "Severe Circulatory Problems",
  //     "Cardiac Pacemaker",
  //     "Cancer/Cancer Treatment (Chemo/Targeted Therapy)",
  //     "Severe High Blood Pressure",
  //     "Skin Disease",
  //     "Viral Infection",
  //     "Fever",
  //     "Recent Scars",
  //     "Pregnancy",
  //     "During Period",
  //     "None of the Above"
  //   ];

    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
      <Formik
        initialValues={{
          MB_MC_medical_history: formData?.MB_MC_medical_history ? formData.MB_MC_medical_history : '',
          MB_MC_recent_operation: formData?.MB_MC_recent_operation ? formData.MB_MC_recent_operation : false,
          MB_MC_severe_heart_disease: formData?.MB_MC_severe_heart_disease ? formData.MB_MC_severe_heart_disease : false,
          MB_MC_severe_circulatory_problems: formData?.MB_MC_severe_circulatory_problems ? formData.MB_MC_severe_circulatory_problems : false,
          MB_MC_cardiac_pacemaker: formData?.MB_MC_cardiac_pacemaker ? formData.MB_MC_cardiac_pacemaker : false,
          MB_MC_cancer_treatment: formData?.MB_MC_cancer_treatment ? formData.MB_MC_cancer_treatment : false,
          MB_MC_severe_high_blood_pressure: formData?.MB_MC_severe_high_blood_pressure ? formData.MB_MC_severe_high_blood_pressure : false,
          MB_MC_skin_disease: formData?.MB_MC_skin_disease ? formData.MB_MC_skin_disease : false,
          MB_MC_viral_infection: formData?.MB_MC_viral_infection ? formData.MB_MC_viral_infection : false,
          MB_MC_fever: formData?.MB_MC_fever ? formData.MB_MC_fever : false,
          MB_MC_recent_scars: formData?.MB_MC_recent_scars ? formData.MB_MC_recent_scars : false,
          MB_MC_pregnancy_during_period: formData?.MB_MC_pregnancy_during_period ? formData.MB_MC_pregnancy_during_period : false,
          MB_MC_none_of_the_above: formData?.MB_MC_none_of_the_above ? formData.MB_MC_none_of_the_above : false,
          MB_MC_consent: formData?.MB_MC_consent ? formData.MB_MC_consent : false,
          // medicalHistory: formData?.medicalHistory ?? '',
          // conditions: [],
          // understandAboveInformation: formData?.understandAboveInformation ?? false,          
        }}
        validationSchema={validationSchema}
        onSubmit={(data) => {
          console.log('***************', data);
          const consolidatedData = {
          ...formData,
          ...data,
          };
          setFormData(consolidatedData);
          postDataApi(
            'http://localhost:5000/api/members/',
            infoViewActionsContext,
            consolidatedData,
            false,
            {
              'Content-Type': 'multipart/form-data',
            },
          )
            .then(() => {
              setOpenDialog(false);
              setFormData(null);
            })
            .catch((error) => {
              infoViewActionsContext.fetchError(error.message);
            });
        }}
      >
        {({values}) => (
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
                        <IntlMessages id='member.MedicalDetails' />
                      </Box>
                    }
                  ></CardHeader>
                  <CardContent>
                    <AppGridContainer spacing={5}>
                      <Grid item xs={12} md={12}>
                        <AppTextField
                          name='MB_MC_medical_history'
                          fullWidth
                          label={<IntlMessages id='member.medicalHistory' />}
                          multiline
                          rows={5}
                        />
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <Box sx={{display: 'flex', flexDirectoin: 'collumn'}}>
                        <Grid item xs={12} md={12}>
                          <FormLabel component="legend" sx={{ mb: 5 }}>
                            Do you have or have you suffered from any of the following?
                          </FormLabel>
                          <Grid item xs={12} md={12}>
                            <FormControlLabel
                              control={
                                <Field
                                  type="checkbox"
                                  as={Checkbox}
                                  name="MB_MC_recent_operation"
                                  checked={values.MB_MC_recent_operation} // Bind to Formik
                                />
                              }
                              label={<IntlMessages id="member.recentOperation" />}
                            />
                          </Grid>
                          <Grid item xs={12} md={12}>
                            <FormControlLabel
                              control={
                                <Field
                                  type="checkbox"
                                  as={Checkbox}
                                  name="MB_MC_severe_heart_disease"
                                  checked={values.MB_MC_severe_heart_disease} // Bind to Formik
                                />
                              }
                              label={<IntlMessages id="member.severeHeartDisease" />}
                            />
                          </Grid>
                          <Grid item xs={12} md={12}>
                            <FormControlLabel
                              control={
                                <Field
                                  type="checkbox"
                                  as={Checkbox}
                                  name="MB_MC_severe_circulatory_problems"
                                  checked={values.MB_MC_severe_circulatory_problems} // Bind to Formik
                                />
                              }
                              label={<IntlMessages id="member.severeCirculatoryProblems" />}
                            />
                          </Grid>
                          <Grid item xs={12} md={12}>
                            <FormControlLabel
                              control={
                                <Field
                                  type="checkbox"
                                  as={Checkbox}
                                  name="MB_MC_cardiac_pacemaker"
                                  checked={values.MB_MC_cardiac_pacemaker} // Bind to Formik
                                />
                              }
                              label={<IntlMessages id="member.cardiacPacemaker" />}
                            />
                          </Grid>
                          <Grid item xs={12} md={12}>
                            <FormControlLabel
                              control={
                                <Field
                                  type="checkbox"
                                  as={Checkbox}
                                  name="MB_MC_cancer_treatment"
                                  checked={values.MB_MC_cancer_treatment} // Bind to Formik
                                />
                              }
                              label={<IntlMessages id="member.cancer" />}
                            />
                          </Grid>
                          <Grid item xs={12} md={12}>
                            <FormControlLabel
                              control={
                                <Field
                                  type="checkbox"
                                  as={Checkbox}
                                  name="MB_MC_severe_high_blood_pressure"
                                  checked={values.MB_MC_severe_high_blood_pressure} // Bind to Formik
                                />
                              }
                              label={<IntlMessages id="member.severeHighBloodPressure" />}
                            />
                          </Grid>
                          <Grid item xs={12} md={12}>
                            <FormControlLabel
                              control={
                                <Field
                                  type="checkbox"
                                  as={Checkbox}
                                  name="MB_MC_skin_disease"
                                  checked={values.MB_MC_skin_disease} // Bind to Formik
                                />
                              }
                              label={<IntlMessages id="member.skinDisease" />}
                            />
                          </Grid>
                          <Grid item xs={12} md={12}>
                            <FormControlLabel
                              control={
                                <Field
                                  type="checkbox"
                                  as={Checkbox}
                                  name="MB_MC_viral_infection"
                                  checked={values.MB_MC_viral_infection} // Bind to Formik
                                />
                              }
                              label={<IntlMessages id="member.viralInfection" />}
                            />
                          </Grid>
                          <Grid item xs={12} md={12}>
                            <FormControlLabel
                              control={
                                <Field
                                  type="checkbox"
                                  as={Checkbox}
                                  name="MB_MC_fever"
                                  checked={values.MB_MC_fever} // Bind to Formik
                                />
                              }
                              label={<IntlMessages id="member.fever" />}
                            />
                          </Grid>
                          <Grid item xs={12} md={12}>
                            <FormControlLabel
                              control={
                                <Field
                                  type="checkbox"
                                  as={Checkbox}
                                  name="MB_MC_recent_scars"
                                  checked={values.MB_MC_recent_scars} // Bind to Formik
                                />
                              }
                              label={<IntlMessages id="member.recentScars" />}
                            />
                          </Grid>
                          <Grid item xs={12} md={12}>
                            <FormControlLabel
                              control={
                                <Field
                                  type="checkbox"
                                  as={Checkbox}
                                  name="MB_MC_pregnancy_during_period"
                                  checked={values.MB_MC_pregnancy_during_period} // Bind to Formik
                                />
                              }
                              label={<IntlMessages id="member.pregnancy" />}
                            />
                          </Grid>
                          <Grid item xs={12} md={12}>
                            <FormControlLabel
                              control={
                                <Field
                                  type="checkbox"
                                  as={Checkbox}
                                  name="MB_MC_none_of_the_above"
                                  checked={values.MB_MC_none_of_the_above} // Bind to Formik
                                />
                              }
                              label={<IntlMessages id="member.noneOfTheAbove" />}
                            />
                          </Grid>
                        </Grid>
                          {/* <Grid item xs={12} md={12}>
                            <FormLabel component="legend" sx={{ mb: 5 }}>
                              Do you have or have you suffered from any of the following?
                            </FormLabel>
                            <FormGroup>
                              {conditionsList.map((condition) => (
                                <FormControlLabel
                                  key={condition}
                                  control={
                                    <Field
                                      type="checkbox"
                                      as={Checkbox}
                                      name="conditions"
                                      value={condition}
                                    />
                                  }
                                  label={condition}
                                />
                              ))}
                            </FormGroup>
                            <Box mt={2}>{values.conditions.join(', ')}</Box>
                          </Grid> */}
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <FormControlLabel
                          control={
                            <Field
                              type="checkbox"
                              as={Checkbox}
                              name="MB_MC_consent"
                              checked={values.MB_MC_consent} // Bind to Formik
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
  
            <Button type='submit'>{'Submit'}</Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};
  
MemberMedical.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
};
  
export default MemberMedical;