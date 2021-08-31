import React from "react";
import { Formik, Form } from "formik";
import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";

interface FuncProps {
  setOrganizationName: (values: string) => void;
}

export default function OrgInputForm(props: FuncProps) {
  return (
    <Formik
      initialValues={{ organizationName: "reactjs" }}
      onSubmit={async (values) => {
        return await new Promise((resolve) => {
          props.setOrganizationName(values.organizationName);
          setTimeout(resolve, 200);
        });
      }}
    >
      {({ values, handleChange, isSubmitting }) => (
        <Form>
          <FormControl>
            <FormLabel
              htmlFor="organizationName"
              data-testid="organizationNameLabel"
            >
              Organization Name
            </FormLabel>
            <Input
              value={values.organizationName}
              onChange={handleChange}
              id="organizationName"
              placeholder="organizationName"
              data-testid="input"
            />
          </FormControl>
          <Button
            type="submit"
            background="teal"
            m={4}
            isLoading={isSubmitting}
            data-testid="searchButton"
          >
            Search
          </Button>
        </Form>
      )}
    </Formik>
  );
}
