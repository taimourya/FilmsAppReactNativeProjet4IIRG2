import React from 'react';
import { View, Text } from 'react-native';
import FilmList from './FilmList';
import { connect } from 'react-redux';
import Avatar from './Avatar';



class Favorites extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.navigateToFilmDetails = this.navigateToFilmDetails.bind(this);
    }

    navigateToFilmDetails(idFilm) {
        this.props.navigation.navigate("FilmDetails", {idFilm: idFilm});
    }
    render() {
        return (
            <View style={{flex: 1}}>
                <Avatar/>
                <FilmList
                    films={this.props.favoritesFilm}
                    callbackNavigate={this.navigateToFilmDetails}
                    page={1}
                    totalPages={1}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        favoritesFilm: state.favoritesFilm
    }
}


export default connect(mapStateToProps)(Favorites);