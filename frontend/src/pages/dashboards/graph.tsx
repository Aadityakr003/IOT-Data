import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const BarChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const data = [10, 20, 30, 40, 50];
    const svg = d3.select(chartRef.current);
    const width = svg.attr('width');
    const height = svg.attr('height');
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    const xScale = d3.scaleBand()
      .domain(data.map((d, i) => i.toString()))
      .range([0, chartWidth])
      .padding(0.1);
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data)])
      .range([chartHeight, 0]);
    const chart = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    chart.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d, i) => xScale(i.toString()))
      .attr('y', (d) => yScale(d))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => chartHeight - yScale(d));
    chart.append('g')
      .attr('transform', `translate(0,${chartHeight})`)
      .call(d3.axisBottom(xScale));
    chart.append('g')
      .call(d3.axisLeft(yScale));
  }, []);

  return (
    <svg ref={chartRef} width="400" height="300"></svg>
  );
}

export default BarChart;
