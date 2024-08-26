import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import {Form, Formik} from 'formik';
import * as yup from 'yup';
import {Link, useNavigate} from 'react-router-dom';
import {useIntl} from 'react-intl';
import AppTextField from '@enjoey/core/AppFormComponents/AppTextField';
import IntlMessages from '@enjoey/utility/IntlMessages';
import { InputAdornment } from '@mui/material';
import AppInfoView from '@enjoey/core/AppInfoView';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Button,
  IconButton,
  Checkbox,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography,
} from "@mui/material";

import {useAuthMethod, useAuthUser} from '@enjoey/utility/AuthHooks';
import {Fonts} from 'shared/constants/AppEnums';
import {AiOutlineGoogle} from 'react-icons/ai';
import {FaFacebookF} from 'react-icons/fa';

const validationSchema = yup.object({
  email: yup
    .string()
    .email(<IntlMessages id='validation.emailFormat' />)
    .required(<IntlMessages id='validation.emailRequired' />),
  password: yup
    .string()
    .required(<IntlMessages id='validation.passwordRequired' />),
});

const appointmentUrl  = "http://localhost:8000/api/appointment/";
const timeSlotUrl     = "http://localhost:8000/api/appointment-time-slots/";
const branchUrl       = "http://localhost:8000/api/branch/";

