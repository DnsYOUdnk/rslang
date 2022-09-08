import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ChartProps } from './Chart.props';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: '',
    },
  },
};

export const Chart = ({ statistic }: ChartProps) => {
  const labels = Object.keys(statistic);
  const dataValue = Object.values(statistic).map((item) => item.learnedWords);
  const data = {
    labels,
    datasets: [
      {
        label: 'Количество изученных слов',
        data: [...dataValue, Math.max(...dataValue) + 5],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  return <Line options={options} data={data} />;
};
