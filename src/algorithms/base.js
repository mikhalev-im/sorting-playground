import * as d3 from "d3";

export class Algorithm {
  constructor(data, speed = 500) {
    this.data = data;
    this.d3 = d3;
    this.svg = this.d3.select("svg");
    this.speed = speed;

    this.width = parseInt(this.svg.style("width"), 10);
    this.height = parseInt(this.svg.style("height"), 10);
  }

  init() {
    const { svg, data, width, height } = this;

    const yPadding = height * 0.2;

    this.xScale = d3
      .scaleBand()
      .domain(data)
      .range([0, width])
      .padding(0.1);

    this.yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data)])
      .range([height - yPadding, yPadding / 2]);

    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("y", this.yScale)
      .attr("class", "bar")
      .attr("x", this.xScale)
      .attr("width", this.xScale.bandwidth())
      .attr("height", num => height - this.yScale(num) - yPadding / 2)
      .attr('data-value', (val) => val);
  }

  setData(data) {
    this.data = data;
    this.init();
  }

  nextStep() {}
}