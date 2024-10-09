const [deletingMember, setDeletingMember] = useState(null);
  const handleOpenDeleteDialog = (rowData) => {
    setDeletingMember(rowData);
    setDeleteDialogOpen(true);
  }

  const handleCloseDeleteDialog = () => {
    setDeletingMember(null);
    setDeleteDialogOpen(false);
  }

  const handleDeleteMember = async () => {
    try {
      await axios.delete(`${memberURL}/${deletingMember._id}`);
      setSnackbarMessage('Member deleted successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setRefreshTable(prev => !prev);
    } catch (error) {
      console.error('Error deleting member:', error);
      setSnackbarMessage('Error deleting member');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      handleCloseDeleteDialog();
    }
  }

<Dialog
        fullWidth
        maxWidth="sm"
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>
          <Typography>Confirm Deletion</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Typography>Are you sure you want to delete the role: {deletingMember?.memberFullName}?</Typography>
        </DialogContent>
        <DialogActions>
          <Button color="error" variant="contained" onClick={handleDeleteMember}>Delete</Button>
          <Button variant="outlined" onClick={handleCloseDeleteDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>