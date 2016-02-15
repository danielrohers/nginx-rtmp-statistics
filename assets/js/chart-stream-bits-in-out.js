;(function (window, document, undefined) {

  'use strict';

  var ChartStreamBitsInOut = (function () {

    var _context = {};

    var _populate = function (bindto) {
      var svg = d3.select(bindto)
                  .datum(_context[bindto].data)
                  .call(_context[bindto].chart);

      svg.append("text")
        .attr("x", '50%' )
        .attr("y", 15)
        .style("text-anchor", "middle")
        .text("Bandwidth");
    }

    return {

      init : function (bindto, timestamp, bw_in, bw_out) {
        if (!_context[bindto]) {
          _context[bindto] = {
            chart: null,
            data: [
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
            ]
          }
        }

        _context[bindto].data[0].values.push({ x: timestamp, y: bw_in });
        _context[bindto].data[1].values.push({ x: timestamp, y: bw_out });

        if (_context[bindto].chart) {
          _populate(bindto);
          _context[bindto].chart.update();
        } else {
          nv.addGraph(function() {
            _context[bindto].chart = nv.models.lineChart().options({
              duration: 0,
              useInteractiveGuideline: true,
              interactive: false,
              showLegend: true,
              showXAxis: true,
              showYAxis: true
            });

            _context[bindto].chart.xAxis
              .axisLabel('Timestamp')
              .tickFormat(Format.time);

            _context[bindto].chart.yAxis
              .axisLabel('Bandwidth (bits)')
              .tickFormat(d3.format('d'));

            _populate(bindto);

            nv.utils.windowResize(_context[bindto].chart.update);

            return _context[bindto].chart;
          });
        }
      }

    }

  })();

  window.ChartStreamBitsInOut = ChartStreamBitsInOut;

})(window, document);
