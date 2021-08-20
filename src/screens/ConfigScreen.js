import React from 'react';
import {Button, Divider, Layout} from '@ui-kitten/components';
import {SafeAreaView, Image, StyleSheet} from 'react-native';
import {ThemeContext} from 'portrans_app/src/theme/theme-context';
import TopBar from 'portrans_app/src/screens/fragments/TopBar';
const HomeScreen = ({navigation}) => {
  const themeContext = React.useContext(ThemeContext);
 
  return (
    <SafeAreaView style={{flex: 1}}>
      <TopBar navigation={navigation} goBack={true} />
      <Divider />
      <Layout style={styles.container}>
        <Button style={{marginVertical: 4}} onPress={themeContext.toggleTheme}>
          {}
        </Button>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 100,
    resizeMode: 'contain',
  },
});

export default HomeScreen;
