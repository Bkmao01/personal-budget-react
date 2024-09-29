import React from 'react';
import '../App.scss';
import axios from 'axios';
import * as d3 from 'd3';

function D3() {
    const data = {
        labels: [
          'Red',
          'Blue',
          'Yellow'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [300, 50, 100],
          backgroundColor: [
            'rgb(255, 99, 131)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]
      };
      
      var width = 960,
          height = 450,
          radius = Math.min(width, height) / 2;
      
      var color = d3.scaleOrdinal(d3.schemeCategory10);
      
      var svg = d3.select('#d3Chart')
          .append("svg")
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
      
      var pie = d3.pie()
          .sort(null)
          .value(function (d) {
              return d.budget;
          });
      
      var arc = d3.arc()
          .outerRadius(radius * 0.8)
          .innerRadius(radius * 0.4);
      
      var outerArc = svg.selectAll("arc")
          .data(pie(data))
          .enter()
          .append("g")
          .attr("class", "arc");
      
          outerArc.append("path")
          .attr("d", arc)
          .attr("fill", function (d) { return color(d.data.title); });
      
          outerArc.append("text")
          .attr("transform", function (d) {
              var pos = arc.centroid(d);
              return "translate(" + pos + ")";
          })
          .attr("dy", ".35em")
          .style("text-anchor", "middle")
          .text(function (d) {
              return d.data.title + ": " + d.data.budget;
          });
      
      
      var key = function (d) { return d.data.label; };
      
      var color = d3.scaleOrdinal()
      .domain(["Lorem ipsum", "dolor sit", "amet", "consectetur", "adipisicing", "elit", "sed", "do", "eiusmod", "tempor", "incididunt"])
      .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
      
      
      function randomData() {
      
      var labels = color.domain();
      return labels.map(function (label) {
          return { label: label, value: Math.random() }
      });
      }
      
      
      d3.select(".randomize")
      .on("click", function () {
          change(randomData());
      });
      
      
      function change(data) {
      
      /* ------- PIE SLICES -------*/
      var slice = svg.select(".slices").selectAll("path.slice")
          .data(pie(data), key);
      
      slice.enter()
          .insert("path")
          .style("fill", function (d) { return color(d.data.label); })
          .attr("class", "slice");
      
      slice
          .transition().duration(1000)
          .attrTween("d", function (d) {
              this._current = this._current || d;
              var interpolate = d3.interpolate(this._current, d);
              this._current = interpolate(0);
              return function (t) {
                  return arc(interpolate(t));
              };
          })
      
      slice.exit()
          .remove();
      
      /* ------- TEXT LABELS -------*/
      
      var text = svg.select(".labels").selectAll("text")
          .data(pie(data), key);
      
      text.enter()
          .append("text")
          .attr("dy", ".35em")
          .text(function (d) {
              return d.data.label;
          });
      
      function midAngle(d) {
          return d.startAngle + (d.endAngle - d.startAngle) / 2;
      }
      
      text.transition().duration(1000)
          .attrTween("transform", function (d) {
              this._current = this._current || d;
              var interpolate = d3.interpolate(this._current, d);
              this._current = interpolate(0);
              return function (t) {
                  var d2 = interpolate(t);
                  var pos = outerArc.centroid(d2);
                  pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
                  return "translate(" + pos + ")";
              };
          })
          .styleTween("text-anchor", function (d) {
              this._current = this._current || d;
              var interpolate = d3.interpolate(this._current, d);
              this._current = interpolate(0);
              return function (t) {
                  var d2 = interpolate(t);
                  return midAngle(d2) < Math.PI ? "start" : "end";
              };
          });
      
      text.exit()
          .remove();
      
      /* ------- SLICE TO TEXT POLYLINES -------*/
      
      var polyline = svg.select(".lines").selectAll("polyline")
          .data(pie(data), key);
      
      polyline.enter()
          .append("polyline");
      
      polyline.transition().duration(1000)
          .attrTween("points", function (d) {
              this._current = this._current || d;
              var interpolate = d3.interpolate(this._current, d);
              this._current = interpolate(0);
              return function (t) {
                  var d2 = interpolate(t);
                  var pos = outerArc.centroid(d2);
                  pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
                  return [arc.centroid(d2), outerArc.centroid(d2), pos];
              };
          });
      
      polyline.exit()
          .remove();
      };
}

export default D3;