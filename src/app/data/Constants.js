define([
    'dojo/_base/declare',
    "dojo/request/script"
], function (declare, script) {
    return declare([], {
        NUMBER_OF_MOVIES: 4,
        service_url: 'https://www.googleapis.com/freebase/v1/mqlread',
        api_key: 'AIzaSyCTjRzqa0530KFmdQHoWnj2dYVhDoThRts',
        image_path: 'https://usercontent.googleapis.com/freebase/v1/image{{id}}?maxwidth=64&maxheight=64&mode=fillcropmid&key=' + 'AIzaSyCTjRzqa0530KFmdQHoWnj2dYVhDoThRts',
        image_path_poster: 'https://usercontent.googleapis.com/freebase/v1/image{{id}}?maxwidth=150&maxheight=180&mode=fillcropmid&key=' + 'AIzaSyCTjRzqa0530KFmdQHoWnj2dYVhDoThRts'
    });
});