;(function (window, document, undefined) {

  'use strict';

  var ChartStreamBits = (function () {

    var _context = {};

    var _populate = function (bindto, data) {
      var svg = d3.select(bindto)
                  .datum(data)
                  .call(_context[bindto].chart);

      svg.append("text")
        .attr("x", '50%' )
        .attr("y", 15)
        .style("text-anchor", "middle")
        .text(_context[bindto].title);
    }

    return {

      init : function (bindto, streams, timestamp, bandwidth, title) {
        if (!_context[bindto]) {
          _context[bindto] = {
            title: title,
            keys: {},
            chart: null
          };
        }

        streams.forEach(function (stream) {
          var name = stream.name;
          if (!_context[bindto].keys[name]) {
            _context[bindto].keys[name] = [];
          }
          _context[bindto].keys[name].push({
            x: timestamp,
            y: stream[bandwidth]
          });
        });

        var data = [];
        for (var key in _context[bindto].keys) {
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
              .axisLabel('Bandwidth (bits)')
              .tickFormat(d3.format('d'));

            _populate(bindto, data);

            nv.utils.windowResize(_context[bindto].chart.update);

            return _context[bindto].chart;
          });
        }
      }

    }

  })();

  window.ChartStreamBits = ChartStreamBits;

})(window, document);
