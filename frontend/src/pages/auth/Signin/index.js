import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import AuthWrapper from "../AuthWrapper";
import SigninAwsCognito from "./SigninAwsCognito";
import AppLogo from "@enjoey/core/AppLayout/components/AppLogo";

const Signin = () => {
  return (
    //<AuthWrapper>
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card
        sx={{ width: "100%", maxWidth: 400, padding: 4, textAlign: "center" }}
      >
        <CardContent>
          <Box sx={{ mb: 5, display: "flex", justifyContent: "center" }}>
            <AppLogo />
          </Box>

          <SigninAwsCognito />
        </CardContent>
      </Card>
    </Box>
    //</AuthWrapper>
  );
};

export default Signin;
