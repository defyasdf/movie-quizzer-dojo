/**
 * Main wrapper module for application, sets up layout template and general
 * navigation routing.
 *
 * @module app/dijit/Main
 */

define([
    'dijit/_WidgetsInTemplateMixin',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetBase',
    'dojo/_base/declare',
    'dojo/_base/lang',
    "dojo/on",
    "dojo/topic",
    "dojo/dom-class",
    'dojo/text!app/dijit/templates/Main.html',
    "app/dijit/About",
    "app/dijit/Play",
    "app/events/NavigationEvent"
], function (WidgetsInTemplateMixin, TemplatedMixin, WidgetBase, declare,
             lang, on, topic, domClass, template, About, Play, NavigationEvent) {

    return declare([WidgetBase, TemplatedMixin, WidgetsInTemplateMixin], {
        templateString: template,

        /**
         * Called after DOM fragments have been added to the document. Subscribes to
         * NavigationEvents to handle routing and navigation menu button
         * clicks.
         */
        startup: function () {
            this.inherited(arguments);

            //Subscribe
            topic.subscribe(NavigationEvent.prototype.ABOUT, lang.hitch(this, this.navigateToAbout));
            topic.subscribe(NavigationEvent.prototype.PLAY, lang.hitch(this, this.navigateToPlay));

            on(this.navAboutBtn, "click", lang.hitch(this, this.navigateToAbout));
            on(this.navPlayBtn, "click", lang.hitch(this, this.navigateToPlay));
        },

        /**
         * Handles navigation routing to show About page and hide all other content.
         */
        navigateToAbout: function() {
            domClass.add("playContainer", "hidden");
            domClass.remove("aboutContainer", "hidden");
        },

        /**
         * Handles navigation routing to show Play page and hide all other content.
         */
        navigateToPlay: function() {
            domClass.add("aboutContainer", "hidden");
            domClass.remove("playContainer", "hidden");
        }

    });
});
