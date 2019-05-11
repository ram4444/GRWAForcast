
import React from "react";
import PropTypes from "prop-types";

import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

import { ChartCanvas, Chart } from "react-stockcharts";
import {
	BarSeries,
	AreaSeries,
	CandlestickSeries,
	LineSeries,
} from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
	CrossHairCursor,
	EdgeIndicator,
	CurrentCoordinate,
	MouseCoordinateX,
	MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";

import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import {
	OHLCTooltip,
	MovingAverageTooltip,
} from "react-stockcharts/lib/tooltip";
import { ema, sma } from "react-stockcharts/lib/indicator";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";

class CandleStickChartWithEdge extends React.Component {
	render() {

		const { type, data: initialData, width, ratio } = this.props;

		const calculatedData = initialData;
		const xScaleProvider = discontinuousTimeScaleProvider
			.inputDateAccessor(d => d.date);
		const {
			data,
			xScale,
			xAccessor,
			displayXAccessor,
		} = xScaleProvider(calculatedData);

		const start = xAccessor(last(data));
		const end = xAccessor(data[Math.max(0, data.length - 150)]);
		const xExtents = [start, end];

		return (
			<ChartCanvas height={400}
				ratio={ratio}
				width={width}
				type={type}
				seriesName="MSFT"
				data={data}
				xScale={xScale}
				xAccessor={xAccessor}
				displayXAccessor={displayXAccessor}
				xExtents={xExtents}
			>
				<Chart id={2}
					yExtents={[d => d.volume]}
					height={100} origin={(w, h) => [0, h - 100]}
				>
					<YAxis axisAt="left" orient="left" ticks={5} tickFormat={format(".2s")}/>
					<BarSeries yAccessor={d => d.volume} fill={d => d.close > d.open ? "#6BA583" : "#FF0000"} />
					<CurrentCoordinate yAccessor={d => d.volume} fill="#9B0A47" />
				</Chart>
				<Chart id={1}
					yPan yExtents={[d => [d.high, d.low]]}
					padding={{ top: 10, bottom: 20 }}
				>

					<XAxis axisAt="bottom" orient="bottom" />
					<XAxis axisAt="top" orient="top" flexTicks />
					<YAxis axisAt="right" orient="right" ticks={5} />

					<CandlestickSeries />

					//Predict
					<LineSeries yAccessor={d => d.pdopen} highlightOnHover stroke="#0000ef"/>
					<LineSeries yAccessor={d => d.pdclose} highlightOnHover stroke="#0000ef"/>
					<LineSeries yAccessor={d => d.pdhigh} highlightOnHover stroke="#710072"/>
					<LineSeries yAccessor={d => d.pdlow} highlightOnHover stroke="#710072"/>

					<CurrentCoordinate yAccessor={d => d.pdopen} />
					<CurrentCoordinate yAccessor={d => d.pdclose} />
					<CurrentCoordinate yAccessor={d => d.pdhigh} />
					<CurrentCoordinate yAccessor={d => d.pdlow} />


					<EdgeIndicator itemType="last" orient="right" edgeAt="right"
						yAccessor={d => d.close} fill={d => d.close > d.open ? "#6BA583" : "#FF0000"}/>
					<EdgeIndicator itemType="last" orient="right" edgeAt="right" yAccessor={d => d.pdopen } />
					<EdgeIndicator itemType="last" orient="right" edgeAt="right" yAccessor={d => d.pdclose} />
					<EdgeIndicator itemType="last" orient="right" edgeAt="right" yAccessor={d => d.pdhigh} />
					<EdgeIndicator itemType="last" orient="right" edgeAt="right" yAccessor={d => d.pdlow} />




					<MouseCoordinateX
						at="top"
						orient="top"
						displayFormat={timeFormat("%Y-%m-%d")} />
					<MouseCoordinateX
						at="bottom"
						orient="bottom"
						displayFormat={timeFormat("%Y-%m-%d")} />
					<MouseCoordinateY
						at="right"
						orient="right"
						displayFormat={format(".2f")} />
					<MouseCoordinateY
						at="left"
						orient="left"
						displayFormat={format(".2f")} />

					<OHLCTooltip origin={[-40, -65]}/>
				</Chart>
				<CrossHairCursor />
			</ChartCanvas>
		);
	}
}

/*


*/

CandleStickChartWithEdge.propTypes = {
	data: PropTypes.array.isRequired,
	width: PropTypes.number.isRequired,
	ratio: PropTypes.number.isRequired,
	type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

CandleStickChartWithEdge.defaultProps = {
	type: "svg",
};
CandleStickChartWithEdge = fitWidth(CandleStickChartWithEdge);

export default CandleStickChartWithEdge;
