import { tsvParse, csvParse,tsvFormat } from  "d3-dsv";
import { timeParse } from "d3-time-format";
import axios from 'axios'

function parseData(parse) {
	return function(d) {
		d.date = parse(d.date);
		d.open = +d.open;
		d.high = +d.high;
		d.low = +d.low;
		d.close = +d.close;
		d.volume = +d.volume;

		return d;
	};
}

const parseDate = timeParse("%Y-%m-%d");

const jsonSent = {
    "query": "query{query_stockFullLineChart{chart{name,valueList{date,value}}},query_stockFullCandleChart{chart{name,valueList{date,open,close,high,low}}}}",
    "params": {
        "what": "env"
    },
    "operationName": ""
}

export function getData() {
	const promiseMSFT = fetch("https://cdn.rawgit.com/rrag/react-stockcharts/master/docs/data/MSFT.tsv")
		.then(response => {
			console.log("-----------response.text()--------")
			//console.log(response.text())
			return response.text()
		})
		.then(data => {
			console.log(tsvParse(data, parseData(parseDate)))
			return tsvParse(data, parseData(parseDate))
		})
	console.log("----------promiseMSFT:--------------")
	console.log(promiseMSFT)
	return promiseMSFT;
}

export function getDataGRWA() {
	const rtn = axios.post('http://127.0.0.1:8089/graphql', jsonSent)
		.then(response =>
				tsvFormat(response.data.data.query_stockFullCandleChart.chart[3].valueList)
		)
		.then(data=>{
				console.log(tsvParse(data, parseData(parseDate)))
				return tsvParse(data, parseData(parseDate))
		})
	console.log("----------rtn:--------------")
	console.log(rtn)
	return rtn;
}
