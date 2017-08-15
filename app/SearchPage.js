import React from 'react';
import {StyleSheet, Text, View, TextInput, Button, Image, ActivityIndicator} from 'react-native';
import SearchResults from './SearchResults';

function urlForQueryAndPage(querystring) {
    return 'http://ergast.com/api/f1/' + querystring + '.json';
}

export default class SearchPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchString: '2017',
            isLoading: false
        };
    }

    _executeQuery = (query) => {
        console.log(query);
        this.setState({ isLoading: true });
        fetch(query)
            .then(response => response.json())
            .then(json => this._handleResponse(json))
            .catch(error =>
                this.setState({
                    isLoading: false,
                    message: 'Something bad happened ' + error
                }));
    };

    _onSearchPressed = () => {
        const query = urlForQueryAndPage(this.state.searchString);
        this._executeQuery(query);
    };

    _handleResponse = (response) => {
        this.setState({ isLoading: false , message: '' });
        this.props.navigator.push({
            title: 'Race Calender',
            component: SearchResults,
            passProps: {race: response.MRData.RaceTable.Races}
        });
    };

    _onSearchTextChanged = (event) => {
        this.setState({ searchString: event.nativeEvent.text });
    };

    render() {
        const spinner = this.state.isLoading ?
            <ActivityIndicator size='large'/> : null;
        return (
            <View style={styles.container}>
                <Image source={require('./images/logo.png')} style={styles.image}/>
                <Text style={styles.description}>Race Calender Search:</Text>
                <View style={styles.flowRight}>
                    <TextInput
                        style={styles.searchInput}
                        value={this.state.searchString}
                        onChange={this._onSearchTextChanged}
                        placeholder='Search for Races'/>
                    <Button
                        onPress={this._onSearchPressed}
                        color='#48BBEC'
                        title='Go'
                    />
                </View>
                <Text style={styles.description}>{this.state.message}</Text>

                {spinner}
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
        marginTop: 5,
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
        marginTop: 5,
    },
    image: {
        width: 214,
        height: 100,
        marginTop: 65,
    },
});
