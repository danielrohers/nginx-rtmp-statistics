;(function (window, document, undefined) {

  'use strict';

  var ChartClientLength = (function () {

    var data = [{
      key: 'Clients',
      values: []
    }];

    var chart;

    var _populate = function (bindto, data) {
      var svg = d3.select(bindto)
                .datum(data)
                .call(chart);

      svg.append("text")
        .attr("x", '50%' )
        .attr("y", 15)
        .style("text-anchor", "middle")
        .text("Number of clients");
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
              .axisLabel('Timestamp')
              .tickFormat(Format.time);

            chart.yAxis
              .axisLabel('Clients')
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
