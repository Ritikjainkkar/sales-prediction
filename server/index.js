import express from "express";
import pg from "pg";
import { getWeatherData } from "./services.js";
import dotenv from "dotenv";
import cors from "cors";
import { getChartLabels, getChartData, getIsOpenStore } from "./util.js";

var app = express();
app.use(cors());
dotenv.config();
const { Client } = pg;

const connectDbAndGetData = async (query) => {
  try {
    const client = new Client({
      host: process.env.RDS_HOSTNAME,
      user: process.env.RDS_USERNAME,
      password: process.env.RDS_PASSWORD,
      database: process.env.RDS_DATABASE,
      port: process.env.RDS_PORT,
    });
    await client.connect();
    const res = await client.query(query);
    await client.end();
    return res;
  } catch (error) {
    console.log(error);
  }
};

app.get("/get", async function (req, res, _) {
  const { startDate, endDate, location } = req.query;
  const query = `SELECT date, location, forecasted_sales_quantity FROM oneglass.forecasts WHERE date BETWEEN '${startDate}' and '${endDate}' and location = '${location}'`;
  try {
    const weatherData = await getWeatherData(startDate, endDate, location);
    const result = await connectDbAndGetData(query);
    const chartData = getChartData(result);
    const finalDecision = getIsOpenStore(weatherData, chartData);
    const response = {
      labels: getChartLabels(result),
      chartData,
      isOpen: finalDecision.isOpen,
      avgTemp: finalDecision.avgTemp,
    };
    res.status(200).send(response);
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
});

app.listen(8000, function () {
  console.log("server is listening on port 8000!");
});
