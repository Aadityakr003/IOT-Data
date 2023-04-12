CREATE DATABASE temperature;

CREATE TABLE iot_data ( id SERIAL PRIMARY KEY, location VARCHAR(255) NOT NULL, humidity VARCHAR(255) NOT NULL, temperature VARCHAR(255) NOT NULL, date VARCHAR(255) NOT NULL);  
-- CREATE TABLE iot_data ( id SERIAL PRIMARY KEY, lat VARCHAR(255) NOT NULL, lng VARCHAR(255) NOT NULL, humidity VARCHAR(255) NOT NULL, temperature VARCHAR(255) NOT NULL, light VARCHAR(255) NOT NULL, vibration VARCHAR(255) NOT NULL, date VARCHAR(255) NOT NULL, shock json NOT NULL);

ALTER TABLE iot_data
ADD shock varchar(255);