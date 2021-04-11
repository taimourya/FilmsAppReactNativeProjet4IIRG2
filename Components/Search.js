import React from 'react';
import { StyleSheet, Button, TextInput, View, FlatList, Text, ActivityIndicator } from 'react-native';
import { getFilmsFromApiWithSearchedText } from '../API/tmdbApi';
import FilmItem from './FilmItem';
import FilmMoteurItem from './FilmMoteurItem';


export default class Search extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            films: [],
            isLoading: false,
            filmsPossible: [],
            textRecherche: "",
        };

        this.loadFilm = this.loadFilm.bind(this);
        this.filmPossibleClick = this.filmPossibleClick.bind(this);
    }

    loadFilm() {
        this.setState({isLoading: true,})
        getFilmsFromApiWithSearchedText(this.state.textRecherche)
        .then((data) => {
            this.setState({
                films: data.results,
                isLoading: false,
                filmsPossible: [],
            })
        });
    }

    loadFilmPossible() {
        getFilmsFromApiWithSearchedText(this.state.textRecherche)
        .then((data) => this.setState({
            filmsPossible: data.results,
        }));
    }

    handleOnChangeRecherche(text) {
        //force le changement du textRecherche
        this.state.textRecherche = text;
        this.forceUpdate();
        this.loadFilmPossible();
    }

    filmPossibleClick(title) {
        this.state.textRecherche = title;
        this.forceUpdate();
        this.loadFilm();
    }

    displayLoading(){
        if(this.state.isLoading)
        {
            return (
                <View style={styles.loading}>
                    <ActivityIndicator size="large" />
                </View>
            );
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput 
                    style={styles.inputRecherche}    
                    placeholder="Entrez le titre d'un film"
                    value={this.state.textRecherche}
                    onChangeText={(text) => this.handleOnChangeRecherche(text)}
                    onSubmitEditing={this.loadFilm}/>
                <Button 
                    title="Rechercher"
                    disabled={this.state.isLoading}
                    onPress={this.loadFilm}/>
                <FlatList
                    data={this.state.filmsPossible}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={
                        ({item}) => 
                    <FilmMoteurItem title={item.title} callbackOnClick={this.filmPossibleClick}/>
                }/>
                <FlatList style={styles.listFilm}
                    data={this.state.films}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={
                        ({item}) => 
                    <FilmItem item={item}></FilmItem>
                }/>
                {this.displayLoading()}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container:{
        marginTop: 15,
        flex: 1,
    },
    inputRecherche: {
        fontSize: 20,
        borderWidth: 1,
        borderColor: "gray",
        margin: 10,
        padding: 10,
        borderRadius: 10
    },
    listFilm: {
        marginTop: 10,
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
      },
});