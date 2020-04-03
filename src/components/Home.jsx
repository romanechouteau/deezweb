// J'ai mis en commentaire du code que j'avais écrit pour faire en sorte de charger automatiquement la suite des titres à l'arrivée en bas de la page
// Le code fonctionnait bien mais la détection de l'arrivée en bas de la page non, ce qui faisait buguer
// Je n'ai pas eu le temps de corriger ce problème donc j'ai préféré mettre le tout en commentaire pour ne pas faire buguer la page

import React, { useState } from 'react';
import fetchJsonp from 'fetch-jsonp';
import Track from './Track';
import FavService from '../FavService';

function Home(props) {
    const [title, setTitle] = useState('');
    const [orderBy, setOrderBy] = useState('ALBUM_ASC');
    const [musics, setMusics] = useState([]);
    // const [next, setNext] = useState('');

    // Appelée lorsque le titre de la recherche est modifié
    function changeTitle(event) {
        setTitle(event.target.value);
    }

    // Appelée quand l'ordre demandé est modifié
    function changeOrderBy(event) {
        setOrderBy(event.target.value);
    }

    // Appelée lorsque la recherche est lancée
    function onSearch(event) {
        event.preventDefault();
        if (title !== "") {
            fetchJsonp(`https://api.deezer.com/search?q=${encodeURIComponent(title)}&order=${orderBy}&output=jsonp`)
            .then(response => response.json())
            .then(data => {
                console.log(data.next);
                // setNext(data.next);
                return data.data;
            })
            .then(data => {
                setMusics(data);
            })
            .catch(erreur => console.log('parsing failed', erreur));
        }
    }

    // Appelée lorsqu'on clique sur le bouton favoris : permet d'ajouter ou retirer des favoris
    function onFavorites(music) {
        FavService.toggleFavorite(music);
        setMusics([...musics]);
    }

    // function handleScroll() {
    //     const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    //     const body = document.body;
    //     const html = document.documentElement;
    //     const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    //     const windowBottom = windowHeight + window.pageYOffset;
    //     if (windowBottom >= docHeight) {
    //         console.log("bottom");
    //         console.log(next);
    //         if (next !== '') {
    //             fetchJsonp(next)
    //             .then(response => response.json())
    //             .then(data => {
    //                 console.log(data.next);
    //                 setNext(data.next);
    //                 return data.data;
    //             })
    //             .then(data => {
    //                 setMusics(musics.concat(data));
    //             })
    //             .catch(erreur => console.log('parsing failed', erreur));
    //         }
    //     }
    // }

    // window.addEventListener("scroll", handleScroll);

    return (
        <main className="container mt-3">
            <h1>Recherche</h1>
            <p>Recherchez un titre sur Deezer en utilisant le formulaire suivant :</p>
            <hr/>
            <form onSubmit={onSearch}>
                <div className="row">
                    <label htmlFor="searchText" className="col-md-2 col-form-label text-right">Titre&nbsp;:</label>
                    <div className="col-md-4">
                        <input type="text" className="form-control" id="searchText"
                            placeholder="Eminem, Armin Van Buuren, Rihanna, ..." onChange={changeTitle} />
                    </div>
                    <label htmlFor="searchText" className="col-md-2 col-form-label text-right">Trier par :</label>
                    <div className="col-md-2">
                        <select id="order" className="custom-select" onChange={changeOrderBy}>
                        <option value="ALBUM_ASC">Album</option>
                        <option value="ARTIST_ASC">Artiste</option>
                        <option value="TRACK_ASC">Musique</option>
                        <option value="RANKING">Les plus populaires</option>
                        <option value="RATING_ASC">Les mieux notés</option>
                        </select>
                    </div>
                    <div className="col-md-2 text-right">
                        <input type="submit" className="btn btn-primary" value="Go"/>
                    </div>
                </div>
            </form>
            <hr/>
            <h2>Résultats</h2>
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

export default Home;