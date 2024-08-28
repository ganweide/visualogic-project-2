import React, { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  cardContainer: {
    height: "100%",
    cursor: "pointer",
  },
  numberContainer: {
    marginTop: 8,
  },
  tableContainer: {
    marginTop: 16,
  },
}));

const Dashboard = () => {
  const classes = useStyles();

  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (cardName) => {
    setSelectedCard(cardName);
  };

  const renderTableContent = () => {
    switch (selectedCard) {
      case "Member Registered":
        return (
          <>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Mobile No</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Preferred Branch</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Replace with dynamic data */}
              <TableRow>
                <TableCell>2024-08-28</TableCell>
                <TableCell>John Doe</TableCell>
                <TableCell>1234567890</TableCell>
                <TableCell>johndoe@example.com</TableCell>
                <TableCell>Male</TableCell>
                <TableCell>Central Branch</TableCell>
              </TableRow>
            </TableBody>
          </>
        );
      case "Number of Staff":
        return (
          <>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Branch</TableCell>
                <TableCell>Mobile No</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Replace with dynamic data */}
              <TableRow>
                <TableCell>Jane Smith</TableCell>
                <TableCell>Female</TableCell>
                <TableCell>Manager</TableCell>
                <TableCell>North Branch</TableCell>
                <TableCell>0987654321</TableCell>
              </TableRow>
            </TableBody>
          </>
        );
      case "Package Registered":
        return (
          <>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Package Name</TableCell>
                <TableCell>Member Name</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Replace with dynamic data */}
              <TableRow>
                <TableCell>2024-08-28</TableCell>
                <TableCell>Gold Package</TableCell>
                <TableCell>John Doe</TableCell>
                <TableCell>10:00 AM</TableCell>
                <TableCell>$99</TableCell>
              </TableRow>
            </TableBody>
          </>
        );
      case "Current Duty Staff":
        return null; // Empty for now
      default:
        return null;
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        {/* First Row */}
        <Grid item xs={12} sm={6} md={3}>
          <Card
            className={classes.cardContainer}
            onClick={() => handleCardClick("Member Registered")}
          >
            <CardContent>
              <Typography variant="h6">Member Registered</Typography>
              <Box className={classes.numberContainer}>
                <Typography variant="h4" color="primary">
                  120
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            className={classes.cardContainer}
            onClick={() => handleCardClick("Number of Staff")}
          >
            <CardContent>
              <Typography variant="h6">Number of Staff</Typography>
              <Box className={classes.numberContainer}>
                <Typography variant="h4" color="primary">
                  45
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            className={classes.cardContainer}
            onClick={() => handleCardClick("Package Registered")}
          >
            <CardContent>
              <Typography variant="h6">Package Registered</Typography>
              <Box className={classes.numberContainer}>
                <Typography variant="h4" color="primary">
                  30
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            className={classes.cardContainer}
            onClick={() => handleCardClick("Current Duty Staff")}
          >
            <CardContent>
              <Typography variant="h6">Current Duty Staff</Typography>
              <Box className={classes.numberContainer}>
                <Typography variant="h4" color="primary">
                  12
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Second Row - Dynamic Table */}
      {selectedCard && (
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table>{renderTableContent()}</Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Dashboard;