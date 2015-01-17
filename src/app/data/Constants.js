/**
 * Module for defining application constants used within other modules.
 *
 * @module app/data/Constants
 */

define([
    'dojo/_base/declare'
], function (declare) {
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
         * @constant API_KEY
         * @description The API Key for Google Freebase
         **/
        api_key: 'AIzaSyCTjRzqa0530KFmdQHoWnj2dYVhDoThRts',
        /**
         * @constant IMAGE_PATH
         * @description Image path template for freebase images, using {{id}} as a placeholder for the mid result
         **/
        image_path: 'https://usercontent.googleapis.com/freebase/v1/image{{id}}?maxwidth=64&maxheight=64&mode=fillcropmid&key=' + 'AIzaSyCTjRzqa0530KFmdQHoWnj2dYVhDoThRts',
        /**
         * @constant IMAGE_PATH_POSTER
         * @description Image path template for freebase movie poster images, using {{id}} as a placeholder for the mid result
         **/
        image_path_poster: 'https://usercontent.googleapis.com/freebase/v1/image{{id}}?maxwidth=150&maxheight=180&mode=fillcropmid&key=' + 'AIzaSyCTjRzqa0530KFmdQHoWnj2dYVhDoThRts'
    });
});