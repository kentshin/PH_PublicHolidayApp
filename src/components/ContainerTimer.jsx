import moment from "moment";
import React from "react";

const ContainerTimer = ({ nextHolidayDate }) => {
  const nextHoliday = nextHolidayDate?.[0]?.date?.toString();
  const timerCountDown = moment(nextHoliday).diff(moment(), "days", "hours");

  return (
    <div className="container my-1">
      <h6 className={timerCountDown >= 0 ? "text-info" : "text-warning"}>
        {timerCountDown >= 0
          ? `Next Holiday In:  
              ${timerCountDown.toFixed(1)} day${
              timerCountDown?.toFixed(1) < 1 ? "" : "s"
            }`
          : `Holiday : ` + nextHolidayDate?.[0]?.holiday}
      </h6>
    </div>
  );
};

export default ContainerTimer;
