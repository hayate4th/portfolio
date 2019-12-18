import React from "react";
import styled from "styled-components";

// TODO: cut out alt attribute value for i18n
const GitHubContributions: React.FC = () => {
  return (
    <>
      <h2>Recent Contributions</h2>
      <ContributionsGraph
        src="https://grass-graph.moshimo.works/images/hayate4th.png"
        alt="Image of hayate4th's Recent GitHub contributions"
      />
    </>
  );
};

const ContributionsGraph = styled.img`
  width: 100%;
`;

export default GitHubContributions;
