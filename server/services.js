import axios from "axios";

export async function getWeatherData(startDate, endDate, location) {
  const query = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${startDate}/${endDate}`;
  try {
    const result = await axios.get(query, {
      params: {
        include: "days",
        unitGroup: "metric",
        key: process.env.WEATHER_API_KEY,
      },
    });
    return result.data;
  } catch (err) {
    console.log(err);
    return {};
  }
}
