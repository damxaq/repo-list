import React, { useState, useEffect } from "react";
import { Button, Box } from "@chakra-ui/react";
import { useQuery } from "urql";
import ReposTable from "./ReposTable";
import OrgInputForm from "./OrgInputForm";
import Filter from "./Filter";

const REPOS_LIMIT = 5;
const OFFSET = 5;

export default function QueryWrapper() {
  const [organizationName, setOrganizationName] = useState("");
  const [organizationDescription, setOrganizationDescription] = useState("");
  const [repoData, setRepoData] = useState([]);
  const [first, setFirst] = useState(REPOS_LIMIT);
  const [repoCount, setRepoCount] = useState(0);
  const [showInputError, setShowInputError] = useState(false);
  const [filterValue, setfilterValue] = useState("");
  const [filteredRepoData, setFilteredRepoData] = useState([]);

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
        if (showInputError) setShowInputError(false);
        setOrganizationDescription(result.data.organization.name);
        const repositoryData = result.data.organization.repositories;

        setRepoCount(repositoryData.totalCount);
        setRepoData(repositoryData.nodes);
        setFilteredRepoData(repositoryData.nodes);
      } else if (organizationName) {
        setRepoData([]);
        setFilteredRepoData([]);
        setShowInputError(true);
      }
    }
  }, [result, organizationName]);

  // Reseting query limit after searching again
  useEffect(() => {
    if (repoData.length) {
      setFirst(REPOS_LIMIT);
    }
  }, [organizationName]);

  // Simple pagination, but GitHub does not support using "limit" or "offset" in graphql query
  const handleMore = () => {
    setFirst(first + OFFSET);
  };

  // Filtering repository array by the value of filterValue
  useEffect(() => {
    const tempRepoData = repoData.filter((repo) =>
      JSON.stringify(repo).includes(filterValue)
    );
    setFilteredRepoData(tempRepoData);
  }, [filterValue]);

  return (
    <div>
      {showInputError && <Box mb={6}>Could not find an organization</Box>}
      <OrgInputForm setOrganizationName={setOrganizationName} />
      {repoData?.length > 0 && (
        <>
          <Filter filterValue={filterValue} setfilterValue={setfilterValue} />
          <ReposTable
            tableData={filteredRepoData}
            organizationName={organizationName}
            organizationDescription={organizationDescription}
          />
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
