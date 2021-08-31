import React from "react";
import { Formik, Field, Form } from "formik";

interface FuncProps {
  filterValue: string;
  setfilterValue: (values: string) => void;
}

export default function Filter(props: FuncProps) {
  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    props.setfilterValue(e.target.value);
  }

  return (
    <>
      <Formik {...{ initialValues: { text: "" }, onSubmit: () => {} }}>
        {() => (
          <Form className="baseForm" noValidate>
            Filter Data:{" "}
            <Field
              type="text"
              id="text"
              className="text formField"
              onChange={onChange}
              value={props.filterValue}
              style={{
                color: "black",
                border: "1px solid black",
                background: "#cfcfcf",
                borderRadius: "5px",
              }}
            />
          </Form>
        )}
      </Formik>
    </>
  );
}
