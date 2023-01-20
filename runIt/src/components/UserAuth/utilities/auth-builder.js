import { Button } from "react-bootstrap";
import Loading from "../../SiteElements/loader";

export const FormButton = (props) => {
  return (
    <div className="centerContent align-items-center">
      <Button type="submit" className="mb-2 mt-3 w-100">
        {(() => {
          if (props.load) {
            return <Loading />;
          } else {
            return <>{props.name}</>;
          }
        })()}
      </Button>
    </div>
  );
};
