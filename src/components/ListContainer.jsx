import React from "react";
import moment from "moment";

const ListContainer = ({ holidayList }) => {
  return (
    <div>
      {holidayList?.map((item) => {
        return (
          <li key={item.holiday}
            className={`list-group-item my-2 rounded mb-3 animated bounce delay-2s ${
              item?.isToday
                ?"border-warning bg-warning text-white"
                : ""
            }`} style = {item?.isToday? {boxShadow: '0 0 8px 8px #f6f186'}: {}}
             
          >
            <div
              className={"d-flex justify-content-between align-items-center"}
              style={{ marginBottom: 0, fontSize: 8 }}
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
