import React from 'react';
import { 
  Box,
  FormGroup,
  FormLabel,
  Button,
} from '@mui/material';

import AppGridContainer from '@enjoey/core/AppGridContainer';
import Grid from '@mui/material/Grid';
import IntlMessages from '@enjoey/utility/IntlMessages';
import {Form} from 'formik';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import PropTypes from 'prop-types';
import AppTextField from '@enjoey/core/AppFormComponents/AppTextField';

import {Fonts} from 'shared/constants/AppEnums';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { useGetDataApi } from '@enjoey/utility/APIHooks';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { Field } from 'formik';

const MemberDetailsForm = ({
    values,
    setFieldValue,
    isViewOnly,
    onViewOnly,
}) => {
    const [{apiData: memberList}] = useGetDataApi(
        'http://localhost:5000/api/members',
        {},
        {},
        true,
    );

    const onCancelClick = () => {
        onViewOnly(true);
    };

    console.log('memberList', memberList);

    return (
        <>
            <Form noValidate autoComplete='off'>
                <Card variant='outlined' sx={{mt:2}}>
                    <CardHeader
                        sx={{p:0, mt:2,ml:2}}
                        title={
                            <Box
                                component='h6'
                                sx={{
                                    fontSize: 14,
                                    fontWeight: Fonts.SEMMI_BOLD,
                                    mt: 0,
                                    mb: 1,
                                }}
                            >
                                <IntlMessages id='memberDetails' />
                            </Box>
                        }
                    ></CardHeader>
                    <CardContent>
                      <AppGridContainer spacing={4}>
                        <Grid item xs={12} md={9}>
                          <AppTextField
                            name='MB_registration_date'
                            fullWidth
                            disabled={isViewOnly}
                            label={<IntlMessages id='member.RegistrationDate' />}
                            type='date'
                            InputLabelProps={{shrink: true}}
                          />
                        </Grid>
                        <Grid item xs={12} md={9}>
                        </Grid>
                        <Grid item xs={12} md={9}>
                          <AppTextField
                            name='MB_preferred_branch'
                            fullWidth
                            disabled={isViewOnly}
                            label={<IntlMessages id='member.branch' />}
                          />
                        </Grid>
                        <Grid item xs={12} md={12}>
                          <FormControl component="fieldset">
                            <FormLabel component="legend">Payment Method</FormLabel>
                            <RadioGroup
                              row
                              fullWidth
                              disabled={isViewOnly}
                              label={<IntlMessages id="member.PaymentMethod" />}
                              name="MB_payment_method"
                            >
                              <FormControlLabel value="One-off" control={<Radio />} label="Debit/Credit Card (One-off)" />
                              <FormControlLabel value="Installment" control={<Radio />} label="Debit/Credit Card (Installment)" />
                            </RadioGroup>
                          </FormControl>
                        </Grid>
                      </AppGridContainer>
                    </CardContent>
                </Card>

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
                    <AppGridContainer spacing={4}>
                      <Grid item xs={12} md={9}>
                        <AppTextField
                            name='MB_full_name'
                            fullWidth
                            disabled={isViewOnly}
                            label={<IntlMessages id='member.fullName' />}
                          />
                      </Grid>
                      <Grid item xs={12} md={9}>
                        <AppTextField
                            name='MB_preferred_name'
                            fullWidth
                            disabled={isViewOnly}
                            label={<IntlMessages id='member.preferredName' />}
                          />
                      </Grid>
                      <Grid item xs={12} md={9}>
                        <AppTextField
                            name='MB_chinese_name'
                            fullWidth
                            disabled={isViewOnly}
                            label={<IntlMessages id='member.chineseName' />}
                          />
                      </Grid>
                      <Grid item xs={12} md={9}>
                        <AppTextField
                            name='MB_IC_number'
                            fullWidth
                            disabled={isViewOnly}
                            label={<IntlMessages id='member.nricPassport' />}
                          />
                      </Grid>
                      <Grid item xs={12} md={9}>
                        <AppTextField
                            name='MB_dob'
                            fullWidth
                            disabled={isViewOnly}
                            label={<IntlMessages id='member.dateOfBirth' />}
                          />
                      </Grid>
                      <Grid item xs={12} md={9}>
                        <AppTextField
                            name='MB_age'
                            fullWidth
                            disabled={isViewOnly}
                            label={<IntlMessages id='member.age' />}
                          />
                      </Grid>
                      <Grid item xs={12} md={9}>
                        <AppTextField
                            name='MB_gender'
                            fullWidth
                            disabled={isViewOnly}
                            label={<IntlMessages id='member.gender' />}
                          />
                      </Grid>
                      <Grid item xs={12} md={9}>
                        <AppTextField
                            name='MB_address'
                            fullWidth
                            disabled={isViewOnly}
                            label={<IntlMessages id='member.address' />}
                          />
                      </Grid>
                      <Grid item xs={12} md={9}>
                        <AppTextField
                            name='MB_city'
                            fullWidth
                            disabled={isViewOnly}
                            label={<IntlMessages id='member.city' />}
                          />
                      </Grid>
                      <Grid item xs={12} md={9}>
                        <AppTextField
                            name='MB_postcode'
                            fullWidth
                            disabled={isViewOnly}
                            label={<IntlMessages id='member.postcode' />}
                          />
                      </Grid>
                      <Grid item xs={12} md={9}>
                        <AppTextField
                            name='MB_states'
                            fullWidth
                            disabled={isViewOnly}
                            label={<IntlMessages id='member.states' />}
                          />
                      </Grid>
                      <Grid item xs={12} md={9}>
                        <AppTextField
                            name='MB_mobile_number'
                            fullWidth
                            disabled={isViewOnly}
                            label={<IntlMessages id='member.mobileNumber' />}
                          />
                      </Grid>
                      <Grid item xs={12} md={9}>
                        <AppTextField
                            name='MB_email'
                            fullWidth
                            disabled={isViewOnly}
                            label={<IntlMessages id='member.emailAddress' />}
                          />
                      </Grid>
                      <Grid item xs={12} md={9}>
                      <AppTextField
                        name='MB_suggested_by'
                        fullWidth
                        disabled={isViewOnly}
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

                <Card variant='outlined' sx={{mt:2}}>
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
                    <AppGridContainer spacing={4}>
                    <Grid item xs={12} md={9}>
                        <AppTextField
                            name='medicalHistory'
                            fullWidth
                            disabled={isViewOnly}
                            label={<IntlMessages id='member.medicalHistory' />}
                            multiline
                            rows={5}
                          />
                      </Grid>
                      <Grid item xs={12} md={9}>
                        <Box sx={{display: 'flex', flexDirectoin:'collumn'}}>
                          <Grid item xs={12} md={12}>
                            <FormLabel component="legend" sx={{mb: 5}}>Do you have or have you suffered from any of the following?</FormLabel>
                            <Grid item xs={12} md={12}>
                            <FormControlLabel
                              control={
                                <Field
                                  type="checkbox"
                                  as={Checkbox}
                                  name="MB_MC_recent_operation"
                                  disabled={isViewOnly}
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
                                  disabled={isViewOnly}
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
                                  disabled={isViewOnly}
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
                                  disabled={isViewOnly}
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
                                  disabled={isViewOnly}
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
                                  disabled={isViewOnly}
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
                                  disabled={isViewOnly}
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
                                  disabled={isViewOnly}
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
                                  disabled={isViewOnly}
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
                                  disabled={isViewOnly}
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
                                  disabled={isViewOnly}
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
                                  disabled={isViewOnly}
                                  checked={values.MB_MC_none_of_the_above} // Bind to Formik
                                />
                              }
                              label={<IntlMessages id="member.noneOfTheAbove" />}
                            />
                          </Grid>
                          </Grid>
                        </Box>
                      </Grid>
                    </AppGridContainer>
                  </CardContent>
                </Card>

                <Card variant='outlined' sx={{mt:2}}>
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
                    <AppGridContainer spacing={4}>
                      <Grid item xs={12} md={9}>
                        <AppTextField
                          name='MB_EC_name'
                          fullWidth
                          disabled={isViewOnly}
                          label={<IntlMessages id='member.emergencyContactName' />}
                        />
                      </Grid>
                      <Grid item xs={12} md={9}>
                        <AppTextField
                            name='MB_EC_mobile_number'
                            fullWidth
                            disabled={isViewOnly}
                            label={<IntlMessages id='member.emergencyContactMobileNumber' />}
                          />
                      </Grid>
                      <Grid item xs={12} md={9}>
                        <AppTextField
                            name='MB_EC_relationship'
                            fullWidth
                            disabled={isViewOnly}
                            label={<IntlMessages id='member.emergencyContactRelationship' />}
                          />
                      </Grid>
                    </AppGridContainer>
                  </CardContent>
                </Card>

                <AppGridContainer spacing={4} sx={{mt: 4}}>
                  {isViewOnly ? null : (
                    <Grid item xs={12} md={12}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          alignContent: 'center',
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
                          <IntlMessages id='common.saveChanges' />
                        </Button>
                        <Button
                          sx={{
                            position: 'relative',
                            minWidth: 100,
                            ml: 2.5,
                          }}
                          color='primary'
                          variant='outlined'
                          type='button'
                          onClick={onCancelClick}
                        >
                          <IntlMessages id='common.cancel' />
                        </Button>
                      </Box>
                    </Grid>
                  )}
                </AppGridContainer>

            </Form>
        </>
    );
};

export default MemberDetailsForm;

MemberDetailsForm.propTypes={
  setFieldValue: PropTypes.func,
  values: PropTypes.object,
  error: PropTypes.object,
  isViewOnly: PropTypes.bool,
  onViewOnly: PropTypes.func,
  reCallAPI: PropTypes.func,
  member: PropTypes.object,
};