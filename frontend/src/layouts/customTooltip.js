import { OverlayTrigger, Tooltip } from "react-bootstrap";

function CustomTooltip({ id, children, tooltip }) {
  return (
    <OverlayTrigger
      overlay={<Tooltip id={id}>{tooltip}</Tooltip>}
      placement="top"
      delay={{ show: "1000", hide: "0" }}
    >
      {children}
    </OverlayTrigger>
  );
}

export default CustomTooltip;
