;(function () {

  'use strict';

  angular.module('app', [])
    .controller('RtmpController', function ($scope, $http) {

      var $scope = this;

      $scope.interval = null;

      $scope.endpoint = 'http://127.0.0.1/stat'

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

            ChartRtmpBits.init('#chart-rtmp-bits', rtmp.uptime._text, rtmp.bw_in._text, rtmp.bw_out._text);
            ChartRtmpBytes.init('#chart-rtmp-bytes', rtmp.uptime._text, rtmp.bytes_in._text, rtmp.bytes_out._text);

            var timeout = setTimeout(function () {
              rtmp.server.application.live.stream.forEach(function (stream) {
                var streamName = stream.name._text;
                var timestamp = stream.time._text;
                var clients = stream.client;

                ChartStreamBits.init('#chart-stream-bits-' + streamName, timestamp, stream.bw_in._text, stream.bw_out._text);
                ChartStreamBytes.init('#chart-stream-bytes-' + streamName, timestamp, stream.bytes_in._text, stream.bytes_out._text);

                ChartClientLength.init('#chart-client-length-' + streamName, timestamp, clients.length);
                ChartClientFlashver.init('#chart-client-flashver-' + streamName, timestamp, clients);
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
