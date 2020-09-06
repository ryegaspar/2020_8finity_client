<template>
	<div class="bg-gray-900 border border-gray-800 rounded shadow">
		<div class="border-b border-gray-800 p-3">
			<h5 class="font-bold uppercase text-gray-600">Graph</h5>
		</div>
		<div class="p-5">
			<bar-chart :data="barChartData" :options="barChartOptions" :height="200"/>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			barChartData: {
				labels: [
					'2019-06',
					'2019-07',
					'2019-08',
					'2019-09',
					'2019-10',
					'2019-11',
					'2019-12',
					'2020-01',
					'2020-02',
					'2020-03',
					'2020-04',
					'2020-05'
				],
				datasets: [
					{
						label: 'Visits',
						data: [10, 15, 20, 30, 40, 50, 60, 70, 34, 45, 11, 78, 45],
						backgroundColor: '#2f4b7c'
					},
					{
						label: 'Pages Views',
						data: [30, 24, 57, 23, 68, 72, 25, 64, 133, 143, 165, 33, 56],
						backgroundColor: '#665191'
					},
				]
			},
			barChartOptions: {
				responsive: true,
				legend: {
					display: false
				},
				title: {
					display: true,
					text: 'Transactions',
					fontSize: 24,
					fontColor: '#6b7280'
				},
				tooltips: {
					backgroundColor: '#17BF62'
				},
				scales: {
					xAxes: [
						{
							gridLines: {
								display: false
							}
						}
					],
					yAxes: [
						{
							ticks: {
								beginAtZero: true
							},
							gridLines: {
								display: false
							}
						}
					]
				}
			}
		}
	}
}
</script>
