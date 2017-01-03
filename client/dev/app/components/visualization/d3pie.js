/*
 * Copyright (c) 2016.
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * Created by mspalti on 12/21/16.
 */
(function () {
  'use strict';


  function PieController($element,
                         $attrs,
                         AreaObserver) {

    const ctrl = this;

    var data = [];
    var DURATION = 800;
    var DELAY = 200;
    /**
     * Array of colors used by class attributes.
     * @type {Array<string> }*/
    var colors = ['seagreen', 'blue', 'skyblue', 'red', 'indigo', 'yellow', 'orange', 'green', 'maroon', 'coffee'];
    /**
     * The parent element
     * @type {Element}
     */
    var containerEl = document.getElementById($attrs.id),
      /**
       * The top level d3 node.
       * @type {Object}
       */
      container = d3.select(containerEl),
      labelsEl = container.select('.chart-data');

    AreaObserver.subscribe(function onNext() {
      $element.ready(function () {
        _initChart();
      });

    });

    ctrl.$onInit = function () {
      $element.ready(function () {
        _initChart();
      });

    };

    function _initChart() {
      var total = 0;
      if (ctrl.data) {
        total = ctrl.data.total;
        // calculate percentages
        let ratios = _ratios(ctrl.data.data, total);
        clearChart();
        drawPieChart(ratios);
      }

    }
    /**
     * Calculates percentage from integer counts
     * @param values   count by type
     * @param total     count of all types
     * @returns {Array}
     */
    function _ratios(values, total) {
      if (values) {
        var data = [];
        for (var i = 0; i < values.length; i++) {
          data[i] = {
            title: values[i].title,
            value: values[i].value / total,
            count: values[i].value
          };
        }
        return data;
      }

    }
    /**
     * Return the color name from the colors array.
     * @param i  the index of the array element
     * @returns {string}
     */
    function colorWheel(i) {
      return colors[i];
    }

    // d3 code begins here.

    /**
     * Clear the chart.  This will be called when an empty
     * data array is passed to the directive.
     */
    function clearChart() {

      var svg = container.select('svg');
      svg.selectAll('g').remove();
      svg.select('circle').remove();
      labelsEl.selectAll('.item-info').remove();
    }


    /**
     * Draws the pie chart
     */
    function drawPieChart(newData) {

      var width = containerEl.clientWidth / 2,
        height = width * 0.8,
        radius = Math.min(width, height) / 2,
        svg = container.select('svg')
          .attr('width', width)
          .attr('height', height);
      var pie = svg.append('g')
        .attr(
          'transform',
          'translate(' + width / 2 + ',' + height / 2 + ')'
        );

      var detailedInfo = svg.append('g')
        .attr('class', 'pieChart--detailedInformation');

      var twoPi = 2 * Math.PI;
      var pieData = d3.layout.pie()
        .value(function (d) {
          return d.value;
        });

      var arc = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);


      var pieChartPieces = pie.datum(newData)
        .selectAll('path')
        .data(pieData)
        .enter()
        .append('path')
        .attr('class', function (d, i) {
          return 'pieChart__' + colorWheel(i);
        })
        .attr('filter', 'url(#pieChartInsetShadow)')
        .attr('d', arc)
        .each(function () {
          this._current = {
            startAngle: 0,
            endAngle: 0
          };
        })
        .transition()
        .duration(DURATION)
        .attrTween('d', function (d) {
          var interpolate = d3.interpolate(this._current, d);
          this._current = interpolate(0);

          return function (t) {
            return arc(interpolate(t));
          };
        })
        .each('end', function handleAnimationEnd(d) {
          drawDetailedInformation(d.data, labelsEl);
        });

      function drawChartCenter() {
        var centerContainer = pie.append('g')
          .attr('class', 'pieChart--center');

        centerContainer.append('circle')
          .attr('class', 'pieChart--center--outerCircle')
          .attr('r', 0)
          .attr('filter', 'url(#pieChartDropShadow)')
          .transition()
          .duration(DURATION)
          .delay(DELAY)
          .attr('r', radius - 52);

        centerContainer.append('circle')
          .attr('id', 'pieChart-clippy')
          .attr('class', 'pieChart--center--innerCircle')
          .attr('r', 0)
          .transition()
          .delay(DELAY)
          .duration(DURATION)
          .attr('r', radius - 65)
          .attr('fill', '#fff');
      }

      drawChartCenter();

      /**
       * This counter variable provides the index
       * used to request colors.
       * @type {number}
       */
      var currentColor = 0;

      /**
       * Adds color key, title, and count information for a single item to the DOM.
       * @param @type {Object} the item information
       * @param element the parent element
       */
      function drawDetailedInformation(data, element) {

        var listItem = element.append('div').attr('class', 'item-info');
        if (data.title === null) {
          data.title = '<span style="color: red;">No value selected</span>';
        }
        listItem.data([data])
          .html(
            '       <div style="float:left;width: 10%;" class="pieChart__' + colorWheel(currentColor) + '">' +
            '          <i class="material-icons">brightness_1</i>' +
            '       </div>' +
            '       <div style="font-size: 0.9rem;float:left; width:75%;padding-left: 20px;color: #999;">' + data.title + ' (' + data.count + ')' +
            '       </div>' +
            '       <div style="clear:left;"></div>');
        currentColor++;

      }
    }
  }

  taggerComponents.component('pieVisualizationComponent', {
    bindings: {
      data: '<',
      label: '@'
    },
    template: '<svg id="{{$ctrl.label}}" style="overflow: visible;"> ' +
    '           <defs> ' +
    '             <filter id=\'pieChartInsetShadow\'> ' +
    '              <feOffset dx=\'0\' dy=\'0\'/> ' +
    '                 <feGaussianBlur stdDeviation=\'3\' result=\'offset-blur\' /> ' +
    '                 <feComposite operator=\'out\' in=\'SourceGraphic\' in2=\'offset-blur\' result=\'inverse\' /> ' +
    '                 <feFlood flood-color=\'black\' flood-opacity=\'1\' result=\'color\' />  ' +
    '                 <feComposite operator=\'in\' in=\'color\' in2=\'inverse\' result=\'shadow\' /> ' +
    '                 <feComposite operator=\'over\' in=\'shadow\' in2=\'SourceGraphic\' />  ' +
    '             </filter> ' +
    '             <filter id="pieChartDropShadow"> ' +
    '               <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" /> ' +
    '                 <feOffset in="blur" dx="0" dy="3" result="offsetBlur" /> ' +
    '                 <feMerge> <feMergeNode /> ' +
    '                 <feMergeNode in="SourceGraphic" /> </feMerge> ' +
    '             </filter> ' +
    '           </defs> ' +
    '         </svg>' +
    '         <div class="chart-data"></div>',
    controller: PieController

  });

})();
