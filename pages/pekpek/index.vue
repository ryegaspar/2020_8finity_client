<template>
	<div>
		<!--Container-->
		<div class="container w-full mx-auto pt-20 lg:pt-24">
			<div class="w-full px-4 md:px-0 lg:mt-12 mb-16 text-gray-400 leading-normal">
				<date-range-select/>
				<!--Console Content-->
				<hr class="border-b-2 border-gray-600 my-8 mx-4">

				<stats-summary/>

				<!--Divider-->
				<hr class="border-b-2 border-gray-600 my-8 mx-4">

				<div class="flex-flex-row flex-wrap flex-grow mt-2">
					<div class="w-full p-3">
						<graph-transactions />
					</div>
				</div>

				<div class="flex flex-row flex-wrap flex-grow mt-2">
					<div class="w-full md:w-1/2 p-3">
						<graph-monthly-revenue />
					</div>

					<div class="w-full md:w-1/2 p-3">
						<!--Graph Card-->
						<div class="bg-gray-900 border border-gray-800 rounded shadow">
							<div class="border-b border-gray-800 p-3">
								<h5 class="font-bold uppercase text-gray-600">Line Chart Sample</h5>
							</div>
							<div class="p-5">
								<canvas id="chartjs-0" class="chartjs" width="undefined" height="undefined"></canvas>
								<script>
									new Chart(document.getElementById("chartjs-0"), {
										"type": "line",
										"data": {
											"labels": ["January", "February", "March", "April", "May", "June", "July"],
											"datasets": [{
												"label": "Views",
												"data": [65, 59, 80, 81, 56, 55, 40],
												"fill": false,
												"borderColor": "rgb(75, 192, 192)",
												"lineTension": 0.1
											}]
										},
										"options": {}
									});
								</script>
							</div>
						</div>
						<!--/Graph Card-->
					</div>

					<div class="w-full md:w-1/2 xl:w-1/3 p-3">
						<!--Graph Card-->
						<div class="bg-gray-900 border border-gray-800 rounded shadow">
							<div class="border-b border-gray-800 p-3">
								<h5 class="font-bold uppercase text-gray-600">Graph</h5>
							</div>
							<div class="p-5">
								<canvas id="chartjs-1" class="chartjs" width="undefined" height="undefined"></canvas>
								<script>
									new Chart(document.getElementById("chartjs-1"), {
										"type": "bar",
										"data": {
											"labels": ["January", "February", "March", "April", "May", "June", "July"],
											"datasets": [{
												"label": "Likes",
												"data": [65, 59, 80, 81, 56, 55, 40],
												"fill": false,
												"backgroundColor": ["rgba(255, 99, 132, 0.2)", "rgba(255, 159, 64, 0.2)", "rgba(255, 205, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(153, 102, 255, 0.2)", "rgba(201, 203, 207, 0.2)"],
												"borderColor": ["rgb(255, 99, 132)", "rgb(255, 159, 64)", "rgb(255, 205, 86)", "rgb(75, 192, 192)", "rgb(54, 162, 235)", "rgb(153, 102, 255)", "rgb(201, 203, 207)"],
												"borderWidth": 1
											}]
										},
										"options": {
											"scales": {
												"yAxes": [{
													"ticks": {
														"beginAtZero": true
													}
												}]
											}
										}
									});
								</script>
							</div>
						</div>
						<!--/Graph Card-->
					</div>

					<div class="w-full md:w-1/2 xl:w-1/3 p-3">
						<!--Graph Card-->
						<div class="bg-gray-900 border border-gray-800 rounded shadow">
							<div class="border-b border-gray-800 p-3">
								<h5 class="font-bold uppercase text-gray-600">Graph</h5>
							</div>
							<div class="p-5">
								<canvas id="chartjs-4" class="chartjs" width="undefined" height="undefined"></canvas>
								<script>
									new Chart(document.getElementById("chartjs-4"), {
										"type": "doughnut",
										"data": {
											"labels": ["P1", "P2", "P3"],
											"datasets": [{
												"label": "Issues",
												"data": [300, 50, 100],
												"backgroundColor": ["rgb(255, 99, 132)", "rgb(54, 162, 235)", "rgb(255, 205, 86)"]
											}]
										}
									});
								</script>
							</div>
						</div>
						<!--/Graph Card-->
					</div>

					<div class="w-full md:w-1/2 xl:w-1/3 p-3">
						<!--Template Card-->
						<div class="bg-gray-900 border border-gray-800 rounded shadow">
							<div class="border-b border-gray-800 p-3">
								<h5 class="font-bold uppercase text-gray-600">Template</h5>
							</div>
							<div class="p-5">

							</div>
						</div>
						<!--/Template Card-->
					</div>

					<div class="w-full p-3">
						<!--Table Card-->
						<div class="bg-gray-900 border border-gray-800 rounded shadow">
							<div class="border-b border-gray-800 p-3">
								<h5 class="font-bold uppercase text-gray-600">Table</h5>
							</div>
							<div class="p-5">
								<table class="w-full p-5 text-gray-700">
									<thead>
									<tr>
										<th class="text-left text-gray-600">Name</th>
										<th class="text-left text-gray-600">Side</th>
										<th class="text-left text-gray-600">Role</th>
									</tr>
									</thead>

									<tbody>
									<tr>
										<td>Obi Wan Kenobi</td>
										<td>Light</td>
										<td>Jedi</td>
									</tr>
									<tr>
										<td>Greedo</td>
										<td>South</td>
										<td>Scumbag</td>
									</tr>
									<tr>
										<td>Darth Vader</td>
										<td>Dark</td>
										<td>Sith</td>
									</tr>
									</tbody>
								</table>

								<p class="py-2"><a href="#" class="text-white">See More issues...</a></p>

							</div>
						</div>
						<!--/table Card-->
					</div>
				</div>
				<!--/ Console Content-->
			</div>
		</div>
		<!--/container-->

		<footer class="bg-gray-900 border-t border-gray-400 shadow">
			<div class="container max-w-md mx-auto flex py-4">

				<div class="w-full mx-auto">
					<h3 class="text-gray-100 text-center text-sm">&#169; 2020 8finity</h3>
				</div>
			</div>
		</footer>
	</div>
</template>

<script>
export default {
	middleware: 'admin',
	layout: 'admin',
}
</script>
