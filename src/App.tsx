import * as React from "react";
import { ChakraProvider, Box, Grid, extendTheme } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { createClient, Provider } from "urql";
import QueryWrapper from "./QueryWrapper";

const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const client = createClient({
  url: "https://api.github.com/graphql",
  fetchOptions: {
    headers: {
      Authorization: `bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github.packages-preview+json",
    },
  },
});

const theme = extendTheme({
  config: {
    useSystemColorMode: true,
    initialColorMode: "dark",
  },
});

export const App = () => (
  <Provider value={client}>
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl" maxWidth="800px" margin="auto">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <QueryWrapper />
        </Grid>
      </Box>
    </ChakraProvider>
  </Provider>
);
