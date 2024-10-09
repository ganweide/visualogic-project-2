// Add New Package Dialog Constants
const [dialogMemberRegistrationDate, setDialogMemberRegistrationDate] = useState('');
const [dialogMembershipStatus, setDialogMembershipStatus] = useState('');
const [dialogExistingPhoneNumber, setDialogExistingPhoneNumber] = useState('');
const [dialogMemberName, setDialogMemberName] = useState('');
const [dialogBranch, setDialogBranch] = useState('');
const [dialogPaymentMethod, setDialogPaymentMethod] = useState('');
const [dialogFullName, setDialogFullName] = useState('');
const [dialogPreferredName, setDialogPreferredName] = useState('');
const [dialogChineseName, setDialogChineseName] = useState('');
const [dialogNRICPassport, setDialogNRICPassport] = useState('');
const [dialogDateOfBirth, setDialogDateOfBirth] = useState('');
const [dialogAge, setDialogAge] = useState('');
const [dialogGender, setDialogGender] = useState('');
const [dialogMobileNumber, setDialogMobileNumber] = useState('');
const [dialogEmailAddress, setDialogEmailAddress] = useState('');
const [dialogAddress, setDialogAddress] = useState('');
const [dialogCity, setDialogCity] = useState('');
const [dialogPostcode, setDialogPostcode] = useState('');
const [dialogStates, setDialogStates] = useState('');
const [dialogHearAboutUs, setDialogHearAboutUs] = useState('');
const [dialogMedicalHistory, setDialogMedicalHistory] = useState('');
const [selectedConditions, setSelectedConditions] = useState([]);
const [dialogUnderstandPrecautions, setDialogUnderstandPrecautions] = useState(false);
const [dialogEmergencyContactName, setDialogEmergencyContactName] = useState('');
const [dialogEmergencyMobileNumber, setDialogEmergencyMobileNumber] = useState('');
const [dialogEmergencyRelationship, setDialogEmergencyRelationship] = useState('');

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

  // Handle Understand Precautions
  const handleUnderstandPrecautions = (e) => {
    setDialogUnderstandPrecautions(e.target.checked);
  };

  // Handle Checkbox Change
  const handleCheckboxChange = (e) => {
    const { name } = e.target;
    if (selectedConditions.includes(name)) {
      setSelectedConditions(selectedConditions.filter((condition) => condition !== name));
    } else {
      setSelectedConditions([...selectedConditions, name]);
    }
  };

  // Handle membership status change
  const handleMembershipStatusChange = (event) => {
    setDialogMembershipStatus(event.target.value);
  };

