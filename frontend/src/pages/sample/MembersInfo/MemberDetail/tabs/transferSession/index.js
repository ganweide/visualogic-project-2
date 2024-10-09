import React, { useState,useRef } from "react";
import { 
    Box,
    Card,
    Grid,
    Typography,
 } from "@mui/material";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";


export default function TransferSession({selectedMember}) {
    const toast = useRef(null);

    const [filters, setFilters] = useState({
        transferDate: { value: null, matchMode: "contains" },
    });

    const [{apiData: memberData, loading}, {reCallAPI}] = useGetDataApi(
        `api/transfer/${selectedMember._id}`,
        {},
        {},
        true,
    );

return (
    <Box>
        <Toast ref={toast} />
        <Card>
            <Grid container spacing={2}>

                <Grid item xs={12} sm={12}>
                    <Box display="flex" justifyContent="space-between" mb={2}>
                        <Typography variant="h6">Transfer Session</Typography>
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
                            field="transferDate"
                            header="Date"
                            sortable
                            style={{ minWidth: "12rem" }}
                        />
                        <Column
                            field="transferId"
                            header="Transfer ID"
                            style={{ minWidth: "12rem" }}
                        />
                        <Column
                            field="transferTo"
                            header="Transfer To"
                            style={{ minWidth: "12rem" }}
                        />
                        <Column
                            field="transferPackageId"
                            header="Package ID"
                            style={{ minWidth: "12rem" }}
                        />
                        <Column
                            field="transferPackage"
                            header="Package"
                            style={{ minWidth: "12rem" }}
                        />
                        <Column
                            field="transferPoints"
                            header="Points"
                            style={{ minWidth: "12rem" }}
                        />
                    </DataTable>
                </Grid>

            </Grid>
        </Card>
    </Box>
  );
};