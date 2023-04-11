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


    console.log("request body...", request.body);
    const lat = request.body.data.lat;
    const lng = request.body.data.lng;
    const humidity = request.body.data.humidity;
    const temperature = request.body.data.temp;
    const light = request.body.data.light;
    const vibration = request.body.data.vibration;
    const date = request.body.data.date;
    const shock = request.body.data.shock;
    try {
        pool.query('INSERT INTO iot_data (lat,lng,humidity,temperature,light, vibration, date,shock) VALUES ($1, $2, $3,$4,$5,$6,$7,$8) RETURNING *', [lat, lng, humidity, temperature, light, vibration, date, shock]).then((results) => {
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
