import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import AppAnimate from '@enjoey/core/AppAnimate';
import AppsHeaderWithImage from '@enjoey/core/AppsContainer/AppsHeaderWithImage';
import MemberDetailHeader from './MemberDetailHeader';
import MemberDetails from './tabs/memberDetails';
import PackageInfo from './tabs/packageInfo';
import TransferSession from './tabs/transferSession';
import BookingStatus from './tabs/bookingStatus';
import {useAuthUser} from '@enjoey/utility/AuthHooks';
import {useGetDataApi} from '@enjoey/utility/APIHooks';
// import {useBranchAuth} from '@anran/utility/AuthHooks';
import AppInfoView from '@enjoey/core/AppInfoView';
// import {Card, AppBar} from '@mui/material';
import {Card} from '@mui/material';
import AppScrollbar from '@enjoey/core/AppScrollbar';

const memberDetails = ({selectedMember, setSelectedMember}) => {
  const {user} = useAuthUser();
  console.log('useAuthUser:', user);
  console.log('selectedMember', selectedMember);

  const [mainTabValue, setMainTabValue] = React.useState(0);

  const [{apiData: memberData}, {setQueryParams, reCallAPI}] = useGetDataApi(
    `api/member/${selectedMember._id}`,
    undefined,
    {id: selectedMember.id},
    true,
  );

  useEffect(() => {
    if (selectedMember) {
      setQueryParams({id: selectedMember.id});
    }
  }, [selectedMember]);

  const onMainTabsChange = (newValue) => {
    setMainTabValue(newValue);
  };

  return (
    <>
      {/* <AppBar position='sticky'> */}
        <AppsHeaderWithImage>
          <MemberDetailHeader
            selectedMember={selectedMember}
            setSelectedMember={setSelectedMember}
            mainTabValue={mainTabValue}
            setMainTabValue={onMainTabsChange}
          />
        </AppsHeaderWithImage>
      {/* </AppBar> */}
      <AppScrollbar
        sx={{
          height: {xs: 'calc(100% - 96px)', sm: 'calc(100% - 110px)'},
        }}
      >
        <AppAnimate animation='transition.slideUpIn' delay={200}>
          <>
            {mainTabValue === 0 && (
              <>
                <Card sx={{mt: 2, p: 5}}>
                  <MemberDetails 
                    rawData={memberData} 
                    reCallAPI={reCallAPI} 
                  />
                </Card>
              </>
            )}
            {mainTabValue === 1 && (
              <>
                <Card sx={{mt: 2, p: 5}}>
                  <PackageInfo
                    selectedMember={memberData}
                    reCallAPI={reCallAPI}
                  />
                </Card>
              </>
            )}
            {mainTabValue === 2 && (
              <>
              <Card sx={{mt: 2, p: 5}}>
                <TransferSession
                  selectedMember={memberData}
                  reCallAPI={reCallAPI}
                />
              </Card>
            </>
            )}
            {mainTabValue === 3 && (
              <>
              <Card sx={{mt: 2, p: 5}}>
                <BookingStatus
                  selectedMember={memberData}
                  reCallAPI={reCallAPI}
                />
              </Card>
            </>
            )}
          </>
        </AppAnimate>
      </AppScrollbar>
      <AppInfoView />
    </>
  );
};

export default memberDetails;

MemberDetails.propTypes = {
  selectedMember: PropTypes.object,
  setSelectedMember: PropTypes.func,
};
