import React from "react";
import moment from "moment";

const ListContainer = ({ holidayList }) => {
  return (
    <div>
      {holidayList?.map((item) => {
        return (
          <li key={item.holiday}
            className={`list-group-item my-2 rounded mb-3 ${
              item?.upcoming
                ? ""
                : moment().isSame(item?.date)
                ? "border border-3 border-success shadow-lg bg-warning text-white"
                : ""
            }`}
          >
            <div
              className={"d-flex justify-content-between align-items-center"}
              style={{ marginBottom: 0, fontSize: 7 }}
            >
              <p className="text-text" style={{ marginBottom: 0 }}>
                {item?.holiday}
              </p>
              <div className="d-flex content-between">
                {moment(item?.date).format("dddd")} - &nbsp;
                {moment(item?.date).format("MM-DD")}
              </div>
            </div>
          </li>
        );
      })}
    </div>
  );
};

export default ListContainer;
