import { Badge } from "react-bootstrap";

function Timeline({ data }) {
  return (
    <ol className="timeline">
      {data.results
        ? data.results.map((item, index) => {
            return (
              <li key={index}>
                <span className="icon">
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                  </svg>
                </span>
                <h5 className="d-flex alignxXZ -items-center mb-1">
                  Application UI v2.0.0 {index === 0 && <Badge>Latest</Badge>}
                </h5>
                <time className="d-block mb-2 text-muted">
                  {item.humanTimeDiffCreatedAt} ago
                </time>
                <p>{item.details}</p>
              </li>
            );
          })
        : ""}
    </ol>
  );
}

export default Timeline;
