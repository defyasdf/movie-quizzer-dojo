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
            this.name = name;
            this.imageURL = imageURL;
        },

        startup: function () {
            this.inherited(arguments);
        }
    });
});
