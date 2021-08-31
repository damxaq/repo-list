import React, { useState, useEffect } from "react";
import { Button, Box } from "@chakra-ui/react";
import { useQuery } from "urql";
import ReposTable from "./ReposTable";
import OrgInputForm from "./OrgInputForm";

const REPOS_LIMIT = 5;
const OFFSET = 5;

export default function QueryWrapper() {
  const [organizationName, setOrganizationName] = useState("");
  const [repoData, setRepoData] = useState([]);
  const [first, setFirst] = useState(REPOS_LIMIT);
  const [repoCount, setRepoCount] = useState(0);
  const [showInputError, setShowInputError] = useState(false);

  const query = `
    query {
    organization(login:"${organizationName}") {
        name
        repositories(first: ${first}) {
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
    if (result && result.fetching === false) {
      if (result.data?.organization) {
        const repositoryData = result.data.organization.repositories;
        if (showInputError) setShowInputError(false);
        setRepoCount(repositoryData.totalCount);
        setRepoData(repositoryData.nodes);
      } else if (organizationName) {
        setRepoData([]);
        setShowInputError(true);
      }
    }
  }, [result, organizationName]);

  useEffect(() => {
    if (repoData.length) {
      setFirst(REPOS_LIMIT);
    }
  }, [organizationName]);

  // Simple pagination, but GitHub does not support using "limit" or "offset" in graphql query
  const handleMore = () => {
    setFirst(first + OFFSET);
  };

  return (
    <div>
      {showInputError && <Box mb={6}>Could not find an organization</Box>}
      <OrgInputForm setOrganizationName={setOrganizationName} />
      {repoData?.length > 0 && (
        <>
          <ReposTable tableData={repoData} />
          {first < repoCount && (
            <Button onClick={handleMore} isActive={false}>
              More
            </Button>
          )}
        </>
      )}
    </div>
  );
}
