import React, { Component } from 'react';
import * as d3 from "d3";

/*
https://blog.logrocket.com/data-visualization-in-react-using-react-d3-c35835af16d0
https://medium.com/technical-credit/declarative-d3-examples-in-react-6e736e526182
Render a root element with React, use a ref function to grab the rendered node, and then put your D3 code in componentDidMount and componentDidUpdate.
https://stackoverflow.com/questions/35042621/setting-up-react-in-combination-with-nvd3
https://medium.com/turo-engineering/react-meets-d3-6a40881d0d73
https://frontendcharts.com/react-d3-integrate/
https://d3indepth.com/
*/

function getData() {
  let numItems = 20 + Math.floor(20 * Math.random())
  let data = []
  for(let i=0; i<numItems; i++) {
    data.push({
      x: Math.random(),
      y: Math.random(),
      r: Math.random(),
      colour: i % 5
    })
  }
  return data
}

let colours = ['#2176ae', '#57b8ff', '#b66d0d', '#fbb13c', '#fe6847']

class D3graph extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: getData()
    }

    this.handleClick = this.handleClick.bind(this)
    this.updateStyleAndAttrs = this.updateChart.bind(this)
  }

  handleClick() {
    this.setState({
      data: getData()
    })
  }

  componentDidMount() {
    this.updateChart()
  }

  componentDidUpdate() {
    this.updateChart()
  }

  updateChart() {
    let maxRadius = 40
    let xScale = d3.scaleLinear().domain([0, 1]).range([0, this.props.width])
    let yScale = d3.scaleLinear().domain([0, 1]).range([0, this.props.height])
    let rScale = d3.scaleLinear().domain([0, 1]).range([0, maxRadius])

    let u = d3.select(this.svgEl)
      .selectAll('circle')
      .data(this.state.data)

    u.enter()
      .append('circle')
      .attr('cx', 0.5 * this.props.width)
      .attr('cy', 0.5 * this.props.height)
      .style('fill', '#fff')
      .merge(u)
      .transition()
      .duration(1000)
      .attr('cx', d => xScale(d.x))
      .attr('cy', d => yScale(d.y))
      .attr('r', d => rScale(d.r))
      .style('fill', d => colours[d.colour])

    u.exit().remove()
  }


  render() {
    return (
      <div>
        <svg width={this.props.width} height={this.props.height} ref={el => this.svgEl = el}></svg>
        <div><button onClick={this.handleClick}>Update</button></div>
      </div>
    );
  }

}

export default D3graph;
