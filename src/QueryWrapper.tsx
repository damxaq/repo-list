import React, { useState, useEffect } from "react";
import { useQuery } from "urql";

const FIRST = 5;
const ORGANIZATION_NAME = "reactjs";

export default function QueryWrapper() {
  const [repoData, setRepoData] = useState([]);

  const query = `
    query {
    organization(login:"${ORGANIZATION_NAME}") {
        name
        repositories(first: ${FIRST}) {
          totalCount
          nodes {
            name,
            forkCount,
            stargazerCount 
          }
        }
      }
    }
`;

  const [result, reexecuteQuery] = useQuery({ query: query });

  useEffect(() => {
    if (result && result.fetching === false && result.data?.organization) {
      const repositoryData = result.data.organization.repositories;
      setRepoData(repositoryData.nodes);
    }
  }, [result]);

  return <div>{repoData?.length > 0 && <>{JSON.stringify(repoData)}</>}</div>;
}
