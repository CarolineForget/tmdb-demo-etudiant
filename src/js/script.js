document.addEventListener("DOMContentLoaded", function (){

    let connexion = new MovieDB();

    if(document.location.pathname.search("fiche-film.html") === 1) {

        let params = (new URL(document.location)).searchParams;
        connexion.requeteInfoFilm(params.get("id"));

    } else {
        connexion.requeteDernierFilm()

    }





})

class MovieDB{
    constructor() {
        console.log("MovieDB");
        this.APIkey = "1c4178447548302fa472b09818a8d46e";
        this.lang = "fr-CA";
        this.baseURL = "https://api.themoviedb.org/3";
        this.imgPath = "https://image.tmdb.org/t/p/";
        this.totalFilm = 8;

    }

    requeteDernierFilm() {
        let requete = new XMLHttpRequest();

        requete.addEventListener("loadend", this.retourRequeteDernierFilm.bind(this));
        //requete.open("GET","https://api.themoviedb.org/3/movie/now_playing?api_key=1c4178447548302fa472b09818a8d46e&language=fr-CA&page=1");
        requete.open("GET",this.baseURL + "/movie/now_playing?api_key=" + this.APIkey + "&language=" + this.lang + "&page=1");
        requete.send();

    }

    retourRequeteDernierFilm(e) {
        console.log("retour dernier film");

        let target = e.currentTarget;
        let data;

        //console.log(target.responseText);

        data = JSON.parse(target.responseText).results;

        console.log(data);

        this.afficheDernierFilm(data);
    }

    afficheDernierFilm(data){
        for (let i = 0; i < this.totalFilm; i++) {

            let unArticle = document.querySelector(".template>.film").cloneNode(true);

            unArticle.querySelector("h2").innerHTML = data[i].title;
            unArticle.querySelector("p").innerHTML = data[i].overview || "Aucune description disponible.";

            let src = this.imgPath + "w185" + data[i].poster_path;
            let uneImage = unArticle.querySelector("img");
            uneImage.setAttribute("src", src);
            uneImage.setAttribute("alt", data[i].title);

            let lien = unArticle.querySelector("a");
            lien.setAttribute("href", "fiche-film.html?id=" + data[i].id);

            document.querySelector(".liste-films").appendChild(unArticle);


        }


    }


    requeteInfoFilm(movieID) {
        let requete = new XMLHttpRequest();

        requete.addEventListener("loadend", this.retourRequeteInfoFilm.bind(this));
        //requete.open("GET","https://api.themoviedb.org/3/movie/{​​movie_id}​​?api_key=<>&language=en-US");
        requete.open("GET",this.baseURL + "/movie/" + movieID + "?api_key=" + this.APIkey + "&language=" + this.lang);
        requete.send();

    }

    retourRequeteInfoFilm(e) {
        console.log("retour dernier film");

        let target = e.currentTarget;
        let data;

        console.log(target.responseText);

        data = JSON.parse(target.responseText);

        console.log(data);

        this.afficheInfoFilm(data);
    }

    afficheInfoFilm(data){

        document.querySelector("h1").innerHTML = data.title;

        // for (let i = 0; i < this.totalFilm; i++) {
        //
        //     let unArticle = document.querySelector(".template>.film").cloneNode(true);
        //
        //     unArticle.querySelector("h2").innerHTML = data[i].title;
        //     unArticle.querySelector("p").innerHTML = data[i].overview || "Aucune description disponible.";
        //
        //     let src = this.imgPath + "w185" + data[i].poster_path;
        //     let uneImage = unArticle.querySelector("img");
        //     uneImage.setAttribute("src", src);
        //     uneImage.setAttribute("alt", data[i].title);
        //
        //     let lien = unArticle.querySelector("a");
        //     lien.setAttribute("href", "fiche-film.html?id=" + data[i].id);
        //
        //     document.querySelector(".liste-films").appendChild(unArticle);
        //
        //
        // }


    }


}