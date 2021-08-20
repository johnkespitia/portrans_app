import React from 'react';
import {TopNavigation, TopNavigationAction, Icon} from '@ui-kitten/components';
import {displayName as appName} from 'portrans_app/app.json';

const ConfigIcon = props => <Icon {...props} name="settings-2-outline" />;
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
const ConfigAction = navigation => {
  const navigateConfig = () => {
    navigation.push('Config');
  };
  return <TopNavigationAction icon={ConfigIcon} onPress={navigateConfig} />;
};
const TopBar = props => {
  return (
    <TopNavigation
      title={appName}
      alignment="center"
      accessoryRight={() => ConfigAction(props.navigation)}
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
