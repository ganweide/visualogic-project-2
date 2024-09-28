import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Switch,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Divider,
} from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import PermissionSection from '../PermissionCheckbox';

const roleURL = "http://localhost:5000/api/role";

const CreateRole = ({
  open,
  onClose,
  onRefresh,
  showSnackbar,
  roles,
  branchDatabase,
  dialogRoleName,
  setDialogRoleName,
  dialogAllBranchCheckbox,
  setDialogAllBranchCheckbox,
  dialogBranch,
  setDialogBranch,
  dialogActiveSwitch,
  setDialogActiveSwitch,
  permissions, 
  setPermissions,
  errors,
  setErrors,
}) => {
  // Checkbox Actions
  const handleClickCheckboxAllBranch = (e) => {
    setFieldValue('allBranch', e.target.checked);
    if (e.target.checked) {
      setFieldValue('branch', ''); // Clear branch if All Branch is checked
    }
  }

  // Switch Actions
  const handleClickSwitchActiveInactive = (e) => {
    setDialogActiveSwitch(e.target.checked);
  }

  const validationSchema = Yup.object().shape({
    roleName: Yup.string().required('Role Name is required'),
    branch: Yup.string().when('allBranch', {
      is: false,
      then: Yup.string().required('Branch is required if All Branch is not checked'),
    }),
  });

  // Initial values for Formik
  const initialValues = {
    roleName: '',
    allBranch: false,
    branch: '',
    active: true,
  };

  // Data Validation
  const validateRoleFields = (fields) => {
    let isValid = true;
    let validationErrors = {};

    // Validation logic
    if (!dialogRoleName) {
      validationErrors.dialogRoleName = 'Role Name is required';
      isValid = false;
    }
    if (!dialogAllBranchCheckbox && !dialogBranch) {
      validationErrors.dialogBranch = 'Branch is required if All Branch is not checked';
      isValid = false;
    }

    return { isValid, validationErrors };
  }

  // Save New Role
  const handleSaveNewRole = async () => {
    try {
      const { isValid, validationErrors } = validateRoleFields();

      if (!isValid) {
        setErrors(validationErrors);
        return;
      }
  
      const roleData = {
        roleName: dialogRoleName,
        allBranchStatus: dialogAllBranchCheckbox,
        branchName: dialogAllBranchCheckbox ? null : dialogBranch,
        roleStatus: dialogActiveSwitch,
        ...permissions,
      };

      console.log('Role data to be saved:', JSON.stringify(roleData, null, 2));

      const response = await axios.post(roleURL, roleData);
      console.log('Role saved:', response.data);
      onRefresh();
      showSnackbar('Role saved successfully', 'success');
      onClose();
    } catch (error) {
      console.error('Error saving role:', error);
      showSnackbar('Error saving role', 'error');
    }
  }

  return (
    <Dialog
      fullWidth
      maxWidth          ="md"
      open              ={open}
      aria-labelledby   ="alert-dialog-title"
      aria-describedby  ="alert-dialog-description"
    >
      <DialogTitle>
        <Typography>Create Role</Typography>
      </DialogTitle>
      <DialogContent dividers>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            try {
              const roleData = {
                roleName: values.roleName,
                allBranchStatus: values.allBranch,
                branchName: values.allBranch ? null : values.branch,
                roleStatus: values.active,
                ...permissions,
              };

              console.log('Role data to be saved:', JSON.stringify(roleData, null, 2));

              const response = await axios.post(roleURL, roleData);
              console.log('Role saved:', response.data);
              onRefresh();
              showSnackbar('Role saved successfully', 'success');
              onClose();
            } catch (error) {
              console.error('Error saving role:', error);
              showSnackbar('Error saving role', 'error');
            }
          }}
        >
          {({ values, handleChange, setFieldValue }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <Field
                    as={TextField}
                    name="roleName"
                    margin="dense"
                    label="Role Name"
                    type="text"
                    fullWidth
                    variant="outlined"
                    error={Boolean(values.roleName && values.roleName.length === 0)}
                  />
                  <ErrorMessage name="roleName" component={FormHelperText} error />
                </Grid>
                <Grid item xs={12} md={12}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values.allBranch}
                          onChange={(e) => {
                            setFieldValue('allBranch', e.target.checked);
                            if (e.target.checked) {
                              setFieldValue('branch', '');
                            }
                          }}
                        />
                      }
                      label='All Branch'
                    />
                  </FormGroup>
                </Grid>
                {!values.allBranch && (
                  <Grid item xs={12} md={12}>
                    <FormControl fullWidth margin="dense" error={!!values.branch && values.branch.length === 0}>
                      <InputLabel id="branch-select">Branch</InputLabel>
                      <Field
                        as={Select}
                        labelId ="branch-select"
                        id      ="branch-select"
                        name="branch"
                        label   ="Branch"
                      >
                        {branchDatabase.length > 0 ? (
                          branchDatabase.map((row) => (
                            <MenuItem key={row._id} value={row._id}>{row.branchName}</MenuItem>
                          ))
                        ) : (
                          <MenuItem value="" disabled>No branches set up yet</MenuItem>
                        )}
                      </Field>
                    </FormControl>
                    <ErrorMessage name="branch" component={FormHelperText} error />
                  </Grid>
                  )
                }
                <Grid item xs={12} md={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12} md={12}>
                  {/* Other Permissions */}
                  {roles.map(({ title, permission }) => (
                    <PermissionSection
                      key={title}
                      title={title}
                      permissions={permission}
                      state={permissions}
                      setState={setPermissions}
                    />
                  ))}
                  {/* Active/InActive */}
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={3}>
                      <Typography>Active/InActive</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Field
                        as={Switch}
                        name="active"
                        checked={values.active}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <DialogActions>
                <Button variant="contained" type="submit">Save</Button>
                <Button color="error" variant="outlined" onClick={onClose}>Cancel</Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default CreateRole;