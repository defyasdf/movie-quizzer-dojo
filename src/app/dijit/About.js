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

        startup: function () {
            this.inherited(arguments);

            on(this.playGameBtn, "click", lang.hitch(this, this.playGameClicked));
        },

        playGameClicked: function(evt) {
            topic.publish(NavigationEvent.prototype.PLAY);
        }
    });
});
