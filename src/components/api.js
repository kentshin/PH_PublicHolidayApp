import GOOGLE_APIKEY from "./constant";

export const getHolidayData = async () => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/en.philippines%23holiday%40group.v.calendar.google.com/events?key=${GOOGLE_APIKEY}`
    );
    if (!response.ok) {
      throw new Error("Cannot get account data");
    }
    const data = await response.json();
    console.log(`data>>` + JSON.stringify(data));
    return await data;
  } catch (err) {
    console.log(`Error response: ${err}. Message: ${response.statusText}`);
  }
};
