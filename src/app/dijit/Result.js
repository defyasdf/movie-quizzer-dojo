define([
    'dijit/_WidgetsInTemplateMixin',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetBase',
    'dojo/_base/declare',
    "dojo/_base/lang",
    "dojo/on",
    "dojo/dom-construct",
    "dojo/dom-class",
    "dojo/topic",
    'dojo/text!app/dijit/templates/Result.html',
    "app/events/MovieEvent"
], function (WidgetsInTemplateMixin, TemplatedMixin, WidgetBase, declare, lang, on, domConstruct, domClass, topic, template, MovieEvent) {
    return declare([WidgetBase, TemplatedMixin, WidgetsInTemplateMixin], {
        templateString: template,
        guessIsCorrect: false,
        resultLabel: "",
        correctTitle: "",

        constructor: function(guessIsCorrect, correctTitle) {
            this.guessIsCorrect = guessIsCorrect;

            if(this.guessIsCorrect) {
                this.resultLabel = "Correct!";
                this.correctTitle = "";
            } else {
                this.resultLabel = "Wrong!";
                this.correctTitle = correctTitle;
            }
        },

        startup: function () {
            this.inherited(arguments);

            if(this.guessIsCorrect) {
                domConstruct.destroy(this.correctTitleLabel);
                domClass.remove(this.resultLabel, "guess-incorrect-label");
                domClass.add(this.resultLabel, "guess-correct-label");
            } else {
                domClass.remove(this.resultLabel, "guess-correct-label");
                domClass.add(this.resultLabel, "guess-incorrect-label");
            }

            on(this.nextRoundBtn, "click", lang.hitch(this, this.nextRoundClicked));
        },

        nextRoundClicked: function(evt) {
            topic.publish(MovieEvent.prototype.NEXT_ROUND);

            this.destroy();
        }
    });
});
