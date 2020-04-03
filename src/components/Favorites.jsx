import React, { useState } from 'react';
import FavService from '../FavService';
import Track from './Track';


function Favorites(props) {
    const [musics, setMusics] = useState(FavService.getFavoritesFromStorage());

    // Appelée lorsqu'on clique sur le bouton favoris : permet d'ajouter ou retirer des favoris
    function onFavorites(music) {
        FavService.toggleFavorite(music);
        setMusics(FavService.getFavoritesFromStorage());
    }

    return (
        <main className="container mt-3">
            <h1>Mes favoris</h1>
            <p>Liste de mes titres favoris</p>
            <hr />

            <div className="row justify-content-around card-group search-results">
                {musics.map((music) => {
                    return (
                        <Track music={music}  key={music.id} onClick={onFavorites} isFavorite={FavService.isFavorite(music)} />
                    );
                })}
            </div>
        </main>

    );
}

export default Favorites;