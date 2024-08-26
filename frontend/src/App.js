import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AuthRoutes from '@enjoey/utility/AuthRoutes';
import AppContextProvider from '@enjoey/utility/AppContextProvider';
import AppThemeProvider from '@enjoey/utility/AppThemeProvider';
import AppStyleProvider from '@enjoey/utility/AppStyleProvider';
import AppLocaleProvider from '@enjoey/utility/AppLocaleProvider';
import AppLayout from '@enjoey/core/AppLayout';
import AwsAuthProvider from '@enjoey/services/auth/aws-cognito/AWSAuthProvider';
// import AuthRole from '@enjoey/utility/AuthRole';
import {BrowserRouter} from 'react-router-dom';

const App = () => (
  <AppContextProvider>
    <AppThemeProvider>
      <AppStyleProvider>
        <AppLocaleProvider>
          <BrowserRouter>
            <AwsAuthProvider>
              <AuthRoutes>
                <CssBaseline />
                <AppLayout />
              </AuthRoutes>
            </AwsAuthProvider>
          </BrowserRouter>
        </AppLocaleProvider>
      </AppStyleProvider>
    </AppThemeProvider>
  </AppContextProvider>
);

export default App;
