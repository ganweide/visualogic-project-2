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

const MemberDetailsForm = ({
    values,
    setFieldValue,
    isViewOnly,
    onViewOnly,
}) => {
    const [{apiData: memberList}] = useGetDataApi(
        'api/member',
        {},
        {},
        true,
    );

    const onCancelClick = () => {
        onViewOnly(true);
    };

    const [selectedConditions, setSelectedConditions] = useState([]);

    // Handle Conditions List
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

    // Handle Checkbox Change
    const handleCheckboxChange = (e) => {
      const { name } = e.target;
      if (selectedConditions.includes(name)) {
        setSelectedConditions(selectedConditions.filter((condition) => condition !== name));
      } else {
        setSelectedConditions([...selectedConditions, name]);
      }
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
                            name='memberRegistrationDate'
                            fullWidth
                            disabled={isViewOnly}
                            label={<IntlMessages id='member.RegistrationDate' />}
                            type='date'
                            InputLabelProps={{shrink: true}}
                          />
                        </Grid>
                        <Grid item xs={12} md={9}>
                          <AppTextField
                            name="membershipStatus"
                            fullWidth
                            disabled={isViewOnly}
                            label={<IntlMessages id="member.MembershipStatus" />}
                            select
                            onChange={handleMembershipStatusChange}
                          >
                            <MenuItem value ="new">
                              <IntlMessages id="member.newMember" />
                            </MenuItem>
                            <MenuItem value ="existing">
                              <IntlMessages id="member.existingMember" />
                            </MenuItem>
                          </AppTextField>
                        </Grid>
                        <Grid item xs={12} md={9}>
                          <AppTextField
                            name='name'
                            fullWidth
                            disabled={isViewOnly}
                            label={<IntlMessages id='member.Name' />}
                          />
                        </Grid>
                        <Grid item xs={12} md={9}>
                          <AppTextField
                            name='branch'
                            fullWidth
                            disabled={isViewOnly}
                            label={<IntlMessages id='member.branch' />}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          {membershipStatus === "existing" && (
                            <Grid item xs={12} md={6}>
                              <AppTextField
                                name='existingPhoneNumber' // Bind input to state
                                fullWidth
                                disabled={isViewOnly}
                                label={<IntlMessages id="member.ExistingPhoneNumber" />}
                              />
                            </Grid>
                          )}
                        </Grid>
                        <Grid item xs={12} md={12}>
                          <FormControl component="fieldset">
                            <FormLabel component="legend">Payment Method</FormLabel>
                            <RadioGroup
                              row
                              fullWidth
                              disabled={isViewOnly}
                              label={<IntlMessages id="member.PaymentMethod" />}
                              name="paymentMethod"
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
                    <AppGridContainer spacing={5}>
                      <Grid item xs={12} md={9}>
                        <AppTextField
                            name='fullName'
                            fullWidth
                            disabled={isViewOnly}
                            label={<IntlMessages id='member.fullName' />}
                          />
                      </Grid>
                      <Grid item xs={12} md={9}>
                        <AppTextField
                            name='preferredName'
                            fullWidth
                            disabled={isViewOnly}
                            label={<IntlMessages id='member.preferredName' />}
                          />
                      </Grid>
                      <Grid item xs={12} md={9}>
                        <AppTextField
                            name='chineseName'
                            fullWidth
                            disabled={isViewOnly}
                            label={<IntlMessages id='member.chineseName' />}
                          />
                      </Grid>
                      <Grid item xs={12} md={9}>
                        <AppTextField
                            name='nricPassport'
                            fullWidth
                            disabled={isViewOnly}
                            label={<IntlMessages id='member.nricPassport' />}
                          />
                      </Grid>
                      <Grid item xs={12} md={9}>
                        <AppTextField
                            name='dateOfBirth'
                            fullWidth
                            disabled={isViewOnly}
                            label={<IntlMessages id='member.dateOfBirth' />}
                          />
                      </Grid>
                      <Grid item xs={12} md={9}>
                        <AppTextField
                            name='age'
                            fullWidth
                            disabled={isViewOnly}
                            label={<IntlMessages id='member.age' />}
                          />
                      </Grid>
                      <Grid item xs={12} md={9}>
                        <AppTextField
                            name='gender'
                            fullWidth
                            disabled={isViewOnly}
                            label={<IntlMessages id='member.gender' />}
                          />
                      </Grid>
                      <Grid item xs={12} md={9}>
                        <AppTextField
                            name='address'
                            fullWidth
                            disabled={isViewOnly}
                            label={<IntlMessages id='member.address' />}
                          />
                      </Grid>
                      <Grid item xs={12} md={9}>
                        <AppTextField
                            name='city'
                            fullWidth
                            disabled={isViewOnly}
                            label={<IntlMessages id='member.city' />}
                          />
                      </Grid>
                      <Grid item xs={12} md={9}>
                        <AppTextField
                            name='postcode'
                            fullWidth
                            disabled={isViewOnly}
                            label={<IntlMessages id='member.postcode' />}
                          />
                      </Grid>
                      <Grid item xs={12} md={9}>
                        <AppTextField
                            name='states'
                            fullWidth
                            disabled={isViewOnly}
                            label={<IntlMessages id='member.states' />}
                          />
                      </Grid>
                      <Grid item xs={12} md={9}>
                        <AppTextField
                            name='mobileNumber'
                            fullWidth
                            disabled={isViewOnly}
                            label={<IntlMessages id='member.mobileNumber' />}
                          />
                      </Grid>
                      <Grid item xs={12} md={9}>
                        <AppTextField
                            name='emailAddress'
                            fullWidth
                            disabled={isViewOnly}
                            label={<IntlMessages id='member.emailAddress' />}
                          />
                      </Grid>
                      <Grid item xs={12} md={9}>
                          <AppTextField
                            name="howDidYouHearAboutUs"
                            fullWidth
                            disabled={isViewOnly}
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

                <Card>
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
                    <AppGridContainer spacing={5}>
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
                            <FormGroup>
                                {conditionsList.map((condition) => (
                                <FormControlLabel
                                  sx={{mb:{xs: 4, xl: 6}, ml: 0, mt: -3}}
                                  disabled={
                                    isViewOnly ? true : values.conditionsList.includes(condition) ? false : true
                                  }
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
                    </AppGridContainer>

                    <AppGridContainer spacing={5}></AppGridContainer>
                  </CardContent>
                </Card>

                <Card>
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
                    <AppGridContainer spacing={5}>
                      <Grid item xs={12} md={9}>
                        <AppTextField
                          name='emergencyContactName'
                          fullWidth
                          disabled={isViewOnly}
                          label={<IntlMessages id='member.emergencyContactName' />}
                        />
                      </Grid>
                      <Grid item xs={12} md={9}>
                        <AppTextField
                            name='emergencyContactMobileNumber'
                            fullWidth
                            disabled={isViewOnly}
                            label={<IntlMessages id='member.emergencyContactMobileNumber' />}
                          />
                      </Grid>
                      <Grid item xs={12} md={9}>
                        <AppTextField
                            name='emergencyContactRelationship'
                            fullWidth
                            disabled={isViewOnly}
                            label={<IntlMessages id='member.emergencyContactRelationship' />}
                          />
                      </Grid>
                    </AppGridContainer>

                    <AppGridContainer spacing={5}></AppGridContainer>
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

{/*return (
    <Box>
    <Card sx={{ mt: 2, p: 5,}}>
      <Grid container spacing={25}>
      <Grid item xs={12}>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="h6">Details</Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextField
              label="Member Registration Date"
              type="date"
              InputLabelProps={{shrink: true}}
              variant="outlined"
              fullWidth
              value={dialogMemberRegistrationDate}
              onChange={(e)=> handleDialogMemberRegistrationDate(e,"memberRegistrationDate")}
              margin="dense"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              label="Member Name"
              variant="outlined"
              fullWidth
              value={dialogMemberName}
              onChange={(e) => handleDialogmemberName(e, "memberName")}
              margin="dense"
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <FormControl fullWidth margin="dense">
              <InputLabel>Preferred Branch</InputLabel>
              <Select
                value={dialogBranch}
                onChange={(e) => handleDialogInputChange(e, "branch")}
                label="Branch"
              >
                {branchData.map((branch) => (
                  <MenuItem key={branch.id} value={branch.branchName}>
                    {branch.branchName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Payment Method</FormLabel>
              <RadioGroup
                row // Display radio buttons horizontally
                aria-label="payment-method"
                name="paymentMethod"
                value={dialogPaymentMethod}
                onChange={(e) => setDialogPaymentMethod(e, "paymentMethod")}
              >
                <FormControlLabel value="One-off" control={<Radio />} label="Debit/Credit Card (One-off)" />
                <FormControlLabel value="Installment" control={<Radio />} label="Debit/Credit Card (Installment)" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={12}>
            <Divider />
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant='h6'>A. Personal Information</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Legal Full Name (as per NRIC/Passport)"
              variant="outlined"
              fullWidth
              value={dialogFullName}
              onChange={(e) => handleDialogInputChange(e, "fullName")}
              margin="dense"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Preferred Name"
              variant="outlined"
              fullWidth
              value={dialogPreferredName}
              onChange={(e) => handleDialogInputChange(e, "preferredName")}
              margin="dense"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Chinese Name (if applicable)"
              variant="outlined"
              fullWidth
              value={dialogChineseName}
              onChange={(e) => handleDialogInputChange(e, "chineseName")}
              margin="dense"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="NRIC/Passport No."
              variant="outlined"
              fullWidth
              value={dialogNRICPassport}
              onChange={(e) => handleDialogInputChange(e, "nricPassport")}
              margin="dense"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Date of Birth"
              variant="outlined"
              type="date"
              InputLabelProps={{shrink: true}}
              fullWidth
              value={dialogDateOfBirth}
              onChange={(e) => handleDialogInputChange(e, "dateOfBirth")}
              margin="dense"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Age"
              variant="outlined"
              type="number"
              fullWidth
              value={dialogAge}
              onChange={(e) => handleDialogInputChange(e, "age")}
              margin="dense"
            />
          </Grid>
          <Grid item xs={6} md={6}>
            <FormControl fullWidth margin="dense">
              <InputLabel>Gender</InputLabel>
              <Select
              value={dialogGender}
              onChange={(e) => handleDialogInputChange(e, "gender")}
              label="Gender"
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Transgender">Transgender</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} md={6}>
            <TextField
              label="Mobile Number"
              variant="outlined"
              fullWidth
              value={dialogMobileNumber}
              onChange={(e) => handleDialogInputChange(e, "mobileNumber")}
              margin="dense"
            />
          </Grid>
          <Grid item xs={6} md={6}>
            <TextField
              label="Email Address"
              variant="outlined"
              type='email'
              fullWidth
              value={dialogEmailAddress}
              onChange={(e) => handleDialogInputChange(e, "emailAddress")}
              margin="dense"
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              label="Address"
              variant="outlined"
              multiline // Enable multiline input
              rows={5} // Specify the number of rows to make it larger
              fullWidth
              value={dialogAddress}
              onChange={(e) => handleDialogInputChange(e, "address")}
              margin="dense"
            />
          </Grid>
          <Grid item xs={6} md={6}>
            <TextField
              label="City"
              variant="outlined"
              fullWidth
              value={dialogCity}
              onChange={(e) => handleDialogInputChange(e, "city")}
              margin="dense"
            />
          </Grid>
          <Grid item xs={6} md={6}>
            <TextField
              label="Postcode"
              variant="outlined"
              fullWidth
              value={dialogPostcode}
              onChange={(e) => handleDialogInputChange(e, "postcode")}
              margin="dense"
            />
          </Grid>
          <Grid item xs={6} md={6}>
            <TextField
              label="States"
              variant="outlined"
              fullWidth
              value={dialogStates}
              onChange={(e) => handleDialogInputChange(e, "states")}
              margin="dense"
            />
          </Grid>
        </Grid>
        </Grid>
      </Grid>
    </Card>
  </Box>
  );
*/}