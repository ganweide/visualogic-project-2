import React, { useState } from 'react'; 
import { OrganizationChart } from 'primereact/organizationchart'; 
import mlmData from './mlmData.json'; 
import { Box, Grid } from '@mui/material';

const OrgChart = () => {

    // Use custom hook to fetch member data
    // const [{ apiData: memberDatabase, loading, error }, { reCallAPI }] = useGetDataApi(
    //     'http://localhost:5000/api/mlm/',  // The backend API endpoint
    //     [],  // Initial data (empty array)
    //     {},  // Any additional options for fetch (e.g., headers)
    //     true  // Auto-fetch when the component mounts
    // );

    // State to track selected nodes in the chart
    const [selection, setSelection] = useState([]);

    // Function to customize the appearance of each node in the organization chart
    const nodeTemplate = (node) => {

        // Check if the node's type is 'person' to apply custom layout for person nodes
        if (node.type === 'person') {
            return (
                <Box>
                    <Grid item xs={12} md={12}>
                        <img 
                            alt={node.data.name}  // Alt text for the image
                            src={node.data.image}  // Image source from the node's data
                            className="mb-3 w-3rem h-3rem"  // Add some margin and size to the image
                            width= "50px"  // Set image width to 50px
                            height= "50px"  // Set image height to 50px
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <span className="font-bold mb-2"> {/* Bold text for the person's name */}
                            {node.data.name} {/* Name from the node's data */}
                        </span>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <span>
                            {node.data.title} {/* Title from the node's data */}
                        </span>
                    </Grid>
                </Box>
            );
        }

        // If the node is not a 'person' type, just return its label
        return node.label;
    };

    return (
        <Box className="card overflow-x-auto"> {/* A wrapper with overflow control */}
            {/* OrganizationChart component from PrimeReact */}
            <OrganizationChart

                // Pass the organizational chart data from the imported JSON file
                value={mlmData}

                // Allows selecting multiple nodes
                selectionMode="multiple"

                // Pass the selection state to the chart
                selection={selection}

                // Update the selection state when nodes are selected
                onSelectionChange={(e) => setSelection(e.data)}

                // Custom template for rendering each node   
                nodeTemplate={nodeTemplate}
            />
        </Box>
    );
}

export default OrgChart;


