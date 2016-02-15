;(function (window, document, undefined) {

  'use strict';

  var ChartClientFlashver = (function () {

    var _context = {};

    var _populate = function (bindto, data) {
      var svg = d3.select(bindto)
                  .datum(data)
                  .call(_context[bindto].chart);

      svg.append("text")
        .attr("x", '50%' )
        .attr("y", 15)
        .style("text-anchor", "middle")
        .text("Number of clients flashver");
    }

    return {

      init : function (bindto, timestamp, clients) {
        if (!_context[bindto]) {
          _context[bindto] = {
            keys: {},
            chart: null
          };
        }

        var values = {};
        clients.forEach(function (client) {
          var flashver = client.flashver;
          if (!values[flashver]) {
            values[flashver] = 1;
          } else {
            values[flashver] += 1;
          }
          if (!_context[bindto].keys[flashver]) {
            _context[bindto].keys[flashver] = [];
          }
        });

        var data = [];
        for (var key in _context[bindto].keys) {
          _context[bindto].keys[key].push({
            x: timestamp,
            y: values[key] || 0
          });
          data.push({
            key: key,
            values: _context[bindto].keys[key]
          });
        }

        if (_context[bindto].chart) {
          _populate(bindto, data);
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
              .axisLabel('Flashver')
              .tickFormat(d3.format('d'));

            _populate(bindto, data);

            nv.utils.windowResize(_context[bindto].chart.update);

            return _context[bindto].chart;
          });
        }
      }

    }

  })();

  window.ChartClientFlashver = ChartClientFlashver;

})(window, document);
