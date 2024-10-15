import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardHeader from './CardHeader';
import { useInfoViewActionsContext } from '@enjoey/utility/AppContextProvider/InfoViewContextProvider';
import { deleteDataApi } from '@enjoey/utility/APIHooks';
import AppDialog from '@enjoey/core/AppDialog';

const DeleteMember = ({ member, isOpen, setOpenDialog, reCallAPI }) => {
  const infoViewActionsContext = useInfoViewActionsContext();

  const onDeleteConfirm = () => {
    console.log('Attempting to delete member with ID:', member._id);
    
    deleteDataApi(
      `http://localhost:5000/api/members/${member._id}`,
      infoViewActionsContext,
      false,
      false,
      {
        'Content-Type': 'multipart/form-data',
      }
    )
      .then(() => {
        console.log('Member deleted successfully');
        reCallAPI(); // Refresh the member list
        infoViewActionsContext.showMessage('Member deleted successfully!');
        setOpenDialog; // Close the dialog
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
        console.error('Error deleting member:', error.message);
      });
  };

  return (
    <Box flex={1}>
      <AppDialog
        dividers
        maxWidth='xs'
        open={isOpen}
        hideClose
        title={
          <CardHeader
            onCloseAddCard={() => setOpenDialog(false)}
            title={'Confirm Deletion'}
          />
        }
      >
        <Typography>
          Are you sure you want to delete this member: {member?.MB_full_name}?
        </Typography>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Button
            sx={{
              position: 'relative',
              minWidth: 100,
              mt: 4,
            }}
            color='warning'
            variant='contained'
            onClick={() => {
              console.log('Delete button clicked');
              onDeleteConfirm();
            }}
          >
            Delete
          </Button>
        </Box>
      </AppDialog>
    </Box>
  );
};

export default DeleteMember;

DeleteMember.propTypes = {
  member: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    MB_full_name: PropTypes.string.isRequired,
  }).isRequired,
  reCallAPI: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setOpenDialog: PropTypes.func.isRequired,
};
