import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import { weather } from '@/types/chartTypes';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend
);

export default function Chart({
	weather,
	placeName,
}: {
	weather: weather;
	placeName: any;
}) {
	// jeśli wolimy mieć na więcej godzin zmieniamy zmienną
	const forecastHours = 24;
	const weatherHours = [];
	for (let i = 0; i < weather.hourly.time.length && i <= forecastHours; i++) {
		weatherHours.push(weather.hourly.time[i].split('T')[1]);
	}

	const data = {
		labels: weatherHours,
		datasets: [
			{
				fill: true,
				label: 'Temperatura',
				data: weatherHours.map(
					(elem: any, index: number) => weather.hourly.temperature_2m[index]
				),
				borderColor: 'rgb(53, 162, 235)',
				backgroundColor: 'rgba(53, 162, 235, 0.5)',
			},
		],
	};

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top' as const,
			},
			title: {
				display: true,
				text: `Pogoda - ${placeName}`,
			},
		},
	};

	return <Line options={options} data={data} />;
}
