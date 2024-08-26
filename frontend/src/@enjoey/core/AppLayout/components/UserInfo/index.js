import React from 'react';
import orange from '@mui/material/colors/orange';
import {useAuthMethod, useAuthUser} from '../../../../utility/AuthHooks';
import {Box} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Fonts} from 'shared/constants/AppEnums';
import {useNavigate} from 'react-router-dom';
import PropTypes from 'prop-types';
import {useGetDataApi} from '@enjoey/utility/APIHooks';

const UserInfo = ({color}) => {
  const {logout} = useAuthMethod();
  const {user} = useAuthUser();
  const navigate = useNavigate();
  console.log('useAuthUser', user);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [{apiData: loggedUserData}] = useGetDataApi(
    '/user/user-info',
    {},
    {},
    true,
  );

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getUserAvatar = () => {
    if (user.displayName) {
      return user.displayName.charAt(0).toUpperCase();
    }
    if (user.email) {
      return user.email.charAt(0).toUpperCase();
    }
  };

  const getUserLogout = () => {
    console.log('getUserLogout');
    logout();
    navigate('/');
  };

  return (
    <>
      {loggedUserData?.id && (
        <Box
          onClick={handleClick}
          sx={{
            py: 3,
            px: 3,
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
          }}
          className='user-info-view'
        >
          <Box sx={{py: 0.5}}>
            {loggedUserData.profile.image ? (
              <Avatar
                sx={{
                  height: 40,
                  width: 40,
                  fontSize: 24,
                  backgroundColor: orange[500],
                }}
                src={loggedUserData.profile.image}
              />
            ) : (
              <Avatar
                sx={{
                  height: 40,
                  width: 40,
                  fontSize: 24,
                  backgroundColor: orange[500],
                }}
              >
                {getUserAvatar()}
              </Avatar>
            )}
          </Box>
          <Box
            sx={{
              width: {xs: 'calc(100% - 62px)', xl: 'calc(100% - 72px)'},
              ml: 4,
              color: color,
            }}
            className='user-info'
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box
                sx={{
                  mb: 0,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  fontSize: 16,
                  fontWeight: Fonts.MEDIUM,
                  color: 'inherit',
                }}
                component='span'
              >
                {loggedUserData.first_name
                  ? loggedUserData.first_name
                  : user.displayName}
              </Box>
              <Box
                sx={{
                  ml: 3,
                  color: 'inherit',
                  display: 'flex',
                }}
              >
                <ExpandMoreIcon />
              </Box>
            </Box>
            <Box
              sx={{
                mt: -0.5,
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                color: 'inherit',
                textTransform: 'capitalize',
              }}
            >
              {user.role}
            </Box>
          </Box>
        </Box>
      )}

      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            navigate('/my-profile');
          }}
        >
          My account
        </MenuItem>
        <MenuItem onClick={getUserLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserInfo;

UserInfo.defaultProps = {
  color: 'text.secondary',
};

UserInfo.propTypes = {
  color: PropTypes.string,
};
