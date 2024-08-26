import React from 'react';
import {useThemeContext} from '../../../../utility/AppContextProvider/ThemeContextProvider';
import {Box, alpha} from '@mui/material';
// import {ReactComponent as Logo} from '../../../../../assets/icon/ptc-logo.png';
// import {ReactComponent as LogoText} from '../../../../../assets/icon/En-Joey-Logo_text.svg';

const AppLogo = () => {
  const {theme} = useThemeContext();

  return (
    <Box
      sx={{
        height: {xs: 56, sm: 70},
        padding: 2.5,
        display: 'flex',
        flexDirection: 'row',
        cursor: 'pointer',
        alignItems: 'center',
        justifyContent: 'center',
        '& svg': {
          height: {xs: 40, sm: 45, md: 80},
        },
        '& img': {
          height: {xs: 40, sm: 45, md: 80},
        },
      }}
      className='app-logo'
    >
      <img src="/assets/sample-vertical-logo.png" />
      {/* <Logo fill={theme.palette.primary.main} /> */}
      {/* <Box
        sx={{
          mt: 6,
          display: {xs: 'none', md: 'block'},
          '& svg': {
            height: {xs: 25, sm: 60},
          },
        }}
      >
        <LogoText fill={alpha(theme.palette.text.primary, 0.8)} />
      </Box> */}
    </Box>
  );
};

export default AppLogo;
