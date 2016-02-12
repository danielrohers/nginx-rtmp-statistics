;(function (window, document, undefined) {

  'use strict';

  var ChartStreamBits = (function () {

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

      init : function (bindto, timestamp, bw_in, bw_out) {
        data[0].values.push({ x: timestamp, y: bw_in });
        data[1].values.push({ x: timestamp, y: bw_out });

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
              .axisLabel('Timestamp (ms)')
              .tickFormat(d3.format(',r'));

            chart.yAxis
              .axisLabel('Bandwidth (bits)')
              .tickFormat(d3.format('d'));

            _populate(bindto);

            nv.utils.windowResize(chart.update);

            return chart;
          });
        }
      }

    }

  })();

  window.ChartStreamBits = ChartStreamBits;

})(window, document);
