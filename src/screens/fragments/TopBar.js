import React from 'react';
import {TopNavigation, TopNavigationAction, Icon} from '@ui-kitten/components';
import {displayName as appName} from 'portrans_app/app.json';

const BackIcon = props => <Icon {...props} name="arrow-back" />;

const BackAction = navigation => {
  return (
    <TopNavigationAction
      icon={BackIcon}
      onPress={() => {
        navigation.goBack();
      }}
    />
  );
};

const TopBar = props => {
  return (
    <TopNavigation
      title={appName}
      alignment="center"
      accessoryLeft={() => {
        if (props.goBack) {
          return BackAction(props.navigation);
        } else {
          return null;
        }
      }}
      {...props}
    />
  );
};

export default TopBar;
