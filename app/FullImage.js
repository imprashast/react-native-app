import React, { Component } from 'react'
import {
    StyleSheet,
    Image,
    View,
    TouchableHighlight,
    FlatList,
    Text,
} from 'react-native';

export default class FullImage extends React.Component {

    render() {
        const IMAGES = {
            vettel: require('./images/drivers/vettel.jpg'),
            hamilton: require('./images/drivers/hamilton.jpg'),
            bottas: require('./images/drivers/bottas.jpg'),
            max_verstappen: require('./images/drivers/max_verstappen.jpg'),
            raikkonen: require('./images/drivers/raikkonen.jpg'),
            ricciardo: require('./images/drivers/ricciardo.jpg'),
        }

        return(<Image source={IMAGES[this.props.driver]} style={styles.full}/>);
    }
}

const styles = StyleSheet.create({
    full: {
        width: 400,
        height: 400,
        marginTop: 65,
    },
});