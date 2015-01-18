/**
 * Utility module to perform data calls to Google Freebase
 *
 * @module app/utils/FreebaseUtil
 * @requires app/dijit/Movie
 * @requires app/dijit/Actor
 * @requires app/data/Constants
 */

define([
    'dojo/_base/declare',
    "dojo/request/script",
    "app/data/Constants",
    "app/dijit/Movie",
    "app/dijit/Actor"
], function (declare, script, Constants, Movie, Actor) {
    return declare(null, {
        fullMovieList: [],

        /**
         * Generates a Freebase query to use to retrieve a list of movies
         * @param {boolean} guessIsCorrect - Was the user's guess correct
         * @param {string} correctTitle - The correct title of the movie, only populated if the user's guess was incorrect.
         * @returns {array} array containing query object
         */
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

        /**
         * Retrieves a list of Movie objects using a Freebase query to be used in the game.
         * @param {integer} limit - The number of movies to return in the original freebase query.
         * @returns {array} Array of Movie objects
         */
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

        /**
        * Converts a list of Freebase movie objects to app/dijit/Movie objects to be used in the game.
        * @param {array} movieList - A list of Freebase movie objects
        * @param {integer} limit - The number of movies to return in the original freebase query.
        * @returns {array} Array of Movie objects
        */
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

        /**
         * Converts a list of Freebase actor objects to app/dijit/Actor objects to be used in the game.
         * @param {array} actorList - A list of Freebase actor objects
         * @returns {array} Array of Actor objects
         */
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

        /**
         * Retrieves a random number, given a min and max range to choose from.
         * @param {integer} min - Minimum number in range
         * @param {integer} max - Maximum number in range
         * @returns {integer} Random number within min/max range
         */
        getRandomNumber: function(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    });
});