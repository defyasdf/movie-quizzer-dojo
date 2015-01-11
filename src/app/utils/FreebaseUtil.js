define([
    'dojo/_base/declare',
    "dojo/_base/lang",
    "dojo/request/script",
    "app/data/Constants",
    "app/dijit/Movie",
    "app/dijit/Actor"
], function (declare, lang, script, Constants, Movie, Actor) {
    return declare(null, {
        fullMovieList: [],

        generateQuery: function() {
            return [{
                "type": "/film/film",
                "limit": 100,
                "name": null,
                "id": null,
                "mid": null,
                "tagline": [],
                "initial_release_date": null,
                "gross_revenue": [{
                    "amount": null,
                    "currency": null,
                    "valid_date": null
                }],
                "starring": [{
                    "/film/performance/actor": {
                        "mid": null,
                        "name": null
                    },
                    "limit": 4
                }],
                "directed_by": [],
                "genre": [],
                "country": "United States of America",
                "sort": "-gross_revenue.amount"
            }];
        },

        getMovies: function (limit) {
            var _this = this,
                query = this.generateQuery(limit),
                params = {
                    jsonp: "callback",
                    'query': {
                        'key': Constants.prototype.api_key,
                        'query': JSON.stringify(query)
                    }
            };

            return script.get(Constants.prototype.service_url, params)
                .then(function(data) {
                    var movieIndexes = [],
                        movieList = [];

                    while(movieIndexes.length < 4) {
                        var randomIndex = Math.floor((Math.random() * 100) - 1);
                        if(movieIndexes.indexOf(randomIndex) === -1){
                            movieIndexes.push(randomIndex);
                            movieList.push(data.result[randomIndex]);
                        }
                    }

                    return _this.parseMovies(movieList, limit);
                }, function (err) {
                    console.log(err)
                });
        },

        parseMovies: function(movieList, limit) {
            var parsedMovieList = [];

            for(var m=0; m < movieList.length; m++) {
                if(movieList[m]){
                    parsedMovieList.push(
                        new Movie(
                            movieList[m].name,
                            movieList[m].tagline[0],
                            movieList[m].initial_release_date,
                            movieList[m].genre[0],
                            movieList[m].directed_by[0],
                            movieList[m].gross_revenue[0].amount,
                            this.parseActors(movieList[m].starring),
                            movieList[m].mid
                        )
                    );
                } else {
                    this.getMovies(limit);
                }
            }

            return parsedMovieList;
        },

        parseActors: function(actorList) {
            var parsedActorList = [];

            for (var star=0; star < actorList.length; star++) {
                parsedActorList.push(
                    new Actor(
                        actorList[star]['/film/performance/actor'].name,
                        actorList[star]['/film/performance/actor'].mid
                    )
                );
            }

            return parsedActorList;
        },

        getRandomNumber: function(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    });
});