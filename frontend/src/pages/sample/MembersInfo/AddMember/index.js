import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CardHeader from './CardHeader';
import {Formik} from 'formik';
import * as yup from 'yup';
import AddMemberForm from './AddMemberForm';
import {useInfoViewActionsContext} from '@enjoey/utility/AppContextProvider/InfoViewContextProvider';
import { postDataApi } from '@enjoey/utility/APIHooks';
import AppDialog from '@enjoey/core/AppDialog';

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


const AddMember = ({isOpen, setOpenDialog, reCallAPI}) => {
    const infoViewActionsContext = useInfoViewActionsContext();

    return (
        <Box flex={1}>
            <AppDialog
                dividers
                maxWidth='md'
                open={isOpen}
                hideClose
                title={
                    <CardHeader
                        onCloseAddCard={() => setOpenDialog(false)}
                        title={'Create New Member'}
                    />
                }
                >
                <Formik
                    validateonBlur={true}
                    initialValues={{
                        registrationDate: '',
                        membershipStatus: '',
                        name: '',
                        existingMobileNumber: '',
                        branch: '',
                        paymentMethod: '',

                        fullName: '',
                        preferredName: '',
                        chineseName: '',
                        nricPassport: '',
                        dateOfBirth: '',
                        age: '',
                        gender: '',
                        address: '',
                        city: '',
                        postcode: '',
                        states: '',
                        mobileNumber: '',
                        emailAddress: '',
                        howDidYouHearAboutUs: '',

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

                        emergencyContactName: '',
                        emergencyContactMobileNumber: '',
                        emergencyContactRelationship: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(data, {setSubmitting}) => {
                        setSubmitting(true);
                        postDataApi(
                            'api/members',
                            infoViewActionsContext,
                            data,
                            false,
                            false,
                            {
                                'Content-Type': 'application/json',
                            },
                        )
                        .then (() => {
                            reCallAPI();
                            infoViewActionsContext.showMessage('successfully!');
                        })
                        .catch((error) => {
                            infoViewActionsContext.fetchError(error.message);
                        })
                        setSubmitting(false);
                    }}
                >
                    {({values, errors, setFieldValue}) => {
                        return (
                            <AddMemberForm
                                values={values}
                                errors={errors}
                                setFieldValue={setFieldValue}
                                isViewOnly={false}
                            />
                        );
                    }}
                </Formik>
            </AppDialog>
        </Box>
    );
};

export default AddMember;

AddMember.propTypes = {
    reCallAPI: PropTypes.func,
    isOpen: PropTypes.bool,
    isViewOnly: PropTypes.bool,
    setOpenDialog: PropTypes.func,
};