const [editingMemberId, setEditingMemberId] = useState(null);
  const handleOpenEditDialog = (rowData) => {
    setEditingMemberId(rowData.id);
    setDialogMemberRegistrationDate(rowData.date);
    setDialogMembershipStatus(rowData.status);
    setDialogExistingPhoneNumber(rowData.existingPhoneNumber);
    setDialogMemberName(rowData.name);
    setDialogBranch(rowData.branch);
    setDialogPaymentMethod(rowData.paymentMethod);
    setDialogFullName(rowData.fullName);
    setDialogPreferredName(rowData.preferredName);
    setDialogChineseName(rowData.chineseName);
    setDialogNRICPassport(rowData.NRICPassport);
    setDialogDateOfBirth(rowData.dateOfBirth);
    setDialogAge(rowData.age);
    setDialogGender(rowData.gender);
    setDialogMobileNumber(rowData.mobileNumber);
    setDialogEmailAddress(rowData.emailAddress);
    setDialogAddress(rowData.address);
    setDialogCity(rowData.city);
    setDialogPostcode(rowData.postcode);
    setDialogStates(rowData.states);
    setDialogHearAboutUs(rowData.hearAboutUs);
    setDialogMedicalHistory(rowData.medicalHistory);
    setSelectedConditions(rowData.conditions);
    setDialogUnderstandPrecautions(rowData.understandPrecautions);
    setDialogEmergencyContactName(rowData.emergencyContactName);
    setDialogEmergencyMobileNumber(rowData.emergencyMobileNumber);
    setDialogEmergencyRelationship(rowData.emergencyRelationship);
    setEditDialogOpen(true);
  }

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setDialogMemberRegistrationDate('');
    setDialogMembershipStatus('');
    setDialogExistingPhoneNumber('');
    setDialogMemberName('');
    setDialogBranch('');
    setDialogPaymentMethod('');
    setDialogFullName('');
    setDialogPreferredName('');
    setDialogChineseName('');
    setDialogNRICPassport('');
    setDialogDateOfBirth('');
    setDialogAge('');
    setDialogGender('');
    setDialogMobileNumber('');
    setDialogEmailAddress('');
    setDialogAddress('');
    setDialogCity('');
    setDialogPostcode('');
    setDialogStates('');
    setDialogHearAboutUs('');
    setDialogMedicalHistory('');
    setSelectedConditions([]);
    setDialogUnderstandPrecautions(false);
    setDialogEmergencyContactName('');
    setDialogEmergencyMobileNumber('');
    setDialogEmergencyRelationship('');
  }

  const handleSaveEditMember = async () => {
    try {
      const updatedMemberData = {
        date: dialogMemberRegistrationDate,
        status: dialogMembershipStatus,
        existingPhoneNumber: dialogExistingPhoneNumber,
        name: dialogMemberName,
        branch: dialogBranch,
        paymentMethod: dialogPaymentMethod,
        fullName: dialogFullName,
        preferredName: dialogPreferredName,
        chineseName: dialogChineseName,
        NRICPassport: dialogNRICPassport,
        dateOfBirth: dialogDateOfBirth,
        age: dialogAge,
        gender: dialogGender,
        mobileNumber: dialogMobileNumber,
        emailAddress: dialogEmailAddress,
        address: dialogAddress,
        city: dialogCity,
        postcode: dialogPostcode,
        states: dialogStates,
        hearAboutUs: dialogHearAboutUs,
        medicalHistory: dialogMedicalHistory,
        conditions: selectedConditions,
        understandPrecautions: dialogUnderstandPrecautions,
        emergencyContactName: dialogEmergencyContactName,
        emergencyMobileNumber: dialogEmergencyMobileNumber,
        emergencyRelationship: dialogEmergencyRelationship,
      };
      
      console.log(data);

      const response = await axios.post(memberURL, data);
      console.log('New member added: ',response.data);
      setRefreshTable(response.data);
      setSnackbarMessage('Role saved successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      handleCloseAddNewMember();
    } catch (error) {
      console.error('Error: ', error);
      setSnackbarMessage('Error saving member');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

<Dialog
        fullWidth
        maxWidth="md"
        open={openAddNewMember}
        onClose={handleCloseAddNewMember}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
        <DialogTitle>
          <Typography variant="h2">Create Member</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                label="Member Registration Date"
                type="date"
                InputLabelProps={{shrink: true}}
                variant="outlined"
                fullWidth
                value={dialogMemberRegistrationDate}
                onChange={(e)=> setDialogMemberRegistrationDate(e.target.value)}
                margin="dense"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
            <FormControl component="fieldset">
          <FormLabel component="legend">Membership Status</FormLabel>
          <RadioGroup
            value={dialogMembershipStatus} // Bind the selected value to state
            onChange={handleMembershipStatusChange} // Update state on change
          >
            <FormControlLabel
              value="new"
              control={<Radio />}
              label="New Member"
            />
            <FormControlLabel
              value="existing"
              control={<Radio />}
              label="Existing Member"
            />
          </RadioGroup>
        </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                label="Member Name"
                variant="outlined"
                fullWidth
                value={dialogMemberName}
                onChange={(e) => setDialogMemberName(e.target.value)}
                margin="dense"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              {/* Conditionally render input field if "Existing Member" is selected */}
              {dialogMembershipStatus === "existing" && (
                <Grid item xs={12}>
                  <TextField
                    label="Existing Member Phone Number"
                    value={dialogExistingPhoneNumber} // Bind input to state
                    onChange={(e) => setDialogExistingPhoneNumber(e.target.value)} // Update state on change
                    fullWidth
                  />
                </Grid>
              )}
            </Grid>
            <Grid item xs={6} sm={6}>
              <FormControl fullWidth margin="dense">
                <InputLabel>Preferred Branch</InputLabel>
                <Select
                  value={dialogBranch}
                  onChange={(e) => setDialogBranch(e.target.value)}
                  label="Branch"
                >
                  {branchDatabase.map((branch) => (
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
                  onChange={(e) => setDialogPaymentMethod(e.target.value)}
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
              <Typography variant='h3'>A. Personal Information</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Legal Full Name (as per NRIC/Passport)"
                variant="outlined"
                fullWidth
                value={dialogFullName}
                onChange={(e) => setDialogFullName(e.target.value)}
                margin="dense"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Preferred Name"
                variant="outlined"
                fullWidth
                value={dialogPreferredName}
                onChange={(e) => setDialogPreferredName(e.target.value)}
                margin="dense"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Chinese Name (if applicable)"
                variant="outlined"
                fullWidth
                value={dialogChineseName}
                onChange={(e) => setDialogChineseName(e.target.value)}
                margin="dense"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="NRIC/Passport No."
                variant="outlined"
                fullWidth
                value={dialogNRICPassport}
                onChange={(e) => setDialogNRICPassport(e.target.value)}
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
                onChange={(e) => setDialogDateOfBirth(e.target.value)}
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
                onChange={(e) => setDialogAge(e.target.value)}
                margin="dense"
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <FormControl fullWidth margin="dense">
                <InputLabel>Gender</InputLabel>
                <Select
                  value={dialogGender}
                  onChange={(e) => setDialogGender(e.target.value)}
                  label="Gender"
                >
                  <MenuItem value="M">Male</MenuItem>
                  <MenuItem value="F">Female</MenuItem>
                  <MenuItem value="T">Transgender</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                label="Mobile Number"
                variant="outlined"
                fullWidth
                value={dialogMobileNumber}
                onChange={(e) => setDialogMobileNumber(e.target.value)}
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
                onChange={(e) => setDialogEmailAddress(e.target.value)}
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
                onChange={(e) => setDialogAddress(e.target.value)}
                margin="dense"
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                label="City"
                variant="outlined"
                fullWidth
                value={dialogCity}
                onChange={(e) => setDialogCity(e.target.value)}
                margin="dense"
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                label="Postcode"
                variant="outlined"
                fullWidth
                value={dialogPostcode}
                onChange={(e) => setDialogPostcode(e.target.value)}
                margin="dense"
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                label="States"
                variant="outlined"
                fullWidth
                value={dialogStates}
                onChange={(e) => setDialogStates(e.target.value)}
                margin="dense"
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <FormControl fullWidth margin="dense">
                <InputLabel>How did you hear about us</InputLabel>{" "}
                <Select
                value={dialogHearAboutUs}
                onChange={(e) => setDialogHearAboutUs(e.target.value)}
                label="Category"
                >
                  <MenuItem value="">
                  <em>None</em>
                  </MenuItem>
                  <MenuItem value="Family">Family</MenuItem>
                  <MenuItem value="Friend">Friend</MenuItem>
                  <MenuItem value="Facebook">Facebook</MenuItem>
                  <MenuItem value="Advertisement">Advertisement</MenuItem>
                  <MenuItem value="Anran Outlet">Anran Outlet</MenuItem>
                  <MenuItem value="Others">Others</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography variant='h3'>B. Medical History</Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                label="Medical History"
                variant="outlined"
                multiline // Enable multiline input
                rows={5} // Specify the number of rows to make it larger
                fullWidth
                value={dialogMedicalHistory}
                onChange={(e) => setDialogMedicalHistory(e.target.value)}
                margin="dense"
              />
            </Grid>
            <Grid item xs={12} md={12}>
            <FormLabel component="legend">Do you have or have you suffered from any of the following?</FormLabel>
              <FormGroup>
                {conditionsList.map((condition) => (
                  <FormControlLabel
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
              {/* Display the selected conditions */}
              <Box mt={2}>
                {selectedConditions.join(", ")}
              </Box>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Divider/>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControlLabel
                control={
                <Checkbox
                  checked={dialogUnderstandPrecautions}
                  onChange={setDialogUnderstandPrecautions}
                  name="understand-precautions"
                  />
                }
                label={<Typography variant='h5'>I understand above mentioned precautions and give consent that i do not have any health related issue.</Typography>}
                />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Divider/>
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography variant='h3'>C. Emergency Contact</Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography variant='h5'>An emergency contact is someone you designate to be contacted in an emergency or crisis. This individual should be someone you trust, knowledgeable about your details, medical conditions, and preferences, and can be a reliable source of support during difficult situations.</Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                value={dialogEmergencyContactName}
                onChange={(e) => setDialogEmergencyContactName(e.target.value)}
                margin="dense"
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                label="Landline/Mobile Number"
                variant="outlined"
                fullWidth
                value={dialogEmergencyMobileNumber}
                onChange={(e) => setDialogEmergencyMobileNumber(e.target.value)}
                margin="dense"
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                label="Relationship"
                variant="outlined"
                fullWidth
                value={dialogEmergencyRelationship}
                onChange={(e) => setDialogEmergencyRelationship(e.target.value)}
                margin="dense"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddNewMember} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveNewMember} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>