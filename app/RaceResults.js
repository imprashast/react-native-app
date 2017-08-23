import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    View,
    TouchableHighlight,
    FlatList,
    Text,
} from 'react-native';
import FullImage from './FullImage';

class ListItem extends React.PureComponent {

    _onPress = () => {
        this.props.onPressItem(this.props.index);
    }

    _onPressButton = (e, id) => {
        console.log("Image clicked");
        this.props.onPressImage(id);
    }


    render() {
        const item = this.props.item;
        const IMAGES = {
            vettel: require('./images/drivers/vettel.jpg'),
            hamilton: require('./images/drivers/hamilton.jpg'),
            bottas: require('./images/drivers/bottas.jpg'),
            max_verstappen: require('./images/drivers/max_verstappen.jpg'),
            raikkonen: require('./images/drivers/raikkonen.jpg'),
            ricciardo: require('./images/drivers/ricciardo.jpg'),
        }
        let stat = '';
        if(item.status === "Finished"){
            stat = item.Time.time;
        } else {
            stat = item.status;
        }
        return (
            <TouchableHighlight
                onPress={this._onPress}
                underlayColor='#dddddd'>
                <View>
                    <View style={styles.rowContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.name}>{item.positionText}. {item.Driver.givenName} {item.Driver.familyName}</Text>
                            <Text style={styles.title}> {stat} </Text>
                            <View style={styles.crop}>
                                <TouchableHighlight onPress={(e) => this._onPressButton(e,item.Driver.driverId)}>
                                <Image source={IMAGES[item.Driver.driverId]} style={styles.thumb}/>
                                </TouchableHighlight>
                            </View>
                            <Text style={styles.title}
                                  numberOfLines={1}>{item.Constructor.name} , {item.Constructor.nationality}</Text>
                        </View>
                    </View>
                    <View style={styles.separator}/>
                </View>
            </TouchableHighlight>
        );
    }
}

export default class RaceResults extends Component {

    _keyExtractor = (item, index) => index;

    _renderItem = ({item, index}) => (
        <ListItem
            item={item}
            index={index}
            onPressItem={this._onPressItem}
            onPressImage={this._onPressImage}
        />
    );

    _onPressItem = (index) => {
        console.log("Pressed row: "+index);

    };

    _onPressImage = (index) => {

        this._executeQuery('http://ergast.com/api/f1/drivers/'+index+'.json');

    };

    _executeQuery = (query) => {
        console.log(query);
        fetch(query)
            .then(response => response.json())
            .then(json => this._handleResponse(json))
            .catch(error => {
                console.log('Something bad happened ' + error);
            });
    };

    _handleResponse = (response) => {
        this.setState({ isLoading: false , message: '' });
        this.props.navigator.push({
            title: 'Driver Details',
            component: FullImage,
            passProps: {driver: response.MRData.DriverTable.Drivers[0].driverId , data: response.MRData.DriverTable.Drivers[0] }
        });
    };

    render() {
        return (
            <FlatList
                data={this.props.results}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
            />
        );
    }
}

const styles = StyleSheet.create({
    crop: {
        width: 80,
        height: 80,
        overflow: 'hidden',
        alignSelf: 'flex-end',
    },
    thumb: {
        width: 200,
        height: 200,
        marginLeft: -60,
        marginTop: -5,
        resizeMode: 'cover',
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