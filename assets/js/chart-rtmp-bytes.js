;(function (window, document, undefined) {

  'use strict';

  var ChartRtmpBytes = (function () {

    var data = [
      {
        key: 'In',
        color: '#7777ff',
        values: []
      },
      {
        key: 'Out',
        color: '#DE4545',
        values: []
      }
    ];

    var chart;

    var _populate = function (bindto) {
      d3.select(bindto)
        .datum(data)
        .call(chart);
    }

    return {

      init : function (bindto, timestamp, bytes_in, bytes_out) {
        data[0].values.push({ x: timestamp, y: bytes_in });
        data[1].values.push({ x: timestamp, y: bytes_out });

        if (chart) {
          _populate(bindto);
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
              .axisLabel('Uptime (ms)')
              .tickFormat(d3.format(',r'));

            chart.yAxis
              .axisLabel('Bytes')
              .tickFormat(d3.format('d'));

            _populate(bindto);

            nv.utils.windowResize(chart.update);

            return chart;
          });
        }
      }

    }

  })();

  window.ChartRtmpBytes = ChartRtmpBytes;

})(window, document);
