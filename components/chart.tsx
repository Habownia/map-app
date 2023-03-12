import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	BarElement,
	Legend,
	LineController,
	BarController,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { weather } from '@/types/chartTypes';
import { useEffect, useState } from 'react';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	BarElement,
	Legend,
	LineController,
	BarController,
	ChartDataLabels
);

const colors = {
	darkOrange: '#ffb700',
	orange: '#ffac59',
	lightOrange: '#f1e18998',
	darkBlue: '#01C5C4',
	blue: '#75CFB8',
	lightBlue: '#75cfb9',
};

export default function WeatherChart({
	weather,
	placeName,
}: {
	weather: weather;
	placeName: any;
}) {
	const [currentTime, setCurrentTime] = useState<number>(0);
	useEffect(() => {
		setCurrentTime(new Date().getHours() as number);
	}, []);

	// jeśli wolimy mieć na więcej godzin zmieniamy zmienną
	const forecastHours = 24 + currentTime;
	const weatherHours = [];

	// console.log(weather);

	for (
		let i = currentTime;
		i < weather.hourly.time.length && i <= forecastHours;
		i++
	) {
		weatherHours.push(weather.hourly.time[i].split('T')[1]);
	}

	const data = {
		labels: weatherHours,
		datasets: [
			{
				type: 'line' as const,
				fill: true,
				label: 'Temperatura',
				data: weatherHours.map(
					(elem: any, index: number) =>
						weather.hourly.temperature_2m[index + currentTime]
				),
				tension: 0.5,
				borderColor: colors.darkOrange,
				backgroundColor: colors.lightOrange,
			},
			{
				type: 'bar' as const,
				yAxisID: 'y1',
				// fill: true,
				label: 'Wilgotność',
				data: weatherHours.map(
					(elem: any, index: number) =>
						weather.hourly.relativehumidity_2m[index + currentTime]
				),
				tension: 0.5,
				borderColor: colors.darkBlue,
				backgroundColor: colors.lightBlue,
			},
		],
	};

	const options = {
		responsive: true,
		interaction: {
			mode: 'index' as const,
			intersect: false,
		},
		plugins: {
			legend: {
				position: 'top' as const,
			},
			title: {
				display: true,
				text: `Pogoda - ${placeName}`,
				font: {
					size: 20,
				},
			},
			datalabels: {
				anchor: 'end' as const,
				align: 'center' as const,
				formatter: (value: any, context: any) => {
					return value + (context.dataset.label == 'Wilgotność' ? ' %' : '°C');
				},

				color: 'black',
				backgroundColor: '#f9f9f9',
				borderColor: (context: any) => context.dataset.borderColor,
				borderRadius: 12,
				borderWidth: 2,
				padding: 6,
				// width: 55,
				font: {
					size: 14,
					// weight: 'bold' as const,
				},
				offset: 4,
				clip: true,
			},
			tooltip: {
				caretSize: 0,
				caretPadding: -60,
				position: 'average' as const,
				callbacks: {
					label: function (context: any) {
						const label = context.dataset.label;
						let value = `${label}: ${context.formattedValue}`;

						if (label == 'Wilgotność') {
							value += '%';
						} else if (label == 'Temperatura') {
							value += '°C';
						}

						return value;
					},
				},
			},
		},
		elements: {
			// wyłączenie powiększania się kropki
			point: {
				radius: 0,
				pointHoverRadius: 0,
			},
		},
		scales: {
			x: {
				position: 'top' as const,
				title: {
					display: true,
					text: 'Godziny',
				},
				stacked: true,
			},
			y: {
				title: {
					display: true,
					text: 'Temperatura',
				},
				stacked: true,
				ticks: {
					stepSize: 2,
					callback: (value: any) => {
						return value + '°C';
					},
				},
			},
			y1: {
				position: 'right' as const,
				title: {
					display: true,
					text: 'Wilgotność',
				},
				stacked: true,
				ticks: {
					stepSize: 20,
					callback: (value: any) => {
						return value + '%';
					},
				},
			},
		},
	};

	return <Chart type='bar' options={options} data={data} />;
	// return <Line options={options} data={data} />;
}
