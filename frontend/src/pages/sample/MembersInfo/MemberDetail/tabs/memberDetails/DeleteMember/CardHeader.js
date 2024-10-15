import React from 'react';
import Box from '@mui/material/Box';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import PropTypes from 'prop-types';
import { Fonts } from 'shared/constants/AppEnums';
import IconButton from '@mui/material/IconButton';
import EditOutlined from '@mui/icons-material/EditOutlined';

const CardHeader = ({ onCloseAddCard, title, isViewOnly, onViewOnly }) => {
  return (
    <Box
      sx={{
        py: 2,
        px: { xs: 5, lg: 8, xl: 10 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
        backgroundColor: (theme) => theme.palette.warning.main,
      }}
    >
      <Box
        component='h5'
        sx={{
          pr: 2,
          m: 0,
          fontWeight: Fonts.BOLD,
          fontSize: 16,
          color: (theme) => theme.palette.warning.contrastText,
        }}
      >
        {title}
      </Box>
      <Box
        sx={{
          pl: 2,
          mr: { xs: -2, lg: -3, xl: -4 },
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box>
          {isViewOnly && (
            <IconButton
              onClick={() => onViewOnly(false)}
              sx={{
                color: (theme) => theme.palette.primary.contrastText,
              }}
              aria-label="Edit"
            >
              <EditOutlined />
            </IconButton>
          )}
          <IconButton
            onClick={onCloseAddCard}
            sx={{
              color: (theme) => theme.palette.primary.contrastText,
            }}
            aria-label="Close"
          >
            <CloseOutlinedIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

CardHeader.propTypes = {
  onCloseAddCard: PropTypes.func.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  isViewOnly: PropTypes.bool,
  onViewOnly: PropTypes.func,
};

export default CardHeader;
