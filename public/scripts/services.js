'use strict';

angular.module('confusionApp')
.constant("baseURL", "https://ecarrent.eu-gb.mybluemix.net/")
.factory('menuFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

        return $resource(baseURL + "dishes/:id", null, {
            'update': {
                method: 'PUT'
            }
        });

}])

.factory('commentFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

        return $resource(baseURL + "dishes/:id/comments/:commentId", {id:"@Id", commentId: "@CommentId"}, {
            'update': {
                method: 'PUT'
            }
        });

}])

.factory('feedbackFactory', ['$resource', 'baseURL', function ($resource, baseURL) {


    return $resource(baseURL + "feedback/:id", null, {
            'update': {
                method: 'PUT'
            }
        });

}])
;