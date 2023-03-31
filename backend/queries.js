const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    password: '123456789',
    database: 'temperature',
    host: 'localhost',
    port: 5432
});
pool.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

const getAllTemp = (request, response) => {
    pool.query('SELECT * FROM iot_data', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
        console.log(results);
    })
}



const uploadTemp = (request, response) => {
    console.log("screening only here");
    console.log("request.body : ",request.body);
    let temp = request.body;
    let jsons = JSON.stringify(temp);

    // console.log("the json : " ,jsons.Temprature);
    // let temps = [jsons[2],jsons[3],jsons[4],jsons[5],jsons[6]];
    // console.log("the values : ",temps.join());
    const location = "Indore, MP";
    const date = "31/03/2023";
    const time = "5:12 PM";
    try {
        pool.query('INSERT INTO iot_data (location,temperature, date, time ) VALUES ($1, $2, $3,$4) RETURNING *', [location, temperature, date, time]).then((results) => {
            response.status(200).send(results.rows[0])
            console.log(results.rows[0]);
        })
    } catch (error) {
        console.log(error);
    }
}




module.exports = {
    getAllTemp,
    uploadTemp

}
