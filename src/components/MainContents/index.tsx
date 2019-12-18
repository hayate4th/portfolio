import React from "react";
import GitHubContributions from "../GitHubContributions";
import styled from "styled-components";

const MainContents: React.FC = () => {
  return (
    <ContentsWrapper>
      <GitHubContributions />
    </ContentsWrapper>
  );
};

const ContentsWrapper = styled.div`
  width: 800px;
  margin: 0 auto;
`;

export default MainContents;
