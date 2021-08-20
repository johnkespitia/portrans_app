import React from 'react';
import {SafeAreaView} from 'react-native';
import {Divider, Layout, Text} from '@ui-kitten/components';
import TopBar from 'portrans_app/src/screens/fragments/TopBar';

const LoginScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <TopBar navigation={navigation} goBack={true} />
      <Divider />
      <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text category="h1">DETAILS</Text>
      </Layout>
    </SafeAreaView>
  );
};

export default LoginScreen;
