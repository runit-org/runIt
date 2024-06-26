import Card from "react-bootstrap/Card";

export const InfoCard = (props) => {
  return (
    <Card style={props.cardStyle}>
      <Card.Body>
        <Card.Title className="d-inline-flex align-items-center">
          {props.icon} {props.title}
        </Card.Title>

        <Card.Text className="content_sm1">{props.content}</Card.Text>
      </Card.Body>
    </Card>
  );
};
