import { Algorithm } from './base';

export class InsertionSort extends Algorithm {
  deselect() {
    const { d3 } = this;

    d3
      .select(`[data-active='true']`)
      .attr('data-active', false)
      .style('fill', '')
  }

  selectBarByValue(value) {
    const { d3, speed } = this;

    // deselect prev
    this.deselect();

    d3
      .select(`[data-value='${value}']`)
      .transition()
      .duration(speed)
      .attr('data-active', true)
      .style("fill", 'red');
  }

  swap(a, b) {
    const { data, speed, svg, xScale } = this;

    const prev = data[b];
    data[b] = data[a];
    data[a] = prev;

    xScale.domain(data);

    svg
      .transition()
      .duration(speed)
      .selectAll("rect")
      .attr("x", xScale);
  }

  * nextStep() {
    const { data } = this;

    if (data.length < 2) return;

    for (let i = 0; i < data.length; i++) {
      // select the element
      let currentIndex = i;
      yield this.selectBarByValue(data[currentIndex]);

      while (currentIndex > 0 && data[currentIndex] < data[currentIndex - 1]) {
        // swap values
        yield this.swap(currentIndex - 1, currentIndex);

        // current value moved to the left,
        // adjust the index
        currentIndex--;
      }
    }

    yield this.deselect();

    return true;
  }
}
