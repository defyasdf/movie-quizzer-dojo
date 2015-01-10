define([
    'dijit/_WidgetsInTemplateMixin',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetBase',
    'dojo/_base/declare',
    'dojo/_base/lang',
    "dojo/topic",
    "dojo/dom-attr",
    "dojo/dom-class",
    'dojo/dom',
    'dojo/dom-construct',
    'dojo/text!app/dijit/templates/Play',
    "app/data/Constants",
    "app/utils/FreebaseUtil",
    "app/events/MovieEvent",
    "app/dijit/Result"
], function (WidgetsInTemplateMixin, TemplatedMixin, WidgetBase, declare, lang, topic,
             domAttr, domClass, dom, domConstruct, template, Constants, FreebaseUtil,
             MovieEvent, Result) {
    return declare([WidgetBase, TemplatedMixin, WidgetsInTemplateMixin], {
        templateString: template,
        movies: [],
        movie: null,

        startup: function () {
            this.inherited(arguments);

            //Subscribe to our events
            topic.subscribe(MovieEvent.prototype.MOVIE_CLICKED, lang.hitch(this, this.movieClicked));
            topic.subscribe(MovieEvent.prototype.NEXT_ROUND, lang.hitch(this, this.setupMovies));

            //Initially setup a round of movies
            this.setupMovies();
        },

        setupMovies: function() {
            domClass.remove(this.movieLoading, "hidden");
            domClass.add(this.movieDetails, "hidden");

            //In case we have movies from a previous round, remove all to be sure we start clean
            this.removeAllMovies();

            //Get the movies with a call to Freebase using our Freebase Utility
            FreebaseUtil.prototype.getMovies(Constants.prototype.NUMBER_OF_MOVIES)
                .then(lang.hitch(this, function(movies) {
                    domClass.remove(this.movieDetails, "hidden");
                    domClass.add(this.movieLoading, "hidden");

                    //We need to loop over each movie and place the resulting dom node into
                    //our movie list
                    for(var mv=0; mv < movies.length; mv++) {
                        //Call the startup method as it is not always called automatically
                        movies[mv].startup();
                        //Place the movie as the last item in our movie list
                        domConstruct.place(movies[mv].domNode, dom.byId("movieList"), "last");
                    }

                    //Randomly select one of our movies as the correct option
                    this.setSelectedMovie(
                        movies[
                            FreebaseUtil.prototype.getRandomNumber(
                                0,
                                (Constants.prototype.NUMBER_OF_MOVIES - 1)
                            )
                        ]
                    );

                    //Store the movies so we can have a reference to destroy them later
                    this.movies = movies;
                }));
        },

        movieClicked: function(evt) {
            var result;
            if(evt.movieID === this.movie.movieID) {
                //User selected the correct movie
                result = new Result(true);
            } else {
                //User selected the incorrect movie, so we pass along the correct title
                result = new Result(false, this.movie.title);
            }

            //Remove all movies from our movie listing
            this.removeAllMovies();

            //Startup the result widget and place it just before our movie list (which is now empty)
            result.startup();
            domConstruct.place(result.domNode, "movieList", "before");
        },

        setSelectedMovie: function(movieObj) {
            //if the movie does not have a tagline, we don't use it and start the process over. Otherwise
            //we set the movie attributes to the elements in the dom
            if(movieObj.tagline) {
                domAttr.set(this.taglineLabel, "innerHTML", '"' + movieObj.tagline + '"');
                domAttr.set(this.yearLabel, "innerHTML", movieObj.releaseDate);
                domAttr.set(this.genreLabel, "innerHTML", movieObj.genre);
                domAttr.set(this.directorLabel, "innerHTML", movieObj.director);
                domAttr.set(this.revenueLabel, "innerHTML", movieObj.revenue);
                this.movie = movieObj;
            } else {
                //Get new movies until we have a tagline
                this.setupMovies();
            }
        },

        removeAllMovies: function() {
            for(var mv=0; mv < this.movies.length; mv++) {
                this.movies[mv].destroy();
            }

            domAttr.set(this.movieList, "innerHTML", "");
        }
    });
});
