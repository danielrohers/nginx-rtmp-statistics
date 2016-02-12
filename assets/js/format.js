/*
 * Format - v1.0.0
 * @danielrohers
*/
;(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory;
  } else {
    root.Format = factory(root);
  }
})(this, function (root) {

  'use strict';

  var _time = function(seconds) {
    if (!seconds) { return; }

    var time = seconds;
    var hours   = Math.floor(time / 3600);
    var minutes = Math.floor((time - (hours * 3600)) / 60);
    var seconds = time - (hours * 3600) - (minutes * 60);
    if (hours < 10) { hours = '0' + hours; }
    if (minutes < 10) { minutes = '0' + minutes; }
    if (seconds < 10) { seconds = '0' + seconds; }
    return hours + ':' + minutes + ':' + seconds;
  };

  return {

    time : _time

  }

});