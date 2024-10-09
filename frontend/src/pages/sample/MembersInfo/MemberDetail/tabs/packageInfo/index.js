import React, {useState, useRef} from 'react';
import {
    Box,
    Card,
    Grid,
    Typography,
} from '@mui/material';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Toast} from 'primereact/toast';


export default function PackageInfo ({selectedMember}) {
    const toast = useRef(null);

    const [filters, setFilters] = useState({
        packageDate:{value: null, matchMode: 'contains'},
    })

    const [{apiData: memberData,loading}, {reCallAPI}] = useGetDataApi(
        `api/package/${selectedMember._id}`,
        //undefined,
        {},
        {},
        true,
      );

return (
    <Box>
        <Toast ref={toast} />
        <Card sx={{mt:2, p:5}}>
            <Grid container spacing={2}>

                <Grid item xs={12} sm={12}>
                    <Box display="flex" justifyContent="space-between" mb={2}>
                        <Typography variant="h6">Member Package Details</Typography>
                    </Box>
                </Grid>

                {/* Table */}
                <Grid item xs={12} md={12}>
                    <DataTable
                        value={memberData}
                        paginator
                        rows={10}
                        size='small'
                        dataKey="id"
                        filters={filters}
                        filterDisplay='row'
                        loading={loading}
                        emptyMessage="No records found"
                        showGridlines
                        stripedRows
                    >
                        <Column
                            field="packageDate"
                            header="Date"
                            sortable
                            style={{minWidth: '12rem'}}
                        />
                        <Column
                            field="packageInvoiceNo"
                            header="Invoice No"
                            style={{minWidth: '12rem'}}
                        />
                        <Column
                            field="packageId"
                            header="Package ID"
                            style={{minWidth: '12rem'}}
                        />
                        <Column
                            field="packageName"
                            header="Package Name"
                            style={{minWidth: '12rem'}}
                        />
                        <Column
                            field="packageType"
                            header="Purchase Type"
                            style={{minWidth: '12rem'}}
                        />
                        <Column
                            field="packageTime"
                            header="Time"
                            style={{minWidth: '12rem'}}
                        />
                    </DataTable>

                </Grid>
            </Grid>
        </Card>
    </Box>
  );
};