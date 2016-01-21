;(function () {

  'use strict';

  angular.module('app', [])
    .controller('RtmpController', function ($scope, $http) {

      var $scope = this;

      $scope.interval = null;

      $scope.endpoint = 'http://stream-1.handson.tv/stat' || 'http://127.0.0.1/stat'

      $scope.time = 1000;

      $scope.submit = function() {
        $scope.stop();

        $scope.interval = setInterval(function () {

          var res = $http.get($scope.endpoint);

          res.success(function(data, status, headers, config) {
            var jxon = xmlToJSON.parseString(data, { childrenAsArray: false });
            var rtmp = jxon.rtmp;

            if (!Array.isArray(rtmp.server.application.live.stream)) {
              rtmp.server.application.live.stream = [rtmp.server.application.live.stream];
            }

            rtmp.server.application.live.stream.forEach(function (stream) {
              if (!Array.isArray(stream.client)) {
                stream.client = [stream.client];
              }
            });

            $scope.rtmp = rtmp;

            var timeout = setTimeout(function () {
              rtmp.server.application.live.stream.forEach(function (stream) {
                var timestamp = stream.time._text;
                var clients = stream.client;
                ChartClientLength.init('#chart-client-length-' + stream.name._text, timestamp, clients.length);
                ChartClientFlashver.init('#chart-client-flashver-' + stream.name._text, timestamp, clients);
              });
              clearTimeout(timeout);
            }, 50);
          });

          res.error(function(data, status, headers, config) {
            $scope.stop();
            alert('It could not connect to the server');
          });

        }, $scope.time);
      };

      $scope.stop = function () {
        if ($scope.interval) {
          clearInterval($scope.interval);
        }
      }

    })
    .directive('myArticle', function () {
      return {
        scope: true,
        restrict: 'EA',
        replace: true,
        templateUrl: 'my-article.html',
        link: function (scope, element, attrs, controller) {
          scope.label = attrs.label;
          attrs.$observe('value', function(value){
            scope.value = attrs.value;
          });
        }
      };
    });


})()
