import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { getFilmVideoFromApi } from '../API/tmdbApi';
import { WebView } from 'react-native-webview';

export default class FilmTrailer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            video: undefined,
        };
    }

    componentDidMount() {
        getFilmVideoFromApi(this.props.route.params.idFilm)
        .then(data => {
            this.setState({
                isLoading: false,
                video: data.results[0],
            })
        });
    }
    displayVideo(){
        const video = this.state.video;
        if(video != undefined)
        {
            console.log(video);
            console.log("key " + video.key)
            return (
                <WebView
                style={{flex: 1}}
                source={{ uri: 'https://www.youtube.com/watch?v=' + 
                                video.key }}
                />
            );
        }
    }
    render() {
        return (
            <View style={{flex: 1}}>
                {this.displayVideo()}
            </View>
        );

    }

}