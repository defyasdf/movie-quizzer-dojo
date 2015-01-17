/**
 * Event constants for movies
 *
 * @module app/events/MovieEvent
 */

define([
    'dojo/_base/declare'
], function (declare) {
    return declare([], {

        /**
         * @constant MOVIE_CLICKED
         * @description event used when a movie is clicked.
         **/
        MOVIE_CLICKED: "movie-event/movie-clicked",
        /**
         * @constant NEXT_ROUND
         * @description event used when moved to the next round.
         **/
        NEXT_ROUND: "movie-event/next-round"
    });
});