define([
    'dijit/_WidgetsInTemplateMixin',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetBase',
    'dojo/_base/declare',
    'dojo/_base/lang',
    "dojo/topic",
    "dojo/on",
    "dojo/dom-attr",
    "dojo/dom-class",
    'dojo/dom',
    'dojo/dom-construct',
    'dojo/text!app/dijit/templates/Play.html',
    "app/data/Constants",
    "app/utils/FreebaseUtil",
    "app/events/MovieEvent",
    "app/dijit/Result"
], function (WidgetsInTemplateMixin, TemplatedMixin, WidgetBase, declare, lang, topic, on,
             domAttr, domClass, dom, domConstruct, template, Constants, FreebaseUtil,
             MovieEvent, Result) {
    return declare([WidgetBase, TemplatedMixin, WidgetsInTemplateMixin], {
        templateString: template,
        movies: [],
        movie: null,
        freebaseUtil: new FreebaseUtil(),

        startup: function () {
            this.inherited(arguments);

            //Subscribe to our events
            topic.subscribe(MovieEvent.prototype.MOVIE_CLICKED, lang.hitch(this, this.movieClicked));
            topic.subscribe(MovieEvent.prototype.NEXT_ROUND, lang.hitch(this, this.setupMovies));

            on(this.movieHintBtn, "click", lang.hitch(this, this.movieHintClicked));

            //Initially setup a round of movies
            this.setupMovies();
        },

        toggleLoading: function(showLoading) {
            if(showLoading) {
                //show the loading message
                domClass.remove(this.movieLoading, "hidden");
                domClass.add(this.movieDetails, "hidden");
            } else {
                //hide the loading message
                domClass.remove(this.movieDetails, "hidden");
                domClass.add(this.movieLoading, "hidden");
            }
        },

        setupMovies: function() {
            //show our loading message and hide the movie list
            this.toggleLoading(true);

            //In case we have movies from a previous round, remove all to be sure we start clean
            this.removeAllMovies();

            //Get the movies with a call to Freebase using our Freebase Utility
            this.freebaseUtil.getMovies(Constants.prototype.NUMBER_OF_MOVIES)
                .then(lang.hitch(this, function(movies) {
                    //hide our loading message and show the movie list
                    this.toggleLoading(false);

                    //We need to loop over each movie and place the resulting
                    //dom node into our movie list
                    this.createMovieModuleList(movies);

                    //Randomly select one of our movies as the correct option
                    this.setSelectedMovie(
                        movies[
                            this.freebaseUtil.getRandomNumber(
                                0,
                                (Constants.prototype.NUMBER_OF_MOVIES - 1)
                            )
                        ]
                    );

                    //Store the movies so we can have a reference to destroy them later
                    this.movies = movies;
                }));
        },

        createMovieModuleList: function(movies) {
            for(var mv=0; mv < movies.length; mv++) {
                //Call the startup method as it is not always called automatically
                movies[mv].startup();
                //Place the movie as the last item in our movie list
                domConstruct.place(movies[mv].domNode, dom.byId("movieList"), "last");
            }
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

        movieHintClicked: function(evt) {
            domClass.add(this.movieHintBtn, "hidden");
            domClass.remove(this.movieHint, "hidden");
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

                //loop over the actors list and startup instances, place them into the dom
                for(var actorIdx=0; actorIdx < movieObj.actors.length; actorIdx++) {
                    movieObj.actors[actorIdx].startup();
                    domConstruct.place(movieObj.actors[actorIdx].domNode, "actorList", "last");
                }

                //store the selected movie for use later
                this.movie = movieObj;
            } else {
                //Get new movies until we have a tagline
                this.setupMovies();
            }
        },

        removeAllMovies: function() {
            //loop over all the movies
            for(var mv=0; mv < this.movies.length; mv++) {
                //destroy our movie instances
                this.movies[mv].destroy();

                //loop over all actors
                for(var act=0; act < this.movies[mv].actors.length; act++) {
                    //destroy our actor instances
                    this.movies[mv].actors[act].destroy();
                }

            }

            //hide the movie hint and show the hint button for the next movie
            domClass.add(this.movieHint, "hidden");
            domClass.remove(this.movieHintBtn, "hidden");
            //clear the movie and actor list, in case anything has not been cleaned up
            domAttr.set(this.movieList, "innerHTML", "");
            domAttr.set(this.actorList, "innerHTML", "");
        }
    });
});
