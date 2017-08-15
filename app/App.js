import React from 'react';
import { StyleSheet, Text, View, NavigatorIOS } from 'react-native';
import SearchPage from './SearchPage';

export default class Formula1 extends React.Component {
    render() {
        return (
            <NavigatorIOS
                style={styles.container}
                initialRoute={{
                    title: 'Formula 1',
                    component: SearchPage,
                }}/>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
