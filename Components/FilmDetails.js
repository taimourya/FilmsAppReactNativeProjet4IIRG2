import React from 'react';
import { StyleSheet, View, Text, Image, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { getImageFromApi, getFilmDetailFromApi } from '../API/tmdbApi';
import { connect } from 'react-redux';




class FilmDetails extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            film: undefined,
            isLoading: true,
        };
    }

    componentDidMount() {
        getFilmDetailFromApi(this.props.route.params.idFilm)
        .then(data => {
            this.setState({
                isLoading: false,
                film: data,
            })
        })
    }

    componentDidUpdate() {
        console.log("componentDidUpdate : ")
        console.log(this.props.favoritesFilm)
      }

    toggleFavorite() {
        console.log("click");
        const action = { type: "TOGGLE_FAVORITE", value: this.state.film };
        this.props.dispatch(action);
    }

    displayFavoriteImage() {
        var sourceImage = require('../assets/images/ic_favorite_border.png')
        if (this.props.favoritesFilm.findIndex(item => item.id === this.state.film.id) !== -1) {
          
          sourceImage = require('../assets/images/ic_favorite.png')
        }
        return (
          <Image
            style={styles.favorite_image}
            source={sourceImage}
          />
        )
    }

    displayFilmDetails() {
        const film = this.state.film;
        if(film != undefined) {
            return (
                <ScrollView style={styles.scrollView}>
                <Image
                  style={styles.image}
                  source={{uri: getImageFromApi(film.backdrop_path)}}
                />
                <Text style={styles.title_text}>{film.title}</Text>
                <TouchableOpacity
                    style={styles.favorite_container}
                    onPress={() => this.toggleFavorite()}>
                    {this.displayFavoriteImage()}
                </TouchableOpacity>
                <Text style={styles.description_text}>{film.overview}</Text>
                <Text style={styles.default_text}>Sorti le {film.release_date}</Text>
                <Text style={styles.default_text}>Note : {film.vote_average} / 10</Text>
                <Text style={styles.default_text}>Nombre de votes : {film.vote_count}</Text>
                <Text style={styles.default_text}>Budget : {film.budget}</Text>
                <Text style={styles.default_text}>Genre(s) : {film.genres.map(function(genre){
                    return genre.name;
                  }).join(" / ")}
                </Text>
                <Text style={styles.default_text}>Companie(s) : {film.production_companies.map(function(company){
                    return company.name;
                  }).join(" / ")}
                </Text>
                </ScrollView>
            );
        }
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
            <View>
                {this.displayFilmDetails()}
                {this.displayLoading()}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollView: {
        flex: 1,
    },
    image: {
      height: 169,
      margin: 5
    },
    title_text: {
      fontWeight: 'bold',
      fontSize: 35,
      flex: 1,
      flexWrap: 'wrap',
      marginLeft: 5,
      marginRight: 5,
      marginTop: 10,
      marginBottom: 10,
      color: '#000000',
      textAlign: 'center'
    },
    description_text: {
      fontStyle: 'italic',
      color: '#666666',
      margin: 5,
      marginBottom: 15
    },
    default_text: {
      marginLeft: 5,
      marginRight: 5,
      marginTop: 5,
    },
    favorite_container: {
        alignItems: 'center',
    },
    favorite_image: {
        width: 40,
        height: 40
    }
});

const mapStateToProps = (state) => {
    return {
        favoritesFilm: state.favoritesFilm
    }
}


export default connect(mapStateToProps)(FilmDetails);