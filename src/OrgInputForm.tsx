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
            <FormLabel htmlFor="organizationName">Organization Name</FormLabel>
            <Input
              value={values.organizationName}
              onChange={handleChange}
              id="organizationName"
              placeholder="organizationName"
            />
          </FormControl>
          <Button
            type="submit"
            background="teal"
            m={4}
            isLoading={isSubmitting}
          >
            Search
          </Button>
        </Form>
      )}
    </Formik>
  );
}
