import React from 'react';
import {StyleSheet, Text, View, TextInput, Button, Image} from 'react-native';

export default class SearchPage extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.description}>This is a demo app!</Text>
                <Text>This is a demo app</Text>
                <View style={styles.flowRight}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder='Search for Drivers'/>
                    <Button
                        onPress={() => {
                        }}
                        color='#48BBEC'
                        title='Go'
                    />
                </View>
                <Image source={require('./images/logo.png')} style={styles.image}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    description: {
        fontSize: 18,
        textAlign: 'center',
        color: '#656565',
        marginTop: 65,
    },
    searchInput: {
        height: 36,
        padding: 4,
        marginRight: 5,
        flexGrow: 1,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 8,
        color: '#48BBEC',
    },
    flowRight: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    image: {
        width: 214,
        height: 100,
    },
});