const SigninAwsCognito = () => {
  const {auth}                                          = useAuthUser();
  const {signIn}                                        = useAuthMethod();
  const navigate                                        = useNavigate();
  const [showPassword, setShowPassword]                 = useState(false);
  const [makeAppointment, setMakeAppointment]           = useState(false);
  const [appointmentTimeSlots, setAppointmentTimeSlots] = useState([]);
  const [branchData, setBranchData]                     = useState([]);
  const [filteredTimeSlots, setFilteredTimeSlots]       = useState([]);
  const [filteredBranch, setFilteredBranch]               = useState([]);
  const [date, setDate]                                 = useState("");
  const [time, setTime]                                 = useState("");
  const [branch, setBranch]                             = useState("");
  const [phone, setPhone]                               = useState("");
  const [name, setName]                                 = useState("");
  const [ageInterest, setAgeInterest]                   = useState("");

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onGoToForgetPassword = () => {
    navigate('/forget-password', {tab: 'awsCognito'});
  };

  const {messages} = useIntl();

  useEffect(() => {
    try {
      Axios.get(timeSlotUrl).then((response) => {
        setAppointmentTimeSlots(response.data);
      });
      Axios.get(branchUrl).then((response) => {
        setBranchData(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const openAppointmentSignInPage = async () => {
    setMakeAppointment (true);
  }

  useEffect(() => {
    if (ageInterest) {
      const newFilteredTimeSlots = appointmentTimeSlots.filter(slot => slot.ageInterest === ageInterest);
      if (branch) {
        const newFilteredTimeSlotsWithBranch = newFilteredTimeSlots.filter(slot => slot.branchId === branch);
        setFilteredTimeSlots(newFilteredTimeSlotsWithBranch);
      } else {
        setFilteredTimeSlots(newFilteredTimeSlots);
      }
    } else {
      setFilteredTimeSlots([]);
    }
  }, [ageInterest, branch]);
  
  useEffect(() => {
    if (ageInterest) {
      const newFilteredBranch = branchData.filter((slot) => {
        const programsArray = slot.branchPrograms.split(',').map((program) => program.trim());
        console.log("programs", programsArray);
        return programsArray.includes(ageInterest);
      });
      console.log(newFilteredBranch);
      setFilteredBranch(newFilteredBranch);
    } else {
      setFilteredBranch([]);
    }
  }, [ageInterest]);

  const newAppointment = async () => {
    const appointmentData = new FormData();
    appointmentData.append("name", name);
    appointmentData.append("ageInterest", ageInterest);
    appointmentData.append("branchId", branch);
    appointmentData.append("time", time);
    appointmentData.append("date", date);
    appointmentData.append("phone", phone);

    try {
      const response = await Axios({
        method  : "POST",
        url     : appointmentUrl,
        data    : appointmentData,
        headers : {"Content-Type": "multipart/form-data"},
      });
      setRefresh(response.data)
    } catch (error) {
      console.log("error", error);
    }
    closeAddAppointmentDialog();
  };

  const closeAppointmentSignInPage = async () => {
    setDate                 ("");
    setTime                 ("");
    setBranch               ("");
    setName                 ("");
    setPhone                ("");
    setAgeInterest          ("");
    setMakeAppointment      (false);
  }

  return (
    <Box sx={{flex: 1, display: 'flex', flexDirection: 'column'}}>
      <Box sx={{flex: 1, display: 'flex', flexDirection: 'column', mb: 5}}>
        <Formik
          validateOnChange={true}
          initialValues={{
            email: 'ganweide@visualogic.com.my',
            password: 'Devuser1!',
          }}
          validationSchema={validationSchema}
          onSubmit={(data, {setSubmitting}) => {
            setSubmitting(true);
            signIn({
              email: data.email,
              password: data.password,
            });
            setSubmitting(false);
          }}
        >
          {({isSubmitting}) => (
            <Form style={{textAlign: 'left'}} noValidate autoComplete='off'>
              <Box sx={{mb: {xs: 5, xl: 8}}}>
                <AppTextField
                  placeholder={messages['common.email']}
                  label={<IntlMessages id='common.email' />}
                  name='email'
                  variant='outlined'
                  sx={{
                    width: '100%',
                    '& .MuiInputBase-input': {
                      fontSize: 14,
                    },
                  }}
                />
              </Box>

              <Box sx={{mb: {xs: 3, xl: 4}}}>
                <AppTextField
                  type={showPassword ? 'text' : 'password'}
                  placeholder={messages['common.password']}
                  label={<IntlMessages id='common.password' />}
                  name='password'
                  variant='outlined'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    width: '100%',
                    '& .MuiInputBase-input': {
                      fontSize: 14,
                    },
                  }}
                />
              </Box>

              <Box
                sx={{
                  mb: {xs: 3, xl: 4},
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Checkbox sx={{ml: -3}} />
                  <Box
                    component='span'
                    sx={{
                      color: 'grey.500',
                    }}
                  >
                    <IntlMessages id='common.rememberMe' />
                  </Box>
                </Box>
                <Box
                  component='span'
                  sx={{
                    color: (theme) => theme.palette.primary.main,
                    fontWeight: Fonts.MEDIUM,
                    cursor: 'pointer',
                    display: 'block',
                    textAlign: 'right',
                  }}
                  onClick={onGoToForgetPassword}
                >
                  <IntlMessages id='common.forgetPassword' />
                </Box>
              </Box>

              <div>
                <Button
                  variant='contained'
                  color='primary'
                  type='submit'
                  disabled={isSubmitting}
                  sx={{
                    minWidth: 160,
                    fontWeight: Fonts.REGULAR,
                    fontSize: 16,
                    textTransform: 'capitalize',
                    padding: '4px 16px 8px',
                  }}
                >
                  <IntlMessages id='common.login' />
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Box>

      <Box
        sx={{
          color: 'grey.500',
          mb: {xs: 5, md: 7},
        }}
      >
        <span style={{marginRight: 4}}>
          <IntlMessages id='common.dontHaveAccount' />
        </span>
        <Box
          component='span'
          sx={{
            fontWeight: Fonts.MEDIUM,
            '& a': {
              color: (theme) => theme.palette.primary.main,
              textDecoration: 'none',
            },
          }}
        >
          <Link to='/signup'>
            <IntlMessages id='common.signup' />
          </Link>
        </Box>
      </Box>

      <Box
        component='span'
        sx={{
          color: 'grey.500',
          mb: {xs: 5, md: 7},
          fontWeight: Fonts.MEDIUM,
            '& a': {
              color: (theme) => theme.palette.primary.main,
              textDecoration: 'none',
            },
        }}
      >
        <span style={{marginRight: 4}}>
          <IntlMessages id='Make an Appointment'/>
        </span>
        <Button onClick={openAppointmentSignInPage}>
          Appointment
        </Button>
      </Box>
      <Dialog
        fullWidth
        maxWidth          ="sm"
        open              ={makeAppointment}
        onClose           ={closeAppointmentSignInPage}
        aria-labelledby   ="alert-dialog-title"
        aria-describedby  ="alert-dialog-description"
      >
        <DialogTitle>
          <h2>Make an Appointment</h2>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <FormControl fullWidth margin="dense">
                <InputLabel id="age-interest-select">Age Interest</InputLabel>
                <Select
                  labelId ="age-interest-select"
                  id      ="age-interest-select"
                  value   ={ageInterest}
                  label   ="Age Interest"
                  onChange={(e) => {setAgeInterest(e.target.value)}}
                >
                  <MenuItem value="6 - 12 months">6 - 12 months</MenuItem>
                  <MenuItem value="1 - 4 years">1 - 4 years</MenuItem>
                  <MenuItem value="5 - 7 years">5 - 7 years</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12}>
              <FormControl fullWidth margin="dense">
                <InputLabel id="branch-select">Branch</InputLabel>
                <Select
                  labelId="branch-select"
                  id="branch-select"
                  value={branch || []}
                  label="Branch"
                  onChange={(e) => setBranch(e.target.value)}
                >
                  {filteredBranch.map((prop) => (
                    <MenuItem key={prop.branchId} value={prop.branchId}>{prop.branchName}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography variant="h3">Details</Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                onChange={(e) => setName(e.target.value)}
                margin="dense"
                label="Parent's Name"
                type="text"
                fullWidth
                variant="outlined"
                value={name}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                onChange={(e) => setPhone(e.target.value)}
                margin="dense"
                label="Handphone No."
                type="text"
                fullWidth
                variant="outlined"
                value={phone}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography variant="h3">Appointment Date & Time</Typography>
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                onChange        ={(e) => setDate(e.target.value)}
                InputLabelProps ={{ shrink: true }}
                margin          ="dense"
                label           ="Date"
                type            ="date"
                fullWidth
                variant         ="outlined"
                value           ={date}
              />
            </Grid>
            <Grid item xs={6} md={6}>            
              <FormControl fullWidth margin="dense">
                {
                  ageInterest === "" && branch === "" ? (
                    <InputLabel id="time-select">Please select an Age Interest</InputLabel>
                  ) : ageInterest !== "" && branch === "" ? (
                    <InputLabel id="time-select">Please select a Branch</InputLabel>
                  ) : (
                    <InputLabel id="time-select">Time (24 Hour Format)</InputLabel>
                  )
                }
                <Select
                  labelId ="time-select"
                  id      ="time-select"
                  value   ={time}
                  label   ={ageInterest === "" && branch === "" ? ("Please select an Age Interest") : ageInterest !== "" && branch === "" ? ("Please select a Branch") : ("Time (24 Hour Format)")}
                  onChange={(e) => {setTime(e.target.value)}}
                  disabled={ageInterest === "" || branch === ""}
                >
                  {filteredTimeSlots.map((slot) => (
                    <MenuItem key={slot.startTime} value={slot.startTime}>
                      {slot.startTime}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={newAppointment}>Sent</Button>
        </DialogActions>
      </Dialog>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: (theme) => theme.palette.background.default,
          mx: {xs: -5, lg: -10},
          mb: {xs: -6, lg: -11},
          mt: 'auto',
          py: 2,
          px: {xs: 5, lg: 10},
        }}
      >
        <Box
          sx={{
            color: (theme) => theme.palette.text.secondary,
          }}
        >
          <IntlMessages id='common.orLoginWith' />
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <IconButton
            sx={{
              p: 2,
              '& svg': {fontSize: 18},
              color: (theme) => theme.palette.text.secondary,
            }}
            onClick={() => auth.federatedSignIn({provider: 'Google'})}
          >
            <AiOutlineGoogle />
          </IconButton>
          <IconButton
            sx={{
              p: 1.5,
              '& svg': {fontSize: 18},
              color: (theme) => theme.palette.text.secondary,
            }}
            onClick={() => auth.federatedSignIn({provider: 'Facebook'})}
          >
            <FaFacebookF />
          </IconButton>
        </Box>
      </Box>

      <AppInfoView />
    </Box>
  );
};

export default SigninAwsCognito;
