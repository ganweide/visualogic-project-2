import React, {useState} from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import CardHeader from "./CardHeader";
import { Formik } from "formik";
import * as yup from "yup";
import MemberDetailsForm from "./MemberDetailsForm";
import {useInfoViewActionsContext} from '@enjoey/utility/AppContextProvider/InfoViewContextProvider';
import {putDataApi} from '@enjoey/utility/APIHooks';

const validationSchema = yup.object({
    MB_registration_date: yup.date().required('Required'),
    MB_status_new: yup.string().required('Required'),
    MB_full_name: yup.string().required('Required'),
    MB_mobile_number: yup.string(),
    MB_preferred_branch: yup.string().required('Required'),
    MB_payment_method: yup.string().required('Required'),
    MB_full_name: yup.string().required('Required'),
    MB_preferred_name: yup.string().required('Required'),
    MB_chinese_name: yup.string().required('Required'),
    MB_IC_number: yup.string().required('Required'),
    MB_dob: yup.date().required('Required'),
    MB_age: yup.number().required('Required'),
    MB_gender: yup.string().required('Required'),
    MB_address: yup.string().required('Required'),
    MB_city: yup.string().required('Required'),
    MB_postcode: yup.string().required('Required'),
    MB_states: yup.string().required('Required'),
    MB_mobile_number: yup.string().required('Required'),
    MB_email: yup.string().required('Required'),
    MB_suggested_by: yup.string().required('Required'),
    MB_MC_medical_history: yup.string(),
    MB_MC_recent_operation: yup.boolean(),
    MB_MC_severe_heart_disease: yup.boolean(),
    MB_MC_severe_circulatory_problems: yup.boolean(),
    MB_MC_cardiac_pacemaker: yup.boolean(),
    MB_MC_cancer_treatment: yup.boolean(),
    MB_MC_severe_high_blood_pressure: yup.boolean(),
    MB_MC_skin_disease: yup.boolean(),
    MB_MC_viral_infection: yup.boolean(),
    MB_MC_fever: yup.boolean(),
    MB_MC_recent_scars: yup.boolean(),
    MB_MC_pregnancy_during_period: yup.boolean(),
    MB_MC_none_of_the_above: yup.boolean(),
    MB_MC_consent: yup.boolean().required('Required'),
    MB_EC_name: yup.string().required('Required'),
    MB_EC_mobile_number: yup.string().required('Required'),
    MB_EC_relationship: yup.string().required('Required'),
});

const MemberDetails = ({rawData, reCallAPI}) => {
  if (!rawData || !rawData.MB_registration_date) {
    return <div>Error: Member data is missing.</div>;
  }
  console.log('MemberDetails', rawData);
  const infoViewActionsContext = useInfoViewActionsContext();

  const [isViewOnly, onViewOnly] = useState(true);

  return(
      <>
          <CardHeader
              isViewOnly={isViewOnly}
              onViewOnly={onViewOnly}
              member={rawData}
          />

          <Box
              sx={{
                  position: 'relative',
                  Width: '100%',
                  mt: 5,
              }}
          >
              <Formik
                  validateOnBlur={true}
                  initialValues={{
                    MB_registration_date: rawData.MB_registration_date || '',
                    MB_status_new: rawData.MB_status_new || '',
                    MB_full_name: rawData.MB_full_name || '',
                    MB_mobile_number: rawData.MB_mobile_number || '',
                    MB_preferred_branch: rawData.MB_preferred_branch || '',
                    MB_payment_method: rawData.MB_payment_method || '',
                    MB_preferred_name: rawData.MB_preferred_name || '',
                    MB_chinese_name: rawData.MB_chinese_name || '',
                    MB_IC_number: rawData.MB_IC_number || '',
                    MB_dob: rawData.MB_dob || '',
                    MB_age: rawData.MB_age || '',
                    MB_gender: rawData.MB_gender || '',
                    MB_address: rawData.MB_address || '',
                    MB_city: rawData.MB_city || '',
                    MB_postcode: rawData.MB_postcode || '',
                    MB_states: rawData.MB_states || '',
                    MB_mobile_number: rawData.MB_mobile_number || '',
                    MB_email: rawData.MB_email || '',
                    MB_suggested_by: rawData.MB_suggested_by || '',
                    MB_MC_medical_history: rawData.MB_MC_medical_history || '',
                    MB_MC_recent_operation: rawData.MB_MC_recent_operation || false,
                    MB_MC_severe_heart_disease: rawData.MB_MC_severe_heart_disease || false,
                    MB_MC_severe_circulatory_problems: rawData.MB_MC_severe_circulatory_problems || false,
                    MB_MC_cardiac_pacemaker: rawData.MB_MC_cardiac_pacemaker || false,
                    MB_MC_cancer_treatment: rawData.MB_MC_cancer_treatment || false,
                    MB_MC_severe_high_blood_pressure: rawData.MB_MC_severe_high_blood_pressure || false,
                    MB_MC_skin_disease: rawData.MB_MC_skin_disease || false,
                    MB_MC_viral_infection: rawData.MB_MC_viral_infection || false,
                    MB_MC_fever: rawData.MB_MC_fever || false,
                    MB_MC_recent_scars: rawData.MB_MC_recent_scars || false,
                    MB_MC_pregnancy_during_period: rawData.MB_MC_pregnancy_during_period || false,
                    MB_MC_none_of_the_above: rawData.MB_MC_none_of_the_above || false,
                    MB_MC_consent: rawData.MB_MC_consent || false,
                    MB_EC_name: rawData.MB_EC_name || '',
                    MB_EC_mobile_number: rawData.MB_EC_mobile_number || '',
                    MB_EC_relationship: rawData.MB_EC_relationship || '',
                  }}
                  validationSchema={validationSchema}
                  onSubmit={(data, {setSubmitting}) => {
                      setSubmitting(true);
                      const formData = new FormData();
                      for (var key in data) {
                          formData.append(key, data[key]);
                      }
                      putDataApi(
                          `http://localhost:5000/api/members/${rawData._id}`,
                          infoViewActionsContext,
                          formData,
                          false,
                          {
                              'Content-Type': 'multipart/form-data',
                          },
                      )
                      .then(()=> {
                          onViewOnly(true);
                          infoViewActionsContext.showMessage(
                              'Member updated successfully',
                          );
                          reCallAPI();
                      })
                      .catch((error) => {
                          infoViewActionsContext.fetchError(error.message);
                      });
                      setSubmitting(false);
                  }}
              >
                  {({values, setFieldValue, errors}) => {
                      return (
                          <MemberDetailsForm
                              values={values}
                              errors={errors}
                              setFieldValue={setFieldValue}
                              isViewOnly={isViewOnly}
                              onViewOnly={onViewOnly}
                              reCallAPI={reCallAPI}
                              member={rawData}
                          />
                      );
                  }}
              </Formik>
          </Box>
      </>
  );
};

export default MemberDetails;

MemberDetails.propTypes = {
  setFieldValue: PropTypes.func,
  values: PropTypes.string,
  rawData: PropTypes.object,
  reCallAPI: PropTypes.func,
};