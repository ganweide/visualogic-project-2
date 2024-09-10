import React, { useState, useEffect } from "react";
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
import tableStyle from "./style.js";

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    height: "100%",
    cursor: "pointer",
    border: "2px solid transparent",
  },
  activeCard: {
    border: "2px solid #3f51b5",
  },
  numberContainer: {
    marginTop: 8,
  },
  tableContainer: {
    marginTop: 16,
  },
  ...tableStyle(theme), // Include the table styles here
}));

const Dashboard = () => {
  const classes = useStyles();

  const [selectedCard, setSelectedCard] = useState("Member Registered");

  const handleCardClick = (cardName) => {
    setSelectedCard(cardName);
  };

  useEffect(() => {
    setSelectedCard("Member Registered");
  }, []);

  const renderTableContent = () => {
    switch (selectedCard) {
      case "Member Registered":
        return (
          <>
            <TableHead>
              <TableRow className={classes.tableHeadRow}>
                <TableCell
                  className={`${classes.tableHeadCell} ${classes.primaryTableHeader}`}
                >
                  Date
                </TableCell>
                <TableCell
                  className={`${classes.tableHeadCell} ${classes.primaryTableHeader}`}
                >
                  Name
                </TableCell>
                <TableCell
                  className={`${classes.tableHeadCell} ${classes.primaryTableHeader}`}
                >
                  Mobile No
                </TableCell>
                <TableCell
                  className={`${classes.tableHeadCell} ${classes.primaryTableHeader}`}
                >
                  Email
                </TableCell>
                <TableCell
                  className={`${classes.tableHeadCell} ${classes.primaryTableHeader}`}
                >
                  Gender
                </TableCell>
                <TableCell
                  className={`${classes.tableHeadCell} ${classes.primaryTableHeader}`}
                >
                  Preferred Branch
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow className={classes.tableBodyRow}>
                <TableCell className={classes.tableCell}>2024-08-28</TableCell>
                <TableCell className={classes.tableCell}>John Doe</TableCell>
                <TableCell className={classes.tableCell}>1234567890</TableCell>
                <TableCell className={classes.tableCell}>
                  johndoe@example.com
                </TableCell>
                <TableCell className={classes.tableCell}>Male</TableCell>
                <TableCell className={classes.tableCell}>
                  Central Branch
                </TableCell>
              </TableRow>
            </TableBody>
          </>
        );
      case "Number of Staff":
        return (
          <>
            <TableHead>
              <TableRow className={classes.tableHeadRow}>
                <TableCell
                  className={`${classes.tableHeadCell} ${classes.warningTableHeader}`}
                >
                  Name
                </TableCell>
                <TableCell
                  className={`${classes.tableHeadCell} ${classes.warningTableHeader}`}
                >
                  Gender
                </TableCell>
                <TableCell
                  className={`${classes.tableHeadCell} ${classes.warningTableHeader}`}
                >
                  Role
                </TableCell>
                <TableCell
                  className={`${classes.tableHeadCell} ${classes.warningTableHeader}`}
                >
                  Branch
                </TableCell>
                <TableCell
                  className={`${classes.tableHeadCell} ${classes.warningTableHeader}`}
                >
                  Mobile No
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow className={classes.tableBodyRow}>
                <TableCell className={classes.tableCell}>Jane Smith</TableCell>
                <TableCell className={classes.tableCell}>Female</TableCell>
                <TableCell className={classes.tableCell}>Manager</TableCell>
                <TableCell className={classes.tableCell}>
                  North Branch
                </TableCell>
                <TableCell className={classes.tableCell}>0987654321</TableCell>
              </TableRow>
            </TableBody>
          </>
        );
      case "Package Registered":
        return (
          <>
            <TableHead>
              <TableRow className={classes.tableHeadRow}>
                <TableCell
                  className={`${classes.tableHeadCell} ${classes.successTableHeader}`}
                >
                  Date
                </TableCell>
                <TableCell
                  className={`${classes.tableHeadCell} ${classes.successTableHeader}`}
                >
                  Package Name
                </TableCell>
                <TableCell
                  className={`${classes.tableHeadCell} ${classes.successTableHeader}`}
                >
                  Member Name
                </TableCell>
                <TableCell
                  className={`${classes.tableHeadCell} ${classes.successTableHeader}`}
                >
                  Time
                </TableCell>
                <TableCell
                  className={`${classes.tableHeadCell} ${classes.successTableHeader}`}
                >
                  Price
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow className={classes.tableBodyRow}>
                <TableCell className={classes.tableCell}>2024-08-28</TableCell>
                <TableCell className={classes.tableCell}>
                  Gold Package
                </TableCell>
                <TableCell className={classes.tableCell}>John Doe</TableCell>
                <TableCell className={classes.tableCell}>10:00 AM</TableCell>
                <TableCell className={classes.tableCell}>$99</TableCell>
              </TableRow>
            </TableBody>
          </>
        );
      case "Current Duty Staff":
        return null;
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
            className={`${classes.cardContainer} ${
              selectedCard === "Member Registered" ? classes.activeCard : ""
            }`}
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
            className={`${classes.cardContainer} ${
              selectedCard === "Number of Staff" ? classes.activeCard : ""
            }`}
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
            className={`${classes.cardContainer} ${
              selectedCard === "Package Registered" ? classes.activeCard : ""
            }`}
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
            className={`${classes.cardContainer} ${
              selectedCard === "Current Duty Staff" ? classes.activeCard : ""
            }`}
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
          <Table className={classes.table}>{renderTableContent()}</Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Dashboard;
