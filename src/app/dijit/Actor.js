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

        constructor: function(name, actorID) {
            this.name = name;
            this.actorID = actorID;
            this.imageURL = this.getImageURL(actorID);
        },

        startup: function () {
            this.inherited(arguments);
        },

        getImageURL: function(actorID) {
            return Constants.prototype.image_path.replace("{{id}}", actorID);
        }
    });
});
