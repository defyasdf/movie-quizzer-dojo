/**
 * Widget for displaying image and information about an Actor.
 *
 * @module app/dijit/Actor
 * @requires app/data/Constants
 */

define([
    'dijit/_WidgetsInTemplateMixin',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetBase',
    'dojo/_base/declare',
    'dojo/text!app/dijit/templates/Actor.html',
    "app/data/Constants"
], function (WidgetsInTemplateMixin, TemplatedMixin, WidgetBase, declare, template, Constants) {
    return declare([WidgetBase, TemplatedMixin, WidgetsInTemplateMixin], {
        templateString: template,
        name: "",
        imageURL: "",
        actorID: "",

        /**
         * Creates an Actor.
         * @param {string} name - The name of the actor.
         * @param {string} actorID - The freebase ID of the actor.
         */
        constructor: function(name, actorID) {
            this.name = name;
            this.actorID = actorID;
            this.imageURL = this.getImageURL(actorID);
        },

        /**
         * Called after DOM fragments have been added to the document.
         */
        startup: function () {
            this.inherited(arguments);
        },

        /**
         * Creates image url for actor's image. The base image url is pulled from the Constants module,
         * and the {{id}} template string is replaced with the actor's ID to make a fully qualified image
         * url.
         * @param {string} actorID - The freebase ID of the actor.
         */
        getImageURL: function(actorID) {
            //use the image constant and replace the id placeholder with the actorID string
            return Constants.prototype.image_path.replace("{{id}}", actorID);
        }
    });
});
