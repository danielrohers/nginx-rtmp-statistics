;(function (window, document, undefined) {

  'use strict';

  var ChartClientFlashver = (function () {

    var keys = {};

    var chart;

    var _populate = function (bindto, data) {
      d3.select(bindto)
        .datum(data)
        .call(chart);
    }

    return {

      init : function (bindto, timestamp, clients) {
        var values = {};
        clients.forEach(function (client) {
          var flashver = client.flashver;
          if (!values[flashver]) {
            values[flashver] = 1;
          } else {
            values[flashver] += 1;
          }
          if (!keys[flashver]) {
            keys[flashver] = [];
          }
        });

        var data = [];
        for (var key in keys) {
          keys[key].push({
            x: timestamp,
            y: values[key] || 0
          });
          data.push({
            key: key,
            values: keys[key]
          });
        }

        if (chart) {
          _populate(bindto, data);
          chart.update();
        } else {
          nv.addGraph(function() {
            chart = nv.models.lineChart().options({
              duration: 0,
              useInteractiveGuideline: true,
              interactive: false,
              showLegend: true,
              showXAxis: true,
              showYAxis: true
            });

            chart.xAxis
              .axisLabel('Timestamp')
              .tickFormat(Format.time);

            chart.yAxis
              .axisLabel('Flashver')
              .tickFormat(d3.format('d'));

            _populate(bindto, data);

            nv.utils.windowResize(chart.update);

            return chart;
          });
        }
      }

    }

  })();

  window.ChartClientFlashver = ChartClientFlashver;

})(window, document);
