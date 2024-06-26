import React, { useState, useEffect, useRef } from "react";
import { Row, Form, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createNewEvent } from "../../services/actions/eventActions";
import { emitter } from "../client/socket";
import CTAButton from "../../layouts/ctaButton";
import { MentionFilter } from "../../utilities/utility-service";
import * as ResponseStatus from "../../services/constants/responseStatus";
import { useHandleChange } from "../../hooks/useHandleChange";
import { FormGroup, FormLabel } from "../../layouts/customForm";
import { ResponseItem } from "../../layouts/responseItems";
import { useNavigate } from "react-router-dom";
import { RESET_CURRENT_PAGE } from "../../services/constants/types";
import { EVENT } from "../../routes/routes";
import ReactQuill from "react-quill";
import { QuillSetting } from "../../utilities/quillSettings";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { handleFormInputs } from "./helper/eventBuilder";
import dayjs from "dayjs";
import CustomTooltip from "../../layouts/customTooltip";
import { Information } from "../../layouts/icons";

function CreateEvent(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formRef = useRef(0);
  const { modules, formats } = QuillSetting();

  const initialState = {
    title: "",
    maxMember: 0,
    details: "",
    date: "",
    time: "",
  };

  const { formValue, setFormValue, handleFieldChange } =
    useHandleChange(initialState);
  const [validateFormEmpty, setValidateFormEmpty] = useState(false);
  const [load, setLoad] = useState(false);
  const eventDate = new Date(formValue.date);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [openTimePicker, setOpenTimePicker] = useState(false);

  useEffect(() => {
    if (!/\S/.test(formValue.details)) {
      setValidateFormEmpty(true);
    } else {
      setValidateFormEmpty(false);
    }
  }, [formValue.details]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      ...formValue,
      year: eventDate.getFullYear(),
      month: eventDate.getMonth() + 1,
      day: eventDate.getDate(),
      hour: formValue.time !== "" ? parseInt(formValue.time.split(":")[0]) : "",
      minute:
        formValue.time !== "" ? parseInt(formValue.time.split(":")[1]) : "",
    };

    dispatch(createNewEvent(postData, setLoad)).then(({ status, data }) => {
      if (status === ResponseStatus.OK) {
        formRef.current.reset();
        setFormValue(initialState);
        emitter(MentionFilter(data.data.details));
        dispatch({
          type: RESET_CURRENT_PAGE,
        });
        navigate(`/${EVENT}/${data.data.id}?page=1`);
      }
    });
  };

  //data from suggestions
  useEffect(() => {
    if (Object.keys(props.suggestion).length !== 0) {
      setFormValue({
        title: `${props.suggestion.title} - ${props.suggestion.category}`,
        details: `Link: <a href=${props.suggestion.link} targe="_blank">${props.suggestion.title}</a><br/>Location: ${props.suggestion.location}<br/>Category: ${props.suggestion.category}\n\n`,
        date: new Date(props.suggestion.time).toISOString().split("T")[0],
        time: new Date(props.suggestion.time).toLocaleTimeString("en-US", {
          timeStyle: "short",
          hour12: false,
        }),
        maxMember: formValue.maxMember,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.suggestion, setFormValue]);

  return (
    <Card className="create_event-card">
      <Card.Header>
        <p className="fw-bold m-0">Create event</p>
      </Card.Header>
      <Card.Body>
        <Form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          ref={formRef}
        >
          <div className="new-post-container">
            <FormGroup formId="formBasicTitle">
              <FormLabel>Event name</FormLabel>
              <Form.Control
                type="title"
                name="title"
                value={formValue.title}
                onChange={handleFieldChange}
                required
              />
            </FormGroup>

            <Row>
              <FormGroup formId="formBasicNumber" customStyle="col-md-4">
                <FormLabel>Event size</FormLabel>
                <CustomTooltip
                  tooltip={"Max capacity for attendees for this event"}
                  id="tooltip-event"
                  showDelay="0"
                  hideDelay="0"
                >
                  <span className="ms-1">
                    <Information />
                  </span>
                </CustomTooltip>

                <Form.Control
                  type="number"
                  name="maxMember"
                  className="mb-3"
                  onChange={handleFieldChange}
                  min="2"
                  required
                />
              </FormGroup>

              <FormGroup formId="formBasicTime" customStyle="col-md-4">
                <FormLabel>Start time</FormLabel>

                <TimePicker
                  className="dateTimePicker mb-3"
                  open={openTimePicker}
                  onClose={() => setOpenTimePicker(false)}
                  value={formValue.time["$d"] || dayjs(formValue.time, "HH:mm")}
                  onChange={(value) => {
                    handleFormInputs(
                      new Date(value).toLocaleTimeString("en-US", {
                        timeStyle: "short",
                        hour12: false,
                      }),
                      setFormValue,
                      ["time"]
                    );
                  }}
                  slots={{ openPickerButton: () => "" }}
                  slotProps={{
                    textField: {
                      onClick: () => setOpenTimePicker(true),
                    },
                  }}
                />
              </FormGroup>

              <FormGroup formId="formBasicDate" customStyle="col-md-4">
                <FormLabel>Start date</FormLabel>
                <DatePicker
                  className="dateTimePicker mb-3"
                  open={openDatePicker}
                  onClose={() => setOpenDatePicker(false)}
                  value={formValue.date["$d"] || dayjs(formValue.date)}
                  onChange={(value) => {
                    handleFormInputs(value, setFormValue, ["date"]);
                  }}
                  disablePast
                  slots={{ openPickerButton: () => "" }}
                  slotProps={{
                    textField: {
                      onClick: () => setOpenDatePicker(true),
                    },
                  }}
                />
              </FormGroup>
            </Row>

            <FormGroup formId="formBasicDetails">
              <ReactQuill
                name="details"
                theme="snow"
                modules={modules}
                formats={formats}
                value={formValue.details}
                onChange={(value) => {
                  handleFormInputs(value, setFormValue, ["details"]);
                }}
              />
            </FormGroup>
          </div>

          <div className="d-flex justify-content-between mt-3">
            <ResponseItem />
            <CTAButton
              type={"submit"}
              btnStyle={"formBtn cta_button"}
              variant={"primary"}
              formValidation={validateFormEmpty}
              isLoading={load}
              placeholder={
                <div className="d-flex align-items-center">Create event</div>
              }
            />
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default CreateEvent;
