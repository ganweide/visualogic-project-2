import React, {useState} from 'react'
import {
  Box,
  Card,
  Grid,
  Typography,
  Button,
} from '@mui/material';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';

import MemberDetail from './MemberDetail';
import AddMember from './AddMember';
import AddNewMember from './AddNewMember';
import DrawerStepper from './DrawerStepperAddMember';
import {postDataApi, useGetDataApi} from '@enjoey/utility/APIHooks';

import PersonAddIcon from '@mui/icons-material/PersonAdd';

const MembersInfo = () => {

  const [selectedMember, setSelectedMember] = useState(null);

  const [filters, setFilters] = useState({
    memberDate: { value: null, matchMode: 'contains' },
    memberName: { value: null, matchMode: 'contains' },
  });

  const [{apiData: memberDatabase, loading}, {reCallAPI}] = useGetDataApi(
    'api/member',
    {},
    {},
    true,
  );
  
  
  const [addNewMemberDialogOpen, setAddNewMemberDialogOpen] = useState(false);
  const handleOpenAddNewMemberDialog = () => {
    setAddNewMemberDialogOpen(true);
  };

  const handleCloseAddNewMemberDialog = () => {
    setAddNewMemberDialogOpen(false);
  };

  // Datatable Templates
  const genderBodyTemplate = (rowData) => {
    switch (rowData.memberGender) {
      case 'M':
        return 'Male';
      case 'F':
        return 'Female';
      case 'T':
        return 'Transgender';
      default:
        return 'Other';
    }
  };

  const genderFilterTemplate = (options) => {
    const genderOptions = [
      { label: 'Male', value: 'M' },
      { label: 'Female', value: 'F' },
      { label: 'Transgender', value: 'T' }
    ];
  
    return (
      <Dropdown 
        value={filters?.memberGender?.value || null}
        options={genderOptions}
        onChange={(e) => {
          setFilters(prevFilters => ({
            ...prevFilters,
            memberGender: { value: e.value, matchMode: 'equals' }
          }));
        }}
        placeholder="Select Gender"
      />
    );
  };

  console.log('selectedMember:', selectedMember);
  
  return selectedMember ? (
    <Card sx={{mt: 2, p: 5}}>
      <Box
        sx={{
          transition: 'all 0.5s ease',
          transform: 'translateX(100%)',
          opacity: 0,
          visibility: 'hidden',
          '&.show': {
            transform: 'translateX(0)',
            opacity: 1,
            visibility: 'visible',
          },
        }}
        className={clsx({
          show: 1,
        })}
      >
        <Box
          component='h2'
          variant='h2'
          sx={{
            fontSize: 16,
            // color: 'white',
            fontWeight: Fonts.SEMI_BOLD,
            mb: {
              xs: 2,
              lg: 1,
            },
          }}
        >
          Member Details : {selectedMember?.memberName.toUpperCase()}
        </Box>
        <MemberDetail
          selectedMember={selectedMember}
          setSelectedMember={setSelectedMember}
        />
      </Box>{' '}
    </Card>
  ) : (
    <Box>
      <Card sx={{ mt: 2, p: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="h1">Members Information</Typography>
              <Button
                variant="outlined"
                startIcon={<PersonAddIcon />}
                onClick={handleOpenAddNewMemberDialog}
              >
                Add Member
              </Button>
            </Box>
          </Grid>

          {/* Table */}
          <Grid item xs={12} md={12}>
            <DataTable
              value={memberDatabase?.length > 0 ? memberDatabase : []}
              paginator
              rows={10}
              size='small'
              dataKey='id'
              filters={filters}
              filterDisplay='row'
              loading={loading}
              emptyMessage='No branch found.'
              selectionMode='single'
              onSelectionChange={(e) => setSelectedMember(e.value)}
              // selection={selectedProduct}
              showGridlines
              stripedRows
            >
              <Column
                field="memberDate"
                header="Date"
                filter
                filterPlaceholder="Filter by Date"
                style={{ minWidth: '12rem' }}
                sortable
              />
              <Column
                field="memberName"
                header="Name"
                filter
                filterPlaceholder="Filter by Name"
                style={{ minWidth: '12rem' }}
                sortable
              />
              <Column
                field="memberMobileNumber"
                header="Mobile No"
                filter
                filterPlaceholder="Filter by Mobile Number"
                style={{ minWidth: '12rem' }}
              />
              <Column
                field="memberEmail"
                header="Email"
                filter
                filterPlaceholder="Filter by Email"
                style={{ minWidth: '12rem' }}
              />
              <Column
                field="memberGender"
                header="Gender"
                body={genderBodyTemplate}
                filter
                filterElement={genderFilterTemplate}
                style={{ minWidth: '12rem' }}
              />
              <Column
                field="memberBranch"
                header="Prefered Branch"
                filter
                filterPlaceholder="Filter by Pefered Branch"
                style={{ minWidth: '12rem' }}
              />
              <Column
                field="lastPackageDate"
                header="Last Package Date"
                style={{ minWidth: '12rem' }}
              />
              <Column
                field="lastCheckinDate"
                header="last Checkin Date"
                style={{ minWidth: '12rem' }}
              />
            </DataTable>
          </Grid>
        </Grid>
      </Card>
      <DrawerStepper
        isOpen={addNewMemberDialogOpen}
        setOpenDialog={handleCloseAddNewMemberDialog}
        reCallAPI={reCallAPI}
      />
    </Box>
  )
}

export default MembersInfo