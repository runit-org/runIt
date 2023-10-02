import { Badge } from "react-bootstrap";
import { TimelineIcons } from "../components/profile/helper/profileBuilder";
import { Link } from "react-router-dom";

function Timeline({ data }) {
  return (
    <>
      {Object.keys(data).map((item, i) => (
        <div key={i}>
          <h3 className="timeline_date ">
            <span>{item}</span>
          </h3>
          <ol className="timeline">
            {data[item].map((entry, index) => (
              <li key={index}>
                <span className="icon">
                  <TimelineIcons icons={entry.type} />
                </span>
                <h5 className="d-flex align-items-center mb-1">
                  <Link to={entry.link}>{entry.title}</Link>{" "}
                  {i === 0 && <Badge>Latest</Badge>}
                </h5>
                <time className="d-block mb-2 text-muted">
                  {entry.humanTimeDiffCreatedAt} ago
                </time>
                <p
                  dangerouslySetInnerHTML={{
                    __html: entry.details,
                  }}
                />
              </li>
            ))}
          </ol>
        </div>
      ))}
    </>
  );
}

export default Timeline;
