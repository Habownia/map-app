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
	orange: '#f6b717',
	lightOrange: '#f7ce6779',
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
					return value + ' °C';
				},

				color: 'black',
				backgroundColor: '#f9f9f9',
				borderColor: colors.orange,
				borderRadius: 12,
				borderWidth: 2,
				padding: 5,
				font: {
					size: 17,
					// weight: 'bold' as const,
				},
			},
			tooltip: {
				caretSize: 0,
				caretPadding: 30,
				// position: 'average',
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
					text: 'Dane',
				},
				stacked: true,
				ticks: {
					callback: (value: any) => {
						return value + '°C';
					},
				},
			},
		},
	};

	return <Chart type='bar' options={options} data={data} />;
	// return <Line options={options} data={data} />;
}
