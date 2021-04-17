import React from 'react';
import { StyleSheet, FlatList, Text } from 'react-native';
import { connect } from 'react-redux';
import FilmItem from './FilmItem';



class FilmList extends React.Component {

    constructor(props) {
        super(props);

    }

    displayFilmList(){
        if(this.props.films.length > 0)
        {
            return (
                <FlatList 
                    style={styles.listFilm}
                    data={this.props.films}
                    extraData={this.props.favoritesFilm}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={
                        ({item}) => 
                            <FilmItem
                                isFilmFavorite={(this.props.favoritesFilm.findIndex(film => film.id === item.id) !== -1) ? true : false}
                                item={item} 
                                callbackNavigate={this.props.callbackNavigate}/>
                    }
                    onEndReachedThreshold={0.5}
                    onEndReached={() => {
                        if (this.props.page < this.props.totalPages) { 
                            this.props.loadFilmScroll();
                        }
                    }}/>
            );
        }
        else
        {
            return (
                <Text style={{textAlign: 'center'}}>Aucun resultat</Text>
            );
        }
    }

    render() {
        return(
            this.displayFilmList()
        );
    }
}

const styles = StyleSheet.create({
    listFilm: {
      
    }
})


const mapStateToProps = (state) => {
    return {
        favoritesFilm: state.favoritesFilm
    }
}


export default connect(mapStateToProps)(FilmList);