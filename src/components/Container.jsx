import React, { useEffect, useState } from "react";
import "./../index.css";
import moment from "moment";
import GOOGLE_APIKEY from "./constant";
import { getHolidayData } from "./api";
import ContainerTimer from "./ContainerTimer";
import ListContainer from "./ListContainer";
import Spinner from "./spinner/Spinner";

getHolidayData;
const Container = () => {
  const yearToday = moment().format("YYYY");
  const [holidayData, setHolidayData] = useState();
  const formattedDateTimeToday = moment().format("YYYY-MM-DD");
  const [isLoading, setIsLoading] = useState(true);
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
        setIsLoading(false);
      });
  }, []);

  //filter the array of holiday to get the current year holidays
  const holidayToDate = holidayData?.filter((item) =>
    item.start.date.includes(yearToday)
  );

  //reducing the current filtered array of holidays to return a new set of modified array
  const currentHolidays = holidayToDate?.reduce((newArray, holidayToDate) => {
    const isHolidayToday = moment(formattedDateTimeToday).isSame(
      holidayToDate?.start?.date
    );
    const upcoming =
      isHolidayToday || moment().isBefore(holidayToDate?.start?.date)
        ? true
        : false;
    const holidays = {
      holiday: holidayToDate?.summary,
      date: holidayToDate?.start?.date,
      upcoming: upcoming,
      isToday: isHolidayToday,
    };
    newArray.push(holidays);
    return newArray;
  }, []);

  //holiday array list props
  nextHolidayDate = currentHolidays
    ?.filter((filteredItem) => filteredItem?.upcoming)
    ?.slice(0, 1)
    .map((item) => {
      return item;
    });

  const previousHolidays = currentHolidays
    ?.filter((filteredItem) => !filteredItem?.upcoming)
    ?.reverse()
    ?.slice(1, 4);

  const currentUpcomingHolidays = currentHolidays
    ?.filter((filteredItem) => filteredItem?.upcoming)
    ?.slice(0, 3);

  return (
    <div className="container-fluid my-3">
      {isLoading ? (
        <center>
          <Spinner />
        </center>
      ) : (
        <div className="my-3 row">
          <ContainerTimer nextHolidayDate={nextHolidayDate} />
          <div className="col-sm">
            <h7>PREVIOUS HOLIDAYS</h7>
            <ul className="list-group">
              <ListContainer holidayList={previousHolidays} />
            </ul>
          </div>
          <div className="col-sm">
            <h7>UPCOMING HOLIDAYS</h7>
            <ul className="list-group">
              <ListContainer holidayList={currentUpcomingHolidays} />
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Container;
