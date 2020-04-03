const STORAGE_FAVORITE_KEY = 'deezweb.favorites';

export default {
   // Retourne les favoris du localStorage du navigateur
   getFavoritesFromStorage() {
    return JSON.parse(window.localStorage.getItem(STORAGE_FAVORITE_KEY)) || [];
   },

   // Vérifie si une musique se trouve dans les favoris
   isFavorite(music) {
    return Boolean(this.getFavoritesFromStorage().find(val => val.id === music.id));
   },

   // Permet d'ajouter/supprimer un favori du localStorage
   toggleFavorite(music) {
       if (this.isFavorite(music)) {
           this.removeFavoriteFromStorage(music);
       } else {
           this.addFavoriteToStorage(music);
       }
   },
  
   // Ajoute un favori au localStorage
   addFavoriteToStorage(music) {
       const favoris = this.getFavoritesFromStorage();
       favoris.push(music);
       window.localStorage.setItem(STORAGE_FAVORITE_KEY, JSON.stringify(favoris));
   },
  
   // Supprime un favori du localStorage
   removeFavoriteFromStorage(music) {
    const favoris = this.getFavoritesFromStorage().filter(val => val.id !== music.id);
    window.localStorage.setItem(STORAGE_FAVORITE_KEY, JSON.stringify(favoris));
   }
}
