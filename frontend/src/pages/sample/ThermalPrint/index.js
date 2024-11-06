import React, { useState, useRef } from 'react';
import { 
    Box, 
    Typography, 
    Button, 
    Paper,
    Divider,
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField
} from '@mui/material';
import jsPDF from 'jspdf';
import invoiceData from './invoiceData.json';

const Invoice = () => {
  const componentRef = useRef();
  const [open, setOpen] = useState(false);
  const [fileName, setFileName] = useState('invoice.pdf');

  // Get current date and time
  const currentDate = new Date();
  const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;

//   // Print function for thermal printer
//   const handlePrintToThermalPrinter = () => {
//     let invoiceContent = `
//       ${invoiceData.company.name}
//       ${invoiceData.company.address}

      
//       ${invoiceData.invoiceDetails.invoiceName}
//       Invoice #: ${invoiceData.invoiceDetails.invoiceNumber}
//       Date: ${formattedDate}
//       Transaction By: ${invoiceData.invoiceDetails.transactionBy}

//       Qty   Description          Amt (RM)
//     `;

//     invoiceData.items.forEach((item, index) => {
//       invoiceContent += `${index + 1}    ${item.description}     ${item.price.toFixed(2)}\n`;
//     });

//     invoiceContent += `
//       Subtotal: ${invoiceData.total.subtotal.toFixed(2)}
//       Total: ${invoiceData.total.total.toFixed(2)}
//       Payment Method: ${invoiceData.total.paymentMethod}
//       Paid: ${invoiceData.total.paid.toFixed(2)}
//       Change: ${invoiceData.total.change.toFixed(2)}
      
//       Thank you and see you again!
//       FB: anran.malaysia
//     `;

//     // Print the invoice to the thermal printer
//     printToThermal(invoiceContent);
//   };

// Define column widths
const quantityWidth = 5; // Width for quantity column

const handlePrintToThermalPrinter = () => {
    // Initialize receipt with header
    let invoiceContent = ``;

        // Format each item line
        invoiceData.items.forEach((item, index) => {
            const quantity = (index + 1).toString().padEnd(quantityWidth); // Quantity column
            const description = item.description; // Description column with padding
            const price = item.price.toFixed(2); // Price right-aligned
        
            // Combine the formatted strings for this item
            invoiceContent += `\t${quantity}${description}\t\t\t${price}\n`;
        });

        // Add the footer with total and payment details
    invoiceContent += `
    ---------------------------------------------
        Subtotal:               ${invoiceData.total.subtotal.toFixed(2)}
    ---------------------------------------------
        Total:                  ${invoiceData.total.total.toFixed(2)}     
        ${invoiceData.total.paymentMethod}\t\t\t${invoiceData.total.paid.toFixed(2)}
        Change:                 ${invoiceData.total.change.toFixed(2)}     
    ---------------------------------------------
        Discount Summary\tAmount
        Total Discount:         ${invoiceData.discount.total.toFixed(2)}
    `;
    // Print the invoice to the thermal printer
    printToThermal(invoiceContent);
  };

// const vendorId = 0x0483;
// const line = '='.repeat(45) + "\n";
// const dash = '-'.repeat(45) + "\n";

// const printToThermal = async (content) => {
//     try {
//         // Request USB device
//         const device = await navigator.usb.requestDevice({ filters: [{ vendorId }] }); 
//         console.log(device);
//         // Error in this open() function where chrome doesn't want to open the device (Solved by installing driver using zadig)
//         await device.open(); // Open the device

//         // Select configuration and claim the interface
//         await device.selectConfiguration(1);
//         await device.claimInterface(0);

//         // Construct ESC/POS commands
//         const commands = new Uint8Array([
//             0x1B, 0x40,                        // Initialize printer
//             0x1B, 0x45, 0x01,                  // Bold on
//             0x1B, 0x61, 0x01,                  // Center alignment
//             ...new TextEncoder().encode(invoiceData.company.name + "\n"), // Print company name
//             0x1B, 0x45, 0x00,                  // Bold off
//             ...new TextEncoder().encode(invoiceData.company.address + "\n"), // Print company address
//             ...new TextEncoder().encode(line), // Print line of dashes
//             0x1B, 0x45, 0x01,                  // Bold on
//             0x1D, 0x21, 0x11,                  // Double height and width
//             ...new TextEncoder().encode(invoiceData.invoiceDetails.invoiceName.toUpperCase() + "\n"),
//             0x1D, 0x21, 0x00,                  // Reset to normal size
//             0x1B, 0x45, 0x00,                  // Bold off
//             ...new TextEncoder().encode("Invoice #:" + invoiceData.invoiceDetails.invoiceNumber + "\n"),
//             0x1B, 0x61, 0x00,                  // Left alignment for the rest of the content
//             ...new TextEncoder().encode("\tDate: " + formattedDate + "\n"),
//             ...new TextEncoder().encode("\tTransaction By: " + invoiceData.invoiceDetails.transactionBy + "\n\n"),
//             0x1B, 0x61, 0x01,                  // Center alignment
//             ...new TextEncoder().encode(line), // Print line of dashes
//             0x1B, 0x61, 0x00,                  // Left alignment for the rest of the content
//             ...new TextEncoder().encode("\tQty    Description\tAmt (RM)\n"),
//             0x1B, 0x61, 0x01,                  // Center alignment
//             ...new TextEncoder().encode(dash), // Print line of dashes
//             0x1B, 0x61, 0x00,                  // Left alignment for the rest of the content
//             ...new TextEncoder().encode(content + "\n"), // Invoice content
//             0x1B, 0x61, 0x01,                  // Center alignment
//             ...new TextEncoder().encode(line), // Print line of dashes
//             ...new TextEncoder().encode("Thank you and see you again!\n"),
//             ...new TextEncoder().encode("FB: anran.malaysia\n"),
//             ...new TextEncoder().encode(line), // Print line of dashes
//             0x0A,0x0A,0x0A,0x0A,0x0A,          // Additional line feeds (adjust as necessary)
//             0x1D, 0x56, 0x00,                  // Full cut
//             0x1B, 0x42, 0x03, 0x01             // Beep 3 times with 1/10 second duration
//         ]);

//         // Send data to the printer
//         await device.transferOut(1, commands); // The endpoint number may vary, ensure you check the printer's documentation

//         // Close the device after printing
//         await device.close();
//     } catch (error) {
//         console.error('Error printing to thermal printer:', error);
//     }
// };

const printToThermal = async (content) => {
    try {
        const response = await fetch('http://localhost:3001/print', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ipAddress: '192.168.1.11',  // Replace with printer's IP
                printerPort: 9100,          // Replace with printer's port
                content: content,           // The content to print
                invoiceData: invoiceData
            })
        });

        if (response.ok) {
            console.log('Print job sent successfully');
        } else {
            console.error('Failed to print');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};



  // PDF generation function with file name prompt
  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleDownloadPdf = () => {
    const doc = new jsPDF();
    doc.html(componentRef.current, {
      callback: (doc) => {
        doc.save(fileName);
        handleCloseDialog();
      },
      x: 10,
      y: 10,
      html2canvas: {
        scale: 0.48
      }
    });
  };


  return (
    <Box sx={{ width: '100%', maxWidth: '380px', margin: 'auto' }}>
      <Paper ref={componentRef} sx={{ padding: '16px', background: '#fff' }}>
        <Typography 
            variant="h6" 
            align="center">
                <strong>{invoiceData.company.name}</strong>
        </Typography>
        <Typography 
            variant="body2" 
            align='center'
        >
                {invoiceData.company.address}
        </Typography>

        <Divider sx={{ margin: '5px', marginBottom:'2px' }} />
        <Divider sx={{ margin: '5px', marginTop: '2px' }} />

        <Typography 
            variant="h2" 
            align={"center"}
        >
                {invoiceData.invoiceDetails.invoiceName}
        </Typography>
        <Typography 
            variant="body1" 
            align={"center"}
        >
                Invoice #: {invoiceData.invoiceDetails.invoiceNumber}
        </Typography>
        <Typography 
            variant="body1"
        >
                Date: {formattedDate}
        </Typography>
        <Typography 
            variant="body1"
        >
                Transaction By: {invoiceData.invoiceDetails.transactionBy}
        </Typography>
        <Divider sx={{ margin: '12px 0' }} />
        <Grid container>
            <Grid item xs={12} sm={6} align={"left"}>
                <Typography 
                    variant="h6"
                >
                    Qty Description
                </Typography>
            </Grid>
            <Grid item xs={12} sm={6} align={"right"}>
                <Typography 
                    variant="h6"
                >
                    Amt (RM)
                </Typography>
            </Grid>
        </Grid>
        
        {invoiceData.items.map((item, index) => (
            <Grid container key={index}>
                <Grid item xs={12} sm={1}>
                <Typography 
                    variant="body2"
                    align="center"
                >
                    {index + 1}
                </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                <Typography 
                    variant="body2"
                >
                    {item.description}
                </Typography>
                </Grid>
                <Grid item xs={12} sm={5} align={"right"}>
                <Typography 
                    variant="body2"
                >
                    {item.price.toFixed(2)}
                </Typography>
                </Grid>
            </Grid>
        ))}
        <Divider sx={{ margin: '12px 0' }} />
        <Grid container>
            <Grid item xs={12} sm={6}>
                <Typography variant="body1">Subtotal:</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography 
                    variant="h6" 
                    align={"right"}>
                        {invoiceData.total.subtotal.toFixed(2)}
                </Typography>
            </Grid>
        </Grid>
        <Divider sx={{ margin: '12px 0' }} />
        <Grid container>
            <Grid item xs={12} sm={6}>
                <Typography variant="h4">Total:</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography 
                    variant="h4" 
                    align={"right"}>
                        {invoiceData.total.total.toFixed(2)}
                </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography variant="body1">{invoiceData.total.paymentMethod}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography 
                    variant="h6" 
                    align={"right"}>
                        {invoiceData.total.paid.toFixed(2)}
                </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography variant="h4">Change:</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography 
                    variant="h4" 
                    align={"right"}>
                        {invoiceData.total.change.toFixed(2)}
                </Typography>
            </Grid>
        </Grid>
        <Divider sx={{ margin: '12px 0' }} />

        <Grid container>
            <Grid item xs={12} sm={6}>
                <Typography variant="body1">Discount Summary</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography 
                    variant="h6" 
                    align={"right"}
                >
                        Amount
                </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography variant="body1">Total Discount:</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography 
                    variant="h6" 
                    align={"right"}>
                        {invoiceData.discount.total.toFixed(2)}
                </Typography>
            </Grid>
        </Grid>

        <Divider sx={{ margin: '12px 0' }} />
        
        <Typography 
            variant="body2" 
            align="center"
        >
                Thank you and see you again.
        </Typography>
        <Typography 
            variant="body2" 
            align="center"
        >
                FB: anran.malaysia
        </Typography>
      </Paper>
      
      <Box sx={{ marginTop: '16px', textAlign: 'center' }}>
        <Grid container>
            <Grid item xs={12} sm={6}>
                <Button variant="contained" align={"right"} onClick={handlePrintToThermalPrinter} sx={{ marginRight: '8px' }}>Print to POS</Button>
            </Grid>
            <Grid item xs={12} sm={6}>
            <Button variant="contained" align={"left"} onClick={handleOpenDialog}>Save as PDF</Button>
            </Grid>
        </Grid>
      </Box>

      {/* Save as PDF Dialog */}
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Save as PDF</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="File Name"
            type="text"
            fullWidth
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleDownloadPdf} variant="contained" color="primary">Save</Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
};

export default Invoice;
