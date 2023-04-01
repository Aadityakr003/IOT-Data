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

    // let temp = request.body;
    // console.log("this value of body : ", temp.data.temp);
    // let temperature = temp.data.temp;
    // let humidity;
    // const now = new Date();
    // const location = "Indore, MP";
    // const date = now.toLocaleDateString();
    // const [location, humidity, temperature, date] = request.body;
    console.log("request body...", request.body);
    const location = request.body.location;
    const humidity = request.body.humidity;
    const temperature = request.body.temperature;
    const date = request.body.date;
    try {
        pool.query('INSERT INTO iot_data (location,humidity,temperature, date) VALUES ($1, $2, $3,$4) RETURNING *', [location, humidity, temperature, date]).then((results) => {
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
