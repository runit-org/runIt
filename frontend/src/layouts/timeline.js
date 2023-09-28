import { Badge } from "react-bootstrap";
import { TimelineIcons } from "../components/profile/helper/profileBuilder";
import { Link } from "react-router-dom";

function Timeline({ data }) {
  console.log(data);
  return (
    <ol className="timeline">
      {data.map((item, index) => {
        return (
          <li key={index}>
            <span className="icon">
              <TimelineIcons icons={item.type} />
            </span>
            <h5 className="d-flex align-items-center mb-1">
              <Link to={item.link}>{item.title}</Link>{" "}
              {index === 0 && <Badge>Latest</Badge>}
            </h5>
            <time className="d-block mb-2 text-muted">
              {item.humanTimeDiffCreatedAt} ago
            </time>
            <p
              dangerouslySetInnerHTML={{
                __html: item.details,
              }}
            />
          </li>
        );
      })}
    </ol>
  );
}

export default Timeline;
