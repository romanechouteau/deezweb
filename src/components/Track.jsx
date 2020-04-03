import React from 'react';

function Track(props) {
    const music = props.music;
    const isFavorite = props.isFavorite;
    const favBtnClass = isFavorite ? 'btn-outline-danger' : 'btn-danger';

    // Appelée lorsqu'on clique sur le bouton favoris : permet d'appeler la fonction onFavorites
    function onFavClick(music) {
        return (event) => {
            event.preventDefault();
            props.onClick(music);
        }    
    }

    return (
        <div className="card col-md-5 m-4 rounded shadow border-0" style={{flex: 'initial'}}>
            <div className="card-body text-left">
                <div className="media mb-2">
                    <img className="align-self-center mr-2 w-25" src={(music.album.cover !== "")? music.album.cover : music.artist.picture} alt=""/>
                    <div className="media-body">
                        <h5 className="card-title">{music.title}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{music.artist.name} / {music.album.title}</h6>
                    </div>
                </div>
                <audio src={music.preview} className="w-100" controls></audio><br/>
                <a href="#" className={`btn btn-sm ${favBtnClass}`} onClick={onFavClick(music)}>
                    {isFavorite
                        ? <><i className="fas fa-heart-broken"></i> Retirer des favoris</>
                        : <><i className="fas fa-heart"></i> Ajouter aux favoris</>
                    }
                </a>
            </div>
        </div>
    );
}

export default Track;