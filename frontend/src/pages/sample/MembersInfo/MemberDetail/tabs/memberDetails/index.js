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
  registrationDate: yup.date().required('Required'),
  membershipStatus: yup.string().required('Required'),
  name: yup.string().required('Required'),
  existingMobileNumber: yup.string(),
  branch: yup.string().required('Required'),
  paymentMethod: yup.string().required('Required'),

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
  duringPeriod: yup.boolean(),
  noneOfTheAbove: yup.boolean(),
  othersSpecify: yup.boolean(),
  others: yup.string(),

  understandAboveInformation: yup.boolean().required('Required'),

  emergencyContactName: yup.string().required('Required'),
  emergencyContactMobileNumber: yup.string().required('Required'),
  emergencyContactRelationship: yup.string().required('Required'),
});

const MemberDetails = ({rawData, reCallAPI}) => {
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
                      registrationDate: rawData.registrationDate,
                      membershipStatus: rawData.membershipStatus,
                      name: rawData.name,
                      existingMobileNumber: rawData.existingMobileNumber,
                      branch: rawData.branch,
                      paymentMethod: rawData.paymentMethod,

                      fullName: rawData.fullName,
                      preferredName: rawData.preferredName,
                      chineseName: rawData.chineseName,
                      nricPassport: rawData.nricPassport,
                      dateOfBirth: rawData.dateOfBirth,
                      age: rawData.age,
                      gender: rawData.gender,
                      address: rawData.address,
                      city: rawData.city,
                      postcode: rawData.postcode,
                      states: rawData.states,
                      mobileNumber: rawData.mobileNumber,
                      emailAddress: rawData.emailAddress,
                      howDidYouHearAboutUs: rawData.howDidYouHearAboutUs,

                      medicalHistory: rawData.medicalHistory,
                      recentOperation: rawData.recentOperation,
                      severeHeartDisease: rawData.severeHeartDisease,
                      severeCirculatoryProblems: rawData.severeCirculatoryProblems,
                      cardiacPacemaker: rawData.cardiacPacemaker,
                      cancer: rawData.cancer,
                      severeHighBloodPressure: rawData.severeHighBloodPressure,
                      skinDisease: rawData.skinDisease,
                      viralInfection: rawData.viralInfection,
                      fever: rawData.fever,
                      recentScars: rawData.recentScars,
                      pregnancy: rawData.pregnancy,
                      duringPeriod: rawData.duringPeriod,
                      noneOfTheAbove: rawData.noneOfTheAbove,
                      othersSpecify: rawData.othersSpecify,
                      others: rawData.others,

                      understandAboveInformation: rawData.understandAboveInformation,
                      
                      emergencyContactName: rawData.emergencyContactName,
                      emergencyContactMobileNumber: rawData.emergencyContactMobileNumber,
                      emergencyContactRelationship: rawData.emergencyContactRelationship,
                  }}
                  validationSchema={validationSchema}
                  onSubmit={(data, {setSubmitting}) => {
                      setSubmitting(true);
                      const formData = new FormData();
                      for (var key in data) {
                          formData.append(key, data[key]);
                      }
                      putDataApi(
                          `api/member/${rawData.id}`,
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