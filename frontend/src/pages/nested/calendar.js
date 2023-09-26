import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import Calendar from "../../components/calendar/calendarItem";
import CalendarEventItem from "../../components/calendar/calendarEventItem";
import { SectionHeader } from "../../layouts/sectionHeader.js";
import { useSearchParams } from "react-router-dom";
import { UserContext } from "../../context/userProvider";
import UserProfileHandler from "../../components/profile/helper/actionHandlers";
import { CalendarContext } from "../../context/calendarProvider";
import { DateFormat, DateOrdinal } from "../../utilities/utility-service";

function CalendarPage() {
  const { currentDay } = useContext(CalendarContext);
  const [searchParams] = useSearchParams();
  const param = searchParams.get("user");
  const { currentUser } = useContext(UserContext);
  const user = UserProfileHandler(param ? param : currentUser.username);

  //date
  var currDay = new Date(currentDay).getDate();

  return (
    <>
      {user ? (
        <>
          <div className="content">
            <Container className="content-wrapper">
              <SectionHeader>
                {user.username}'s events on{" "}
                {DateFormat("short").format(new Date(currentDay))} {currDay}
                {DateOrdinal(currDay)}
              </SectionHeader>
              <CalendarEventItem userId={user.id} />
            </Container>
          </div>

          <div className="sidebar_calendarDash">
            <div className="sidebar-wrapper">
              <Container className="content-wrapper">
                <div className="calendar-wrapper">
                  <Calendar userId={user.id} />
                </div>
              </Container>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default CalendarPage;
