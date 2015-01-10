define([
    'dijit/_WidgetsInTemplateMixin',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetBase',
    'dojo/_base/declare',
    "dojo/_base/lang",
    "dojo/on",
    "dojo/topic",
    'dojo/text!app/dijit/templates/Movie.html',
    "app/events/MovieEvent"
], function (WidgetsInTemplateMixin, TemplatedMixin, WidgetBase, declare, lang, on, topic, template, MovieEvent) {
    return declare([WidgetBase, TemplatedMixin, WidgetsInTemplateMixin], {
        templateString: template,
        title: "",
        tagline: "",
        releaseDate: "",
        genre: "",
        director: "",
        revenue: "",
        actors: [],
        imageURL: "",
        movieID: "",

        constructor: function(title, tagline, releaseDate, genre, director, revenue, actors, imageURL, movieID) {
            this.title = title;
            this.tagline = tagline;
            this.releaseDate = releaseDate;
            this.genre = genre;
            this.director = director;
            this.revenue = revenue;
            this.actors = actors;
            this.imageURL = imageURL;
            this.movieID = movieID;
        },

        startup: function () {
            this.inherited(arguments);
            on(this.movieLink, "click", lang.hitch(this, this.movieClicked));
        },

        movieClicked: function(evt) {
            topic.publish(MovieEvent.prototype.MOVIE_CLICKED, {
                movieID: this.movieID
            });
        },

        _setReleaseDateAttr: function(releaseDate) {
            this.releaseDate = new Date(releaseDate).getFullYear();
        },

        _setRevenueAttr: function(revenue) {
            this.revenue = '$' + Number(revenue)
                .toFixed(2)
                .replace(/\d(?=(\d{3})+\.)/g, '$&,');
        }

    });
});
