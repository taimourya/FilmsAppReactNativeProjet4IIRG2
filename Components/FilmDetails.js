import React from 'react';
import { Platform , Share, StyleSheet, View, Text, Image, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { getImageFromApi, getFilmDetailFromApi } from '../API/tmdbApi';
import { connect } from 'react-redux';



class FilmDetails extends React.Component {

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state
        // On accède à la fonction shareFilm et au film via les paramètres qu'on a ajouté à la navigation
        if (params.film != undefined && Platform.OS === 'ios') {
          return {
              // On a besoin d'afficher une image, il faut donc passe par une Touchable une fois de plus
              headerRight: <TouchableOpacity
                              style={styles.share_touchable_headerrightbutton}
                              onPress={() => params.shareFilm()}>
                              <Image
                                style={styles.share_image}
                                source={require('../assets/images/ic_share.ios.png')} />
                            </TouchableOpacity>
          }
        }
    }


    constructor(props) {
        super(props);

        this.state = {
            film: undefined,
            isLoading: true,
        };

        this.shareFilm = this.shareFilm.bind(this);
    }

    _updateNavigationParams() {
        this.props.navigation.setParams({
          shareFilm: this.shareFilm,
          film: this.state.film
        })
      }

    shareFilm() {
        const { film } = this.state;
        Share.share({ title: film.title, message: film.overview });
    }
    

    componentDidMount() {
        getFilmDetailFromApi(this.props.route.params.idFilm)
        .then(data => {
            this.setState({
                isLoading: false,
                film: data,
            })
        });
    }

    componentDidUpdate() {
    } 

    toggleFavorite() {
        const action = { type: "TOGGLE_FAVORITE", value: this.state.film };
        this.props.dispatch(action);
    }

    displayFloatingActionButton() {
        const { film } = this.state
        if (film != undefined && Platform.OS === 'android') { // Uniquement sur Android et lorsque le film est chargé
          return (
            <TouchableOpacity
              style={styles.share_touchable_floatingactionbutton}
              onPress={() => this.shareFilm()}>
              <Image
                style={styles.share_image}
                source={require('../assets/images/ic_share.android.png')} />
            </TouchableOpacity>
          )
        }
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

    navigateToFilmVideo() {
        this.props.navigation.navigate("FilmTrailer", {idFilm: this.state.film.id});
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
                    <TouchableOpacity
                        style={styles.play_container}
                        onPress={() => this.navigateToFilmVideo()}>
                        <Image
                            style={styles.play_image}
                            source={require('../assets/images/play-button.png')}
                        />
                    </TouchableOpacity>
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
            <View style={{flex: 1}}>
                {this.displayFilmDetails()}
                {this.displayLoading()}
                {this.displayFloatingActionButton()}
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
    },
    play_container: {
        alignItems: 'center',
    },
    play_image: {
        width: 40,
        height: 40
    },
    share_touchable_floatingactionbutton: {
        position: 'absolute',
        width: 60,
        height: 60,
        right: 30,
        bottom: 30,
        borderRadius: 30,
        backgroundColor: '#e91e63',
        justifyContent: 'center',
        alignItems: 'center'
    },
    share_image: {
        width: 30,
        height: 30
    }
});

const mapStateToProps = (state) => {
    return {
        favoritesFilm: state.favoritesFilm
    }
}


export default connect(mapStateToProps)(FilmDetails);