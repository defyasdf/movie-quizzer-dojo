/**
 * Widget for displaying description of the site and giving attribution to frameworks and services used
 *
 * @module app/dijit/About
 * @requires app/events/NavigationEvent
 */

define([
    'dijit/_WidgetsInTemplateMixin',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetBase',
    'dojo/_base/declare',
    "dojo/_base/lang",
    "dojo/on",
    "dojo/topic",
    "app/events/NavigationEvent",
    'dojo/text!app/dijit/templates/About.html'
], function (WidgetsInTemplateMixin, TemplatedMixin, WidgetBase, declare, lang, on, topic, NavigationEvent, template) {
    return declare([WidgetBase, TemplatedMixin, WidgetsInTemplateMixin], {
        templateString: template,

        /**
         * Called after DOM fragments have been added to the document.
         * Handles button click to dispatch navigation event to route to play the game.
         */
        startup: function () {
            this.inherited(arguments);

            on(this.playGameBtn, "click", lang.hitch(this, this.playGameClicked));
        },

        /**
         * Publishes a navigation event to route to play the game.
         */
        playGameClicked: function(evt) {
            topic.publish(NavigationEvent.prototype.PLAY);
        }
    });
});
