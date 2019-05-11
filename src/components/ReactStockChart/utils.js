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
		d.pdopen = +d.pdopen;
		d.pdclose = +d.pdclose;
		d.pdhigh = +d.pdhigh;
		d.pdlow = +d.pdlow;
		d.pdopendisper = +d.pdopendisper;
		d.pdcloseisper = +d.pdcloseisper;
		d.pdhighisper = +d.pdhighisper;
		d.pdlowisper = +d.pdlowisper;
		return d;
	};
}

const parseDate = timeParse("%Y-%m-%d");

const jsonSent = {
    "query": "query{query_stockFullCandleChart{chart{name,valueList{date,open,close,high,low,volume,pdopen,pdclose,pdhigh,pdlow,pdopendisper,pdcloseisper,pdhighisper,pdlowisper}}}}",
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
				tsvFormat(response.data.data.query_stockFullCandleChart.chart[0].valueList)
		)
		.then(data=>{
				return tsvParse(data, parseData(parseDate))
		})
	console.log("----------rtn:--------------")
	console.log(rtn)
	return rtn;
}
