console.log("JS is loaded");
let jsondata;



d3.json("/data").then(response => {
    jsondata = response;
    let airports = [];
    jsondata.map(row => {
        if (!airports.includes(row.Airport)) {
            airports.push(row.Airport);
        }
    });
    console.log(jsondata);
    init(airports)
});

function init(airports) {
    const selector = d3.select("#airports");
    airports.map(airport => {
        selector
            .append("option")
            .text(airport);
    });
    barchart(airports[0])
};

function onchange(event) {
    console.log(event.target.value)
    barchart(event.target.value);
}

function barchart(airport) {
    const current_data = jsondata.filter(row => row.Airport===airport);
    console.log(current_data);
    const x_value = current_data.map(row=> row.month);
    const values = {
        Cold: current_data.map(row=> row.Cold),
        Fog: current_data.map(row=> row.Fog),
        Hail: current_data.map(row=> row.Hail),
        Precipitation: current_data.map(row=> row.Precipitation),
        Rain: current_data.map(row=> row.Rain),
        Snow: current_data.map(row=> row.Snow),
        Storm: current_data.map(row=> row.Storm),
        // x_value : current_data.map(row=> row.month),
    }
    // var trace1 = {
    //     x: ['giraffes', 'orangutans', 'monkeys'],
    //     y: [20, 14, 23],
    //     name: 'SF Zoo',
    //     type: 'bar'
    // };

    var data = Object.entries(values).map(([key,value],i)=>{
        return{
            x: x_value,
            y: value,
            name: key,
            type: "bar"
        }
    })

    var layout = { barmode: 'stack' };

    Plotly.newPlot('bar', data, layout);
}
// d3.select("#airports").on("change", onchange);
$("#airports").on("change", onchange);