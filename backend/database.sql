CREATE DATABASE temperature;

CREATE TABLE iot_data ( id SERIAL PRIMARY KEY, location VARCHAR(255) NOT NULL, humidity VARCHAR(255) NOT NULL, temperature VARCHAR(255) NOT NULL, date VARCHAR(255) NOT NULL);  


ALTER TABLE iot_data
ADD shock varchar(255);