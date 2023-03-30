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
    const { location, temperature, date, time } = request.body
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
