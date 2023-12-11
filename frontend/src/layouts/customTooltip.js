import { OverlayTrigger, Tooltip } from "react-bootstrap";

function CustomTooltip({ id, children, tooltip, showDelay, hideDelay }) {
  return (
    <OverlayTrigger
      overlay={<Tooltip id={id}>{tooltip}</Tooltip>}
      placement="top"
      delay={{ show: showDelay, hide: hideDelay }}
    >
      {children}
    </OverlayTrigger>
  );
}

export default CustomTooltip;
