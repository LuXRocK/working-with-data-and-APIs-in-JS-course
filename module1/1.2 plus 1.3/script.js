
        chartIt();

        async function chartIt(){

            const data = await getData();

            const ctx = document.getElementById('chart').getContext('2d');
            const myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: data.xs,
                    datasets: [{
                        label: 'Combined Land-Surface Air and Sea-Surface Water Temperature in C°',
                        fill: false, 
                        data: data.ys,
                        backgroundColor: ['rgba(255, 99, 132, 0.2)'],
                        borderColor: ['rgba(255, 99, 132, 1)'],
                        borderWidth: 1
                    }]
                },
                    options: {
                        scales: {
                            y: {
                                ticks: {
                                    callback: function(value, index, ticks) {
                                        return value + '°';
                                    }
                                }
                            }
                        }
                    }
            });
        };

        async function getData(){

            const xs = [];
            const ys = [];

            const response = await fetch('ZonAnn.Ts+dSST.csv');
            const data =  await response.text();

            const table = data.split('\n').slice(1);
            table.forEach(row => {
                const column = row.split(',');
                const year =  column[0];
                xs.push(year);
                const temp = column[1];
                ys.push(parseFloat(temp) + 14);
                console.log(year, temp);
            });
            return { xs, ys };
            // console.log(rows);
        };
