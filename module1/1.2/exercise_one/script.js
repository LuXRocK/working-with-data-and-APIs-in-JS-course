window.addEventListener('load', chartIt())

        async function chartIt(){

            const ctx = document.getElementById('chart').getContext('2d');
            const data = await getData();
            const myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: data.years,
                    datasets: [{
                        label: 'Global Combined Land-Surface Air and Sea-Surface Water Temperature in C°',
                        data: data.global,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Northern Combined Land-Surface Air and Sea-Surface Water Temperature in C°',
                        data: data.northern,
                        backgroundColor: 'rgba(132, 99, 255, 0.2)',
                        borderColor: 'rgba(132, 99, 255, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Southern Combined Land-Surface Air and Sea-Surface Water Temperature in C°',
                        data: data.southern,
                        backgroundColor: 'rgba(99, 255, 132, 0.2)',
                        borderColor: 'rgba(99, 255, 132, 1)',
                        borderWidth: 1
                    },]
                },
                    options: {}
            });
        };

        async function getData(){

            const response = await fetch('ZonAnn.Ts+dSST.csv');
            const data =  await response.text();

            const years = [];
            const global = [];
            const northern = [];
            const southern = [];

            const table = data.split('\n').slice(1);

            table.forEach(row => {
                const column = row.split(',');

                years.push(column[0]);
                global.push(parseFloat(column[1]) + 14);
                northern.push(parseFloat(column[2]) + 14);
                southern.push(parseFloat(column[3]) + 14);
                // console.log(year, temp);
            });
            return { years, global, northern, southern };
            // console.log(rows);
        };