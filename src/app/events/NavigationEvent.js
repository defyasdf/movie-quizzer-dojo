/**
 * Event constants for navigation
 *
 * @module app/events/NavigationEvent
 */


define([
    'dojo/_base/declare'
], function (declare) {
    return declare([], {
        /**
         * @constant ABOUT
         * @description event used to show the about page.
         **/
        ABOUT: "navigation-event/about",
        /**
         * @constant PLAY
         * @description event used to show the play game page.
         **/
        PLAY: "navigation-event/play"
    });
});