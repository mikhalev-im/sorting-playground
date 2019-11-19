import React, { useEffect } from "react";
import { Container, Paper, Typography } from "@material-ui/core";

import { InsertionSort } from "../algorithms/insertion";

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
  const SAMPLE_DATA = [24, 17, 43, 6, 12];

  useEffect(() => {
    const delay = async (time) => new Promise(resolve => setTimeout(resolve, time))

    const start = async () => {
      const sorting = new InsertionSort(SAMPLE_DATA);
      sorting.init();

      let generator = sorting.nextStep();
      while (!generator.next().done) {
        await delay(1000);
      }
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
