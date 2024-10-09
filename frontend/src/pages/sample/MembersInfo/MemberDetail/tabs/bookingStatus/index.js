import React, { useState, useRef } from "react";
import {
    Box,
    Card,
    Grid,
    Typography,
} from "@mui/material";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";

export default function BookingSession({selectedMember}) {
    const toast = useRef(null);

    const [filters, setFilters] = useState({
        bookingDate: { value: null, matchMode: "contains" },
        bookingPackageName: { value: null, matchMode: "contains" },
        bookingMemberName: { value: null, matchMode: "contains" },
        bookingBranch: { value: null, matchMode: "contains" },
        bookingFloor: { value: null, matchMode: "contains" },
        bookingStatus: { value: null, matchMode: "contains" },
    });

    const [{apiData: memberData, loading}, {reCallAPI}] = useGetDataApi(
        `api/booking/${selectedMember._id}`,
        {},
        {},
        true,
    );

return (
    <Box>
        <Toast ref={toast} />
        <Card sx={{ mt: 2, p: 5 }}>
            <Grid container spacing={2}>

                <Grid item xs={12} sm={12}>
                    <Box display="flex" justifyContent="space-between" mb={2}>
                        <Typography variant="h6">Booking Status</Typography>
                    </Box>
                </Grid>

                {/* Table */}
                <Grid item xs={12} md={12}>
                    <DataTable
                        value={memberData}
                        paginator
                        rows={10}
                        size="small"
                        dataKey="id"
                        filters={filters}
                        filterDisplay="row"
                        loading={loading}
                        emptyMessage="No records found"
                        showGridlines
                        stripedRows
                    >
                        <Column
                            field="bookingDate"
                            header="Date"
                            sortable
                            filter
                            filterPlaceholder="Filter by Date"
                            style={{ minWidth: "12rem" }}
                        />
                        <Column
                            field="bookingPackageId"
                            header="Package ID"
                            style={{ minWidth: "12rem" }}
                        />
                        <Column
                            field="bookingPackageName"
                            header="Package Name"
                            sortable
                            filter
                            filterPlaceholder="Filter by Package Name"
                            style={{ minWidth: "12rem" }}
                        />
                        <Column
                            field="bookingMemberName"
                            header="Member Name"
                            sortable
                            filter
                            filterPlaceholder="Filter by Member Name"
                            style={{ minWidth: "12rem" }}
                        />
                        <Column
                            field="bookingBranch"
                            header="Branch"
                            sortable
                            filter
                            filterPlaceholder="Filter by Branch"
                            style={{ minWidth: "12rem" }}
                        />
                        <Column
                            field="bookingFloor"
                            header="Floor"
                            sortable
                            filter
                            filterPlaceholder="Filter by Floor"
                            style={{ minWidth: "12rem" }}
                        />
                        <Column
                            field="bookingRoom"
                            header="Room"
                            style={{ minWidth: "12rem" }}
                        />
                        <Column
                            field="bookingBookingDate"
                            header="Booking Date"
                            style={{ minWidth: "12rem" }}
                        />
                        <Column
                            field="bookingBookingTime"
                            header="Booking Time"
                            style={{ minWidth: "12rem" }}
                        />
                        <Column
                            field="bookingStatus"
                            header="Status"
                            sortable
                            style={{ minWidth: "12rem" }}
                        />
                    </DataTable>
                </Grid>

            </Grid>
        </Card>
    </Box>
  );
};