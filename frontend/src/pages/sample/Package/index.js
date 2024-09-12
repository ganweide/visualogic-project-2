import React, {useState, useEffect, useCallback} from 'react'
import { useDropzone } from 'react-dropzone';
import { makeStyles } from "@material-ui/core/styles";
import { 
  Box,
  Card,
  Grid,
  Typography,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Switch,
  IconButton,
  DialogActions,
  Divider,
 } from '@mui/material'
 import { 
  PersonAdd as PersonAddIcon,
  Edit as EditIcon 
} from '@mui/icons-material';
import axios from 'axios';
import Styles from './style';

const packageURL = 'http://localhost:5000/package';
const branchURL = 'http://localhost:5000/branch';
const useStyles = makeStyles(Styles);

const Package = () => {
  const classes = useStyles();
  const tableHead = ["Package Name", "Price", "Number of Time", "Order", "Status"];
  const [packageData, setPackageData] = useState([]);
  const [filteredPackageData, setFilteredPackageData] = useState([]);
  const [branchData, setBranchData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Dialog States
  const [openAddNewPackage, setOpenAddNewPackage] = useState(false);
  const [dialogPackageName, setDialogPackageName] = useState("");
  const [dialogPackageCode, setDialogPackageCode] = useState("");
  const [dialogPrice, setDialogPrice] = useState("");
  const [dialogCategory, setDialogCategory] = useState("");
  const [dialogPicture, setDialogPicture] = useState("");
  const [dialogFinancialInfo, setDialogFinancialInfo] = useState("");
  const [dialogOrder, setDialogOrder] = useState("");
  const [dialogActiveSwitch, setDialogActiveSwitch] = useState(false);

  // States for handling checkboxes and inputs
const [dialogNumberOfTime, setDialogNumberOfTime] = useState("");
const [dialogTransferableSwitch, setDialogTransferableSwitch] = useState(false);
const [dialogIndividualPackageSwitch, setDialogIndividualPackageSwitch] = useState(false);
const [isPromotion, setIsPromotion] = useState(false);  // Promotion checkbox state
const [dialogPromoTime, setDialogPromoTime] = useState("");
const [dialogPromoPeriodFrom, setDialogPromoPeriodFrom] = useState("");
const [dialogPromoPeriodTo, setDialogPromoPeriodTo] = useState("");
const [isAllBranch, setIsAllBranch] = useState(false);  // All Branch checkbox state
const [dialogBranch, setDialogBranch] = useState("");
const [isUnlimited, setIsUnlimited] = useState(false);  // Unlimited checkbox state

// Filter States
const [packageNameFilter, setPackageNameFilter] = useState("");
const [priceFilter, setPriceFilter] = useState("");
const [sortOrderFilter, setSortOrderFilter] = useState("");
const [statusFilter, setStatusFilter] = useState("");

  // Fetch Package Data from API
  useEffect(() => {
    axios.get(packageURL)
    .then((response) => {
      setPackageData(response.data);
      setFilteredPackageData(response.data);
    })
    .catch((error) => {
      console.error('Error fetching data', error);
    });

    axios.get(branchURL).then((response) => {
      setBranchData(response.data);
    });
  }, []);

  // Handle Dialog Input Change
  const handleDialogInputChange = (e, prop) => {
    const value = e.target.value;
    switch (prop) {
      case "packageName":
        setDialogPackageName(value);
        break;
        case "packageCode":
          setDialogPackageCode(value);
          break;
      case "price":
        setDialogPrice(value);
        break;
      case "category":
        setDialogCategory(value);
        break;
        case "numberOfTime":
          setDialogNumberOfTime(value);
          break;
        case "promoTime":
          setDialogPromoTime(value);
          break;
        case "promoPeriodFrom":
          setDialogPromoPeriodFrom(value);
          break;
        case "promoPeriodTo":
          setDialogPromoPeriodTo(value);
          break;
        case "branch":
          setDialogBranch(value);
          break;
      case "picture":
        setDialogPicture(value);
        break;
      case "financialInfo":
        setDialogFinancialInfo(value);
        break;
      case "order":
        setDialogOrder(value);
        break;
      case "active":
        setDialogActiveSwitch(!dialogActiveSwitch);
        break;
      default:
        break;
    }
  };

  // Handle Unlimited Checkbox Change
  const handleUnlimitedChange = () => {
    setDialogNumberOfTime("");  // Clear number of time when unlimited is checked
    setIsUnlimited(!isUnlimited);
  };

  // Handle Promotion Checkbox Change
  const handlePromotionChange = (event) => {
    setIsPromotion(event.target.checked);
  };

  // Handle All Branch Checkbox Change
  const handleAllBranchChange = () => {
    setDialogBranch("");  // Clear branch when "All Branch" is checked
    setIsAllBranch(!isAllBranch);
  };

  // Handle Transferable Switch Change
  const handleTransferableSwitchChange = () => {
    setDialogTransferableSwitch(!dialogTransferableSwitch);
  };

  // Handle Individual Package Switch Change
  const handleIndividualPackageSwitchChange = () => {
    setDialogIndividualPackageSwitch(!dialogIndividualPackageSwitch);
  };

  // Handle Active Switch Change
  const handleActiveSwitchChange = () => {
    setDialogActiveSwitch(!dialogActiveSwitch);
  };

  // Handle Open Add New Package Dialog
  const handleOpenAddNewPackage = () => {
    setOpenAddNewPackage(true);
  }

  // Handle Close Add New Package Dialog
  const handleCloseAddNewPackage = () => {
    setOpenAddNewPackage(false);
  }

  // Handle Save New Package
  const handleSaveNewPackage = async () => {
    try{
      const data = {
        packageName: dialogPackageName,
        packageCode: dialogPackageCode,
        price: dialogPrice,
        category: dialogCategory,
        picture: dialogPicture,
        financialInfo: dialogFinancialInfo,
        order: dialogOrder,
        active: dialogActiveSwitch,
        numberOfTime: dialogNumberOfTime,
        transferable: dialogTransferableSwitch,
        individualPackage: dialogIndividualPackageSwitch,
        promotion: isPromotion,
        promoTime: dialogPromoTime,
        promoPeriodFrom: dialogPromoPeriodFrom,
        promoPeriodTo: dialogPromoPeriodTo,
        allBranch: isAllBranch,
        branch: dialogBranch,
      };

      const response = await axios.post(packageURL, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const newPackage = response.data;
      alert("New Package Added Successfully");
      console.log('New package added: ',newPackage);
      setRefreshTable(response.data);
      handleCloseAddNewPackage();
    } catch (error) {
      alert("Failed to add new package");
      console.error('Error: ', error);
    }
  };

  // Image Dropzone
  const onDrop = useCallback((acceptedFiles) => {
    const image = acceptedFiles[0];
    setDialogPicture(URL.createObjectURL(image));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
   });

  // Change Rows Per Page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  // Handle filter data
  useEffect(() => {
    let filterPackageData = [...packageData];

    if (packageNameFilter) {
      filterPackageData = filterPackageData.filter((packages) =>
        packages.packageName.toLowerCase().includes(packageNameFilter.toLowerCase())
      );
    }

    if (priceFilter) {
      filterPackageData = filterPackageData.filter((packages) =>
        packages.price.toLowerCase().includes(priceFilter.toLowerCase())
      );
    }

    if (sortOrderFilter) {
      filterPackageData = filterPackageData.filter((packages) =>
        (packages.sortOrder||'').includes(sortOrderFilter)
      );
    }

    if (statusFilter) {
      filterPackageData = filterPackagesData.filter((packages) =>
        packages.status === "Active" ? packages.activeSwitch : !packages.activeSwitch
      );
    }

    setFilteredPackageData(filterPackageData);
  }, [
    packageNameFilter, 
    priceFilter, 
    sortOrderFilter, 
    statusFilter, 
    packageData
  ]);

  return (
    <Box>
      <Card sx={{mt:2, p:5}}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            {/* Header */}
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="h1">Package</Typography>
              {/* Add Button */}
              <Button
              variant="outlined"
              startIcon={<PersonAddIcon/>}
              onClick={handleOpenAddNewPackage}
              >
                Add Package
              </Button>
            </Box>
            {/* Package Filter */}
            <Grid container spacing={2} mb={2}>
              <Grid item xs={12} md={2.3}>
                <TextField
                label="Package Name"
                variant="outlined"
                fullWidth
                value={packageNameFilter}
                onChange={(e) => setPackageNameFilter(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={2.3}>
                <TextField
                  label="Price"
                  variant="outlined"
                  fullWidth
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={2.3}>
              </Grid>
              <Grid item xs={12} md={2.3}>
              <TextField
                  label="Order"
                  variant="outlined"
                  fullWidth
                  value={sortOrderFilter}
                  onChange={(e) => setSortOrderFilter(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={2.3}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    label="Status"
                  >
                    <MenuItem value="">
                      <em>All</em>
                    </MenuItem>
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Inactive">Inactive</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            {/* Package Table */}
            <Grid container spacing={2} mb={2}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow className={classes.tableHeadRow}>
                      {tableHead.map((prop) => (
                        <TableCell
                          className={classes.tableCell + classes.tableHeadCell}
                          key={prop}
                          style={{ textAlign: "left",
                           }}
                        >
                        {prop}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredPackageData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((packages)=>(
                      <TableRow key={packages.id}>
                        <TableCell>{packages.packageName}</TableCell>
                        <TableCell>{packages.price}</TableCell>
                        <TableCell>{packages.numberOfTime}</TableCell>
                        <TableCell>{packages.order}</TableCell>
                        <TableCell>
                          <Switch checked={packages.gender} disabled />
                        </TableCell>
                        <TableCell>
                          <IconButton>
                            <EditIcon/>
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <TablePagination
                component="div"
                count={filteredPackageData.length}
                page={page}
                //onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableContainer>
            </Grid>
          </Grid>
        </Grid>
      </Card>
      {/* Add New Package Dialog */}
      <Dialog
        fullWidth
        maxWidth="md"
        open={openAddNewPackage}
        onClose={handleCloseAddNewPackage}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle variant='h2'>Create Package</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Typography variant='h4'>Package Setup</Typography>
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
              label="Package Name"
              variant="outlined"
              fullWidth
              value={dialogPackageName}
              onChange={(e) => setDialogPackageName(e,"packageName")}
              margin="dense"
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                label="Package Code"
                variant="outlined"
                fullWidth
                value={dialogPackageCode}
                onChange={(e)=>setDialogPackageCode(e,"packageCode")}
                margin="dense"
                />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
              label="Price(RM)"
              variant="outlined"
              fullWidth
              value={dialogPrice}
              onChange={(e) => setDialogPrice(e,"price")}
              margin="dense"
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <FormControl fullWidth margin="dense">
                <InputLabel>Category</InputLabel>{" "}
                <Select
                value={dialogCategory}
                onChange={(e) => handleDialogInputChange(e, "category")}
                label="Category"
                >
                  <MenuItem value="">
                  <em>None</em>
                  </MenuItem>
                  <MenuItem value="Single Steam">Single Steam</MenuItem>
                  <MenuItem value="Voucher">Voucher</MenuItem>
                  <MenuItem value="Normal">Normal</MenuItem>
                  <MenuItem value="Promotion">Promotion</MenuItem>
                </Select>
              </FormControl>
            </Grid>
              {/* Conditionally Render Number of Times Input if Unlimited is NOT checked */}
              <Grid item xs={4} md={4}>
              {!isUnlimited && (
                  <TextField
                    fullWidth
                    label="Number of Times"
                    type="number"
                    variant="outlined"
                    value={dialogNumberOfTime}
                    onChange={(e) => handleDialogInputChange(e, "numberOfTime")}
                    margin="dense"
                  />
              )}
              </Grid>
              {/* Unlimited Checkbox */}
              <Grid item xs={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      display="flex"
                      alignItems="center"
                      checked={isUnlimited}
                      onChange={handleUnlimitedChange}
                      name="unlimited"
                      value="unlimited"
                    />
                  }
                  label="Unlimited"
                />
              </Grid>
            {/* Transferable Switch */}
              <Grid item xs={6} md={6}>
                <Box display="flex" alignItems="center" mt={2}>
                  <Typography>Transferable</Typography>
                  <Switch
                    checked={dialogTransferableSwitch}
                    onChange={handleTransferableSwitchChange}
                  />
                </Box>
              </Grid>

              {/* Individual Package Switch */}
              <Grid item xs={6} md={6}>
                <Box display="flex" alignItems="center" mt={2}>
                  <Typography>Individual Package</Typography>
                  <Switch
                    checked={dialogIndividualPackageSwitch}
                    onChange={handleIndividualPackageSwitchChange}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography variant='h4'>Promotion</Typography>
            </Grid>

              {/* Promotion Checkbox */}
                <Grid item xs={3}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isPromotion}
                        onChange={handlePromotionChange}
                        name="promotion"
                        value="promotion"
                      />
                    }
                    label="Promotion"
                  />
                </Grid>

                {/* Conditionally Render Promo Inputs if Promotion is Checked */}
                {isPromotion && (
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                      <TextField
                        label="Promo Time"
                        variant="outlined"
                        fullWidth
                        value={dialogPromoTime}
                        onChange={(e) => handleDialogInputChange(e, "promoTime")}
                        margin="dense"
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        label="Promo Period From"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        fullWidth
                        value={dialogPromoPeriodFrom}
                        onChange={(e) => handleDialogInputChange(e, "promoPeriodFrom")}
                        margin="dense"
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        label="Promo Period To"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        fullWidth
                        value={dialogPromoPeriodTo}
                        onChange={(e) => handleDialogInputChange(e, "promoPeriodTo")}
                        margin="dense"
                      />
                    </Grid>
                  </Grid>
                )}
              <Grid item xs={12} md={12}>
                <Divider />
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography variant='h4'>Branches</Typography>
              </Grid>
              {/* All Branch Checkbox */}
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isAllBranch}
                        onChange={handleAllBranchChange}
                        name="All Branch"
                        value="All Branch"
                      />
                    }
                    label="All Branch"
                  />
                </Grid>
                {/* Conditionally Render Branch Input if All Branch is NOT checked */}
                {!isAllBranch && (
                  <Grid item xs={12} md={12}>
                    <FormControl fullWidth margin="dense">
                      <InputLabel>Branch</InputLabel>
                      <Select
                        value={dialogBranch}
                        onChange={(e) => handleDialogInputChange(e, "branch")}
                        label="Branch"
                      >
                        {branchData.map((branch) => (
                          <MenuItem key={branch.id} value={branch.name}>
                            {branch.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                )}
                <Grid item xs={12} md={12}>
                <Divider />
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography variant='h4'>Package Image</Typography>
              </Grid>
            <Grid item xs={12} md={12}>
                  <Box
                    {...getRootProps()}
                    sx={{
                      border: '2px dashed #cccccc',
                      borderRadius: '4px',
                      padding: '20px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      backgroundColor: isDragActive ? '#eeeeee' : '#fafafa',
                    }}
                  >
                    <input {...getInputProps()} />
                    {dialogPicture ? (
                      <img
                        src={dialogPicture}
                        alt="Preview"
                        style={{ maxWidth: '100%', maxHeight: '100%' }}
                      />
                    ) : isDragActive ? (
                      <Typography>Drop the image here ...</Typography>
                    ) : (
                      <Typography>Drag &apos;n&apos; drop an image here, or click to select one</Typography>
                    )}
                  </Box>
                </Grid>
                <Grid item xs={12} md={12}>
                <Divider />
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography variant='h4'>Others</Typography>
              </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                label="Order"
                variant="outlined"
                fullWidth
                value={dialogOrder}
                onChange={(e) => handleDialogInputChange(e, "order")}
                margin="dense"
              />
            </Grid>
            <Grid item xs={1} md={1}>
              </Grid>
            <Grid item xs={5} md={5}>
              <Box display="flex" alignItems="center" mt={2}>
                
                <Typography>Active/Inactive</Typography>
                <Switch
                  checked={dialogActiveSwitch}
                  onChange={handleActiveSwitchChange}
                />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddNewPackage} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveNewPackage} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>

  );
};

export default Package