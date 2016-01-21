;(function (window, document, undefined) {

  'use strict';

  var ChartClientLength = (function () {

    var data = [{
      key: 'Client length',
      values: []
    }];

    var chart;

    var _populate = function (bindto, data) {
      d3.select(bindto)
        .datum(data)
        .call(chart);
    }

    return {

      init : function (bindto, timestamp, length) {
        data[0].values.push({
          x: timestamp,
          y: length
        });

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
              .axisLabel('Timestamp (ms)')
              .tickFormat(d3.format(',r'));

            chart.yAxis
              .axisLabel('Client length')
              .tickFormat(d3.format('d'));

            _populate(bindto, data);

            nv.utils.windowResize(chart.update);

            return chart;
          });
        }
      }

    }

  })();

  window.ChartClientLength = ChartClientLength;

})(window, document);
