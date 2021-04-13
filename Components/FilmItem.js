import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { getImageFromApi } from '../API/tmdbApi';


export default class FilmItem extends React.Component {

    handleClickFilm(){
        this.props.callbackNavigate(this.props.item.id);
    }

    displayFavoriteIcon() {
        if(this.props.isFilmFavorite)
        {
            var sourceImage = require('../assets/images/ic_favorite.png')
            return (
                <Image
                    style={styles.favorite_image}
                    source={sourceImage}
                  />
            );
        }
    }

    render() {
        return (
            <TouchableOpacity 
                    style={styles.MainView}
                    onPress={() => this.handleClickFilm()}>
                <View style={styles.left}>
                    <Image
                        style={styles.image}
                        source={{uri: getImageFromApi(this.props.item.poster_path)}}/>
                </View>
                <View style={styles.right}>
                    <View style={styles.header}>
                        <View style={styles.headerLeft}>
                            <Text style={styles.titreFilm}>
                                {this.displayFavoriteIcon()}
                                {this.props.item.title}
                            </Text>
                        </View>
                        <View style={styles.headerRight}>
                            <Text style={styles.noteFilm}>{this.props.item.vote_average}</Text>
                        </View>
                    </View>
                    <View style={styles.rightCenter}>
                        <Text numberOfLines={4}>{this.props.item.overview}</Text>
                    </View>
                    <View style={styles.footer}>
                        <Text style={styles.dateSortie}>Sotie le {this.props.item.release_date}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}



const styles = StyleSheet.create({
    MainView: {
        marginTop: 5,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#b8c8ca',
    },
    left: {
        flex: 1
    },
    right: {
        flex: 3
    },
    header: {
        flex:2,
        flexDirection: 'row',
    },
    headerLeft: {
        flex:3,
        justifyContent: 'center',
    },
    headerRight: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'right',
    },
    rightCenter: {
        flex:8,
        padding: 5,
    },
    footer: {
        flex:1,
        justifyContent: 'center',
        textAlign: 'right',
    },
    image: {
        flex: 1,
        margin: 5,
        backgroundColor: 'gray'
    },
    titreFilm: {
        fontSize: 18,
        justifyContent: 'center',
    },
    noteFilm: {
        marginRight: 10,
        fontSize: 20,
        color: 'gray',
    },
    dateSortie: {
        fontSize: 10,
    },
    favorite_image: {
        width: 20,
        height: 20
    }
});