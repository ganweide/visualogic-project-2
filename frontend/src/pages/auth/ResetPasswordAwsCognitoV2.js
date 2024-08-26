import React from 'react';
import {Form, Formik} from 'formik';
import * as yup from 'yup';

import {Fonts} from 'shared/constants/AppEnums';
import PropTypes from 'prop-types';
import AppTextField from '@enjoey/core/AppFormComponents/AppTextField';
import IntlMessages from '@enjoey/utility/IntlMessages';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AppInfoView from '@enjoey/core/AppInfoView';
import AuthWrapper from './AuthWrapper';
import AppLogo from '@enjoey/core/AppLayout/components/AppLogo';
import {useAuthMethod} from '@enjoey/utility/AuthHooks';

const validationSchema = yup.object({
  oldPassword: yup
    .string()
    .required(<IntlMessages id='validation.enterOldPassword' />),
  newPassword: yup
    .string()
    .required(<IntlMessages id='validation.enterNewPassword' />),
  confirmPassword: yup
    .string()
    .required(<IntlMessages id='validation.reTypePassword' />),
});

const ResetPasswordAwsCognito = () => {
  const {changePassword} = useAuthMethod();

  return (
    <AuthWrapper>
      <Box sx={{width: '100%'}}>
        <Box
          sx={{
            mb: 5,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <AppLogo />
        </Box>
        <Typography
          variant='h2'
          component='h2'
          sx={{
            mb: 1.5,
            color: (theme) => theme.palette.text.primary,
            fontWeight: Fonts.SEMI_BOLD,
            fontSize: {xs: 14, xl: 16},
          }}
        >
          <IntlMessages id='common.resetPassword' />
        </Typography>

        <Formik
          validateOnChange={true}
          initialValues={{
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(data, {setErrors, resetForm, setSubmitting}) => {
            if (data.newPassword !== data.confirmPassword) {
              setErrors({
                confirmPassword: (
                  <IntlMessages id='validation.passwordMisMatch' />
                ),
              });
            } else {
              setSubmitting(true);
              changePassword({
                newpwd: data.newPassword,
              });
              resetForm();
              setSubmitting(false);
            }
          }}
        >
          {({isSubmitting}) => (
            <Form noValidate autoComplete='off'>
              <Box
                sx={{
                  mb: {xs: 4, lg: 6},
                }}
              >
                <AppTextField
                  name='oldPassword'
                  label={<IntlMessages id='common.oldPassword' />}
                  sx={{
                    width: '100%',
                  }}
                  variant='outlined'
                  type='password'
                />
              </Box>

              <Box
                sx={{
                  mb: {xs: 4, lg: 6},
                }}
              >
                <AppTextField
                  name='newPassword'
                  label={<IntlMessages id='common.newPassword' />}
                  sx={{
                    width: '100%',
                  }}
                  variant='outlined'
                  type='password'
                />
              </Box>

              <Box
                sx={{
                  mb: {xs: 4, lg: 6},
                }}
              >
                <AppTextField
                  name='confirmPassword'
                  label={<IntlMessages id='common.retypePassword' />}
                  sx={{
                    width: '100%',
                  }}
                  variant='outlined'
                  type='password'
                />
              </Box>

              <Button
                variant='contained'
                disabled={isSubmitting}
                color='primary'
                type='submit'
                sx={{
                  fontWeight: Fonts.REGULAR,
                  textTransform: 'capitalize',
                  fontSize: 16,
                  minWidth: 160,
                }}
              >
                <IntlMessages id='common.resetMyPassword' />
              </Button>
            </Form>
          )}
        </Formik>
        <AppInfoView />
      </Box>
    </AuthWrapper>
  );
};

export default ResetPasswordAwsCognito;

ResetPasswordAwsCognito.propTypes = {
  location: PropTypes.object,
};
