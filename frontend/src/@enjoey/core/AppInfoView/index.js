import React from 'react';
import AppMessageView from '@enjoey/core/AppMessageView';
import AppLoader from '@enjoey/core/AppLoader';
import {useInfoViewContext} from '../../utility/AppContextProvider/InfoViewContextProvider';

const AppInfoView = () => {
  const {error, loading, displayMessage: message} = useInfoViewContext();

  const showMessage = () => {
    return <AppMessageView variant='success' message={message.toString()} />;
  };

  const showError = () => {
    return <AppMessageView variant='error' message={error.toString()} />;
  };

  return (
    <>
      {loading && <AppLoader />}

      {message && showMessage()}
      {error && showError()}
    </>
  );
};

export default AppInfoView;
