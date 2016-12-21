/**
 * Created by mspalti on 12/21/16.
 */
(function () {
  'use strict';

  function BarController($element,
                         $attrs,
                         AreaObserver) {

    const ctrl = this;

    var margin,
      width,
      height,
      container,
      svg,
      xAxis,
      yAxis,
      x,
      y;


    AreaObserver.subscribe(function onNext() {
        _initChart();
    });

    ctrl.$onInit = function () {
      _initChart();
    };

    function _initChart() {

      $element.ready(function () {
        prepareContainer();
        setDimens();
      });
    }

    var containerEl = document.getElementById($attrs.id);

    /**
     * Clear the chart.  This will be called when an empty
     * data array is passed to the directive.
     */
    function prepareContainer() {
      if (svg !== undefined) {
        svg = container.select('svg');
        svg.selectAll('g').remove();
        svg.select('circle').remove();
        containerEl.innerHTML = '';
      }
    }

    var setDimens = function () {

      margin = {top: 20, right: 20, bottom: 30, left: 40};

      width = (containerEl.offsetWidth - margin.left - margin.right);

      height = (containerEl.offsetHeight - margin.top - margin.bottom);

      x = d3.scale.ordinal()
        .rangeRoundBands([0, width], 0.1);

      y = d3.scale.linear()
        .range([height, 0]);

      xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

      /**
       * The top level d3 node.
       * @type {Object}
       */
      container = d3.select(containerEl);

      svg = container.append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      drawBarChart(ctrl.data);
    };

    // d3.tsv("data.tsv", type, function(error, data) {
    //   if (error) throw error;
    var drawBarChart = function (data) {

      yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(10)
        .tickFormat(d3.format("d"))
        .tickSubdivide(0);

      x.domain(data.map(function (d) {
        return d.name;
      }));
      y.domain([0, d3.max(data, function (d) {
        return d.count;
      })]);

      svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

      svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Frequency");

      svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) {
          return x(d.name);
        })
        .attr("width", x.rangeBand())
        .attr("y", function (d) {
          return y(d.count);
        })
        .attr("height", function (d) {
          return height - y(d.count);
        });
    };

  }

  taggerComponents.component('barVisualizationComponent', {
    bindings: {
      data: '<',
      label: '@'
    },
    controller: BarController

  });

})();
