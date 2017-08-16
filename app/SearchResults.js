import React, { Component } from 'react'
import {
    StyleSheet,
    Image,
    View,
    TouchableHighlight,
    FlatList,
    Text,
} from 'react-native';
import RaceResults from './RaceResults';

class ListItem extends React.PureComponent {

    _onPress = (e, getUrl) => {
        this.props.onPressItem(getUrl);
    }

    render() {
        const item = this.props.item;
        const getURL = 'http://ergast.com/api/f1/'+item.season+'/'+item.round+'/results.json';
        return (
            <TouchableHighlight
                onPress={(e) => this._onPress(e,getURL)}
                underlayColor='#dddddd'>
                <View>
                    <View style={styles.rowContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.name}>{item.round}. {item.raceName}</Text>
                            <Text style={styles.title}
                                  numberOfLines={2}>{item.Circuit.circuitName} , {item.date}</Text>
                        </View>
                    </View>
                    <View style={styles.separator}/>
                </View>
            </TouchableHighlight>
        );
    }
}

export default class SearchResults extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        };
    }

    _keyExtractor = (item, index) => index;

    _renderItem = ({item, index}) => (
        <ListItem
            item={item}
            index={index}
            onPressItem={this._onPressItem}
        />
    );

    _executeQuery = (query) => {
        console.log(query);
        fetch(query)
            .then(response => response.json())
            .then(json => this._handleResponse(json))
            .catch(error => {
                console.log('Something bad happened ' + error);
            });
    };

    _onPressItem = (index) => {
        console.log("Pressed row: "+index);
        this._executeQuery(index);
    };

    _handleResponse = (response) => {
        this.setState({ isLoading: false , message: '' });
        this.props.navigator.push({
            title: 'Race Results',
            component: RaceResults,
            passProps: {results: response.MRData.RaceTable.Races[0].Results}
        });
    };

    render() {
        return (
            <FlatList
                data={this.props.race}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
            />
        );
    }
}

const styles = StyleSheet.create({
    thumb: {
        width: 80,
        height: 80,
        marginRight: 10
    },
    textContainer: {
        flex: 1
    },
    separator: {
        height: 1,
        backgroundColor: '#dddddd'
    },
    name: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#48BBEC'
    },
    title: {
        fontSize: 20,
        color: '#656565'
    },
    rowContainer: {
        flexDirection: 'row',
        padding: 10
    },
});