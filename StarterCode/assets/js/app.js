// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 500;
var circles

// Define the chart's margins as an object
var margin = {
  top: 60,
  right: 60,
  bottom: 120,
  left: 150
};

// Define dimensions of the chart area
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// Select scatter, append SVG area to it, and set its dimensions
var svg = d3.select("#scatter")
  .append("svg")
  .classed("chart", true)
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// shift everything over by the margins
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Load data from data.csv
d3.csv("/assets/data/data.csv").then(function(data){

    // gets the min and max of the parameter
    xMinMax = d3.extent(data,function(d){
        return parseFloat(d.poverty)
    });

    yMinMax = d3.extent(data,function(d){
        return parseFloat(d.healthcare)
    });

    // console.log(xMinMax);

    // sets the scale for both x/y axis
    xScale = d3.scaleLinear()
        .domain([xMinMax[0],xMinMax[1]])
        .range([margin.left-50,(chartWidth-100)]);

    yScale = d3.scaleLinear()
        .domain([yMinMax[1],yMinMax[0]])
        .range([margin.top,chartHeight+50]);

    circles=svg.selectAll('.stateCircle')
        .data(data)
        .enter()
        .append('circle')
        .attr('class','stateCircle')
        .attr('cx',function(d){
            return xScale(d.poverty)
        })
        .attr('cy',function(d){
            return yScale(d.healthcare)
        })
        .attr('r',10)
        .attr('fill','#000');
    
    xAxis = d3.axisBottom(xScale);
    yAxis = d3.axisLeft(yScale);

    xAxisG = svg.append('g')
        .attr('id','xAxis')
        .attr('class','axis');

    yAxisG = svg.append('g')
        .attr('id','yAxis')
        .attr('class','axis');

    xAxisG.call(xAxis)
        .attr('transform','translate(0,400)');
    
    yAxisG.call(yAxis)
        .attr('transform','translate(50,0)');
 
    
});

