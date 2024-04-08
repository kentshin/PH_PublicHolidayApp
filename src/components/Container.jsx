import React, { useEffect, useState } from "react";
import "./../index.css";
import moment from "moment";
import GOOGLE_APIKEY from "./constant";
import { getHolidayData } from "./api";
import ContainerTimer from "./ContainerTimer";
import ListContainer from "./ListContainer";

getHolidayData;
const Container = () => {
  const yearToday = moment().format("YYYY");
  const [holidayData, setHolidayData] = useState();
  let nextHolidayDate;

  useEffect(() => {
    fetch(
      `https://www.googleapis.com/calendar/v3/calendars/en.philippines%23holiday%40group.v.calendar.google.com/events?key=${GOOGLE_APIKEY}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setHolidayData(data?.items);
      });
  }, []);

  //filter the array of holiday to get the current year holidays
  const holidayToDate = holidayData?.filter((item) =>
    item.start.date.includes(yearToday)
  );

  //reducing the current filtered array of holidays to return a new set of modified array
  const currentHolidays = holidayToDate?.reduce((newArray, holidayToDate) => {
    const upcoming =
      moment().isBefore(holidayToDate?.start?.date) ||
      moment().isSame(holidayToDate?.start?.date)
        ? true
        : false;
    const holidays = {
      holiday: holidayToDate?.summary,
      date: holidayToDate?.start?.date,
      upcoming: upcoming,
    };
    newArray.push(holidays);
    return newArray;
  }, []);

  //holiday list props
  nextHolidayDate = currentHolidays
    ?.filter((filteredItem) => filteredItem?.upcoming)
    ?.slice(0, 1)
    .map((item) => {
      return item;
    });

  const previousHolidays = currentHolidays
    ?.filter((filteredItem) => !filteredItem?.upcoming)
    ?.slice(0, 3);

  const currentUpcomingHolidays = currentHolidays
    ?.filter((filteredItem) => filteredItem?.upcoming)
    ?.slice(0, 3);

  return (
    <div className="container-fluid my-3">
      <div className="my-3 row">
        <ContainerTimer nextHolidayDate={nextHolidayDate} />
        <div className="col-sm">
          <h7>Previous Holidays</h7>
          <ul className="list-group">
            <ListContainer holidayList={previousHolidays} />
          </ul>
        </div>
        <div className="col-sm">
          <h7>Upcoming Holidays</h7>
          <ul className="list-group">
            <ListContainer holidayList={currentUpcomingHolidays} />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Container;
