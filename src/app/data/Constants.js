/**
 * Module for defining application constants used within other modules.
 *
 * @module app/data/Constants
 */

define([
    'dojo/_base/declare',
    "dojo/request/script"
], function (declare, script) {
    return declare([], {
        /**
         * @constant NUMBER_OF_MOVIES
         * @description The number of movies to show for each round
         **/
        NUMBER_OF_MOVIES: 4,
        /**
         * @constant SERVICE_URL
         * @description The Google Freebase MQL service url.
         **/
        service_url: 'https://www.googleapis.com/freebase/v1/mqlread',
        /**
         * @constant NUMBER_OF_MOVIES
         * @description The number of movies for guessing
         **/
        api_key: 'AIzaSyCTjRzqa0530KFmdQHoWnj2dYVhDoThRts',
        image_path: 'https://usercontent.googleapis.com/freebase/v1/image{{id}}?maxwidth=64&maxheight=64&mode=fillcropmid&key=' + 'AIzaSyCTjRzqa0530KFmdQHoWnj2dYVhDoThRts',
        image_path_poster: 'https://usercontent.googleapis.com/freebase/v1/image{{id}}?maxwidth=150&maxheight=180&mode=fillcropmid&key=' + 'AIzaSyCTjRzqa0530KFmdQHoWnj2dYVhDoThRts'
    });
});