import React, {Component} from 'react'
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
        const HELMET = {
            vettel: require('./images/helmet/vettel.png'),
            hamilton: require('./images/drivers/hamilton.jpg'),
            bottas: require('./images/drivers/bottas.jpg'),
            max_verstappen: require('./images/drivers/max_verstappen.jpg'),
            raikkonen: require('./images/drivers/raikkonen.jpg'),
            ricciardo: require('./images/drivers/ricciardo.jpg'),
        }

        const COUNTRY = {
            German: require('./images/countries/german.jpg'),
        }

        return (
            <View>
                <Image source={IMAGES[this.props.driver]} style={styles.full}/>
                <View style={styles.rowContainer}>
                    <Image source={HELMET[this.props.driver]} style={styles.helmet}/>
                    <Text style={styles.name}>{this.props.data.givenName + ' ' + this.props.data.familyName}</Text>
                </View>
                <View style={styles.rowContainer}>
                    <Text style={styles.title}>{this.props.data.permanentNumber} </Text>
                    <Image source={COUNTRY[this.props.data.nationality]} style={styles.flag}/>
                    <Text style={styles.title}>{this.props.data.code} </Text>
                </View>
                <Text>{this.props.data.dateOfBirth} </Text>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    full: {
        width: 400,
        height: 400,
        marginTop: 65,
    },
    helmet: {
        width: 80,
        height: 80,
        marginTop: -50,
        marginLeft: 10,
    },
    flag: {
        width: 30,
        height: 20,
        marginRight: 10,
        marginLeft: 5,
    },
    rowContainer: {
        flexDirection: 'row',
        padding: 10
    },
    title: {
        fontSize: 20,
        color: '#656565'
    },
    name: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#48BBEC',
        marginLeft: 20,
    },
});