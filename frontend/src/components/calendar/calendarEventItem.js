import React, { useContext } from "react";
import { Badge } from "react-bootstrap";
import { DayEventsHandler } from "./utilities/actionHandler";
import { CalendarContext } from "../../context/calendarProvider";
import SortDropdown from "../../layouts/sortDropdown";
import { Link } from "react-router-dom";
import { CustomTable, CustomTableCells } from "../../layouts/customTable";

function CalendarEventItem(props) {
  const { currentDay } = useContext(CalendarContext);

  const formatter = new Intl.DateTimeFormat("en", {
    month: "short",
  });

  const calendarEvents = DayEventsHandler(
    props.userId,
    currentDay.getDate(),
    currentDay.getMonth() + 1,
    currentDay.getFullYear()
  );

  return (
    <>
      <CustomTable
        headerItems={
          <th colSpan={3}>
            <div className="d-flex justify-content-between align-items-center mx-2">
              {calendarEvents ? <>{calendarEvents.length} events</> : ""}
              <SortDropdown />
            </div>
          </th>
        }
        tableItems={
          calendarEvents && calendarEvents.length > 0 ? (
            <>
              {calendarEvents.map((item, i) => {
                return (
                  <tr key={i} className="table_row">
                    <CustomTableCells>
                      <Badge>
                        {new Date(item.eventDate).getDate()}{" "}
                        <span className="d-block">
                          {formatter.format(new Date(item.eventDate))}
                        </span>
                      </Badge>
                    </CustomTableCells>
                    <CustomTableCells>
                      <h4>
                        <Link to={`/event/${item.id}`}>{item.title}</Link>
                      </h4>
                      <small className="d-block card-timestamp text-muted align-self-center">
                        in {item.timeToEvent}
                      </small>
                    </CustomTableCells>
                    <CustomTableCells>
                      <div className="d-flex img-group">
                        <img
                          src={item.gravatarImage}
                          className="members-img "
                          alt="Img"
                        />
                      </div>
                    </CustomTableCells>
                  </tr>
                );
              })}
            </>
          ) : (
            <tr className="table_row">
              <td className="text-center">
                <div className="table-content">
                  <h6 className="p-0 m-0">No events scheduled</h6>
                </div>
              </td>
            </tr>
          )
        }
      />
    </>
  );
}

export default CalendarEventItem;
