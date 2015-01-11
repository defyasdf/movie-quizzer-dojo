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

        startup: function () {
            this.inherited(arguments);

            topic.subscribe(NavigationEvent.prototype.ABOUT, lang.hitch(this, this.navigateToAbout));
            topic.subscribe(NavigationEvent.prototype.PLAY, lang.hitch(this, this.navigateToPlay));

            on(this.navAboutBtn, "click", lang.hitch(this, this.navigateToAbout));
            on(this.navPlayBtn, "click", lang.hitch(this, this.navigateToPlay));
        },

        navigateToAbout: function() {
            domClass.add("playContainer", "hidden");
            domClass.remove("aboutContainer", "hidden");
        },

        navigateToPlay: function() {
            domClass.add("aboutContainer", "hidden");
            domClass.remove("playContainer", "hidden");
        }

    });
});
