import React, { useState, useEffect } from "react";
import { useQuery } from "urql";
import ReposTable from "./ReposTable";
import OrgInputForm from "./OrgInputForm";

const FIRST = 5;

export default function QueryWrapper() {
  const [organizationName, setOrganizationName] = useState("");
  const [repoData, setRepoData] = useState([]);

  const query = `
    query {
    organization(login:"${organizationName}") {
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
  }, [result, organizationName]);

  console.log(result);

  return (
    <div>
      <OrgInputForm setOrganizationName={setOrganizationName} />
      {repoData?.length > 0 && <ReposTable tableData={repoData} />}
    </div>
  );
}
