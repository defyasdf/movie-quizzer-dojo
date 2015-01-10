define([
    'dijit/_WidgetsInTemplateMixin',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetBase',
    'dojo/_base/declare',
    'dojo/text!app/dijit/templates/Actor.html'
], function (WidgetsInTemplateMixin, TemplatedMixin, WidgetBase, declare, template) {
    return declare([WidgetBase, TemplatedMixin, WidgetsInTemplateMixin], {
        templateString: template,
        name: "",
        imageURL: "",

        constructor: function(name, imageURL) {
            this.setName(name);
            this.setImageURL(imageURL);
        },

        postMixInProperties: function () {
            this.inherited(arguments);
        },

        buildRendering: function () {
            this.inherited(arguments);
        },

        postCreate: function () {
            this.inherited(arguments);
        },

        startup: function () {
            this.inherited(arguments);
        },

        setName: function(name) {
            this.name = name;
        },

        setImageURL: function(imageURL) {
            this.imageURL = imageURL;
        }
    });
});
