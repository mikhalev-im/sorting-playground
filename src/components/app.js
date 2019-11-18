import React, { useEffect } from "react";
import * as d3 from "d3";

import { Container, Paper, Typography } from "@material-ui/core";

/**
 * Example:
 * https://observablehq.com/@d3/sortable-bar-chart?collection=@observablehq/visualization
 * https://www.toptal.com/developers/sorting-algorithms
 *
 * Controls:
 * - algorithm
 * - speed
 * - number of bars
 * - generate data set
 * - reset (with current data set)
 * - start
 */

const useD3 = () => {
  let currentIndex = 0;
  const SAMPLE_DATA = [24, 17, 43, 6, 12];

  useEffect(() => {
    const svg = d3.select("svg");

    const width = parseInt(svg.style("width"), 10);
    const height = parseInt(svg.style("height"), 10);

    const yPadding = height * 0.2;

    const xScale = d3
      .scaleBand()
      .domain(SAMPLE_DATA)
      .range([0, width])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(SAMPLE_DATA)])
      .range([height - yPadding, yPadding / 2]);

    svg
      .selectAll("rect")
      .data(SAMPLE_DATA)
      .enter()
      .append("rect")
      .attr("y", yScale)
      .attr("class", "bar")
      .attr("x", xScale)
      .attr("width", xScale.bandwidth())
      .attr("height", num => height - yScale(num) - yPadding / 2)
      .attr('data-value', (val) => val);

    const deselect = () => {
      d3
        .select(`[data-active='true']`)
        .attr('data-active', false)
        .style('fill', '');
    }

    const selectBar = (value) => {
      // deselect prev
      deselect();

      d3
        .select(`[data-value='${value}']`)
        .transition()
        .duration(100)
        .attr('data-active', true)
        .style("fill", 'red');
    }

    const swap = (a, b) => {
      const prev = SAMPLE_DATA[b];
      SAMPLE_DATA[b] = SAMPLE_DATA[a];
      SAMPLE_DATA[a] = prev;

      xScale.domain(SAMPLE_DATA);

      svg
        .transition()
        .duration(750)
        .selectAll("rect")
        .attr("x", xScale);
    }

    const delay = async (time) => new Promise(resolve => setTimeout(resolve, time))

    const start = async () => {
      let currentPosition = 0;

      selectBar(SAMPLE_DATA[currentIndex]);
      currentIndex++;
      await delay(1000);

      selectBar(SAMPLE_DATA[currentIndex]);
      await delay(1000);

      swap(currentIndex, currentIndex - 1);
      await delay(1000);

      currentIndex++;
      selectBar(SAMPLE_DATA[currentIndex]);
      await delay(1000);

      currentIndex++;
      selectBar(SAMPLE_DATA[currentIndex]);
      await delay(1000);

      swap(currentIndex, currentIndex - 1);
      currentPosition = currentIndex - 1;
      await delay(1000);

      swap(currentPosition, currentPosition - 1);
      currentPosition--;
      await delay(1000);

      swap(currentPosition, currentPosition - 1);
      currentPosition--;
      await delay(1000);

      currentIndex++;
      selectBar(SAMPLE_DATA[currentIndex]);
      await delay(1000);

      swap(currentIndex, currentIndex - 1);
      currentPosition = currentIndex - 1;
      await delay(1000);

      swap(currentPosition, currentPosition - 1);
      currentPosition--;
      await delay(1000);

      swap(currentPosition, currentPosition - 1);
      currentPosition--;
      await delay(1000);

      deselect();
    }

    start();
  });
};

function App() {
  useD3();

  return (
    <Container className="container" maxWidth="md">
      <Typography align="center" variant="h2" gutterBottom>
        Sorting playground
      </Typography>
      <Paper elevation={5} square={true} className="paper">
        <div className="controls"></div>
        <div className="scene">
          <svg className="svg"></svg>
        </div>
      </Paper>
    </Container>
  );
}

export default App;
