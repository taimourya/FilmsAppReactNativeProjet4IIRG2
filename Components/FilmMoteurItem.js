import React from 'react';
import { StyleSheet, Button, TextInput, View, FlatList, Text, Image } from 'react-native';



export default class FilmMoteurItem extends React.Component {

    handleClick() {
        this.props.callbackOnClick(this.props.title);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}
                    onPress={() => this.handleClick()}>
                    {this.props.title}
                </Text>
            </View>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        padding: 10,
        backgroundColor: '#f0f9f5',
    },
    text: {
        fontSizez: 15,
    }
});