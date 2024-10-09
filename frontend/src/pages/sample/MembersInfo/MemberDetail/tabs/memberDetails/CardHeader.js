import React from 'react';
import {Box, alpha} from '@mui/material';
// import AttachFileIcon from '@mui/icons-material/AttachFile';
// import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import EditOutlined from '@mui/icons-material/EditOutlined';
import IntlMessages from '@enjoey/utility/IntlMessages';
// import {useDropzone} from 'react-dropzone';
import PropTypes from 'prop-types';
import {Fonts} from 'shared/constants/AppEnums';
import IconButton from '@mui/material/IconButton';
import {blue} from '@mui/material/colors';

const CardHeader = (props) => {
  const {member, isViewOnly, onViewOnly} = props;

  return (
    <Box
      sx={{
        py: 2,
        px: {xs: 5, lg: 8, xl: 2},
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
        }}
      >
        <Box
          component='h5'
          sx={{
            pr: 2,
            mt: 0,
            mb: 0,
            fontWeight: Fonts.BOLD,
            fontSize: 16,
          }}
        >
          {isViewOnly ? (
            <IntlMessages id='common.personalInfo' />
          ) : (
            <IntlMessages id='schoolApp.editProfile' />
          )}
        </Box>

        {member.hqStatus && (
          <Box
            component='span'
            sx={{
              px: 3,
              py: 0,
              mr: 3,
              color: blue[500],
              borderRadius: '30px',
              fontSize: 12,
              fontWeight: Fonts.SEMI_BOLD,
              bgcolor: alpha(blue[500], 0.1),
            }}
          >
            {'HQ'}
          </Box>
        )}
      </Box>
      <Box
        sx={{
          pl: 2,
          mr: {xs: -2, lg: -3, xl: -4},
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box>
          {isViewOnly ? (
            <IconButton
              onClick={() => onViewOnly(false)}
              sx={{
                color: (theme) => theme.palette.text.secondary,
              }}
            >
              <EditOutlined />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => onViewOnly(true)}
              sx={{
                color: (theme) => theme.palette.text.secondary,
              }}
            >
              <CloseOutlinedIcon />
            </IconButton>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default CardHeader;

CardHeader.propTypes = {
  onClickDeleteIcon: PropTypes.func,
  onAddAttachments: PropTypes.func,
  isViewOnly: PropTypes.bool,
  onViewOnly: PropTypes.func,
  member: PropTypes.object,
};
