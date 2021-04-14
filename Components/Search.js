import React from 'react';
import { StyleSheet, Button, TextInput, View, FlatList, Text, ActivityIndicator } from 'react-native';
import { getFilmsFromApiWithSearchedText } from '../API/tmdbApi';
import FilmItem from './FilmItem';
import FilmMoteurItem from './FilmMoteurItem';
import { connect } from 'react-redux';


class Search extends React.Component {


    constructor(props) {
        super(props);

        this.page = 0;
        this.totalPages = 0;
        this.currentTextRecherche = "";

        this.state = {
            films: [],
            isLoading: false,
            filmsPossible: [],
            textRecherche: "",
        };

        this.loadFilm = this.loadFilm.bind(this);
        this.loadFilmScroll = this.loadFilmScroll.bind(this);
        this.filmPossibleClick = this.filmPossibleClick.bind(this);
        this.navigateToFilmDetails = this.navigateToFilmDetails.bind(this);
    }

    loadFilm() {
        this.setState({isLoading: true,})
        getFilmsFromApiWithSearchedText(this.state.textRecherche)
        .then((data) => {
            this.page = data.page;
            this.totalPages = data.total_pages;
            this.currentTextRecherche = this.state.textRecherche;
            this.setState({
                films: data.results,
                isLoading: false,
                filmsPossible: [],
            })
        });
    }

    loadFilmScroll() {
        /*
        this.setState({isLoading: true})
        getFilmsFromApiWithSearchedText(this.currentTextRecherche, this.page + 1)
        .then((data) => {
            this.page = data.page;
            this.totalPages = data.total_pages;
            this.setState({
                films: [ ...this.state.films, ...data.results ],
                isLoading: false,
                filmsPossible: [],
            })
        });
        */
    }

    loadFilmPossible() {
        /*
        getFilmsFromApiWithSearchedText(this.state.textRecherche)
        .then((data) => this.setState({
            filmsPossible: data.results,
        }));
        */
    }

    handleOnChangeRecherche(text) {
        this.setState({
            textRecherche: text,
        }, () => this.loadFilmPossible());
    }

    filmPossibleClick(title) {
        this.setState({
            textRecherche: title,
        }, () => this.loadFilm());
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

    navigateToFilmDetails(idFilm) {
        this.props.navigation.navigate("FilmDetails", {idFilm: idFilm});
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
                    extraData={this.props.favoritesFilm}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={
                        ({item}) => 
                            <FilmItem 
                                isFilmFavorite={(this.props.favoritesFilm.findIndex(film => film.id === item.id) !== -1) ? true : false}
                                item={item} 
                                callbackNavigate={this.navigateToFilmDetails}/>
                    }
                    onEndReachedThreshold={0.5}
                    onEndReached={() => {
                        if (this.page < this.totalPages) { 
                            this.loadFilmScroll();
                        }
                    }}/>
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


const mapStateToProps = (state) => {
    return {
        favoritesFilm: state.favoritesFilm
    }
}


export default connect(mapStateToProps)(Search);