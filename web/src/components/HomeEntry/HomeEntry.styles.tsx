import styled from "styled-components";

export const HomeEntryListElement = styled.li`
  cursor: pointer;
`;

export const HomeEntryContent = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 10% 1fr 1fr 10%;
`;

export const HomeEntryHomeIcon = styled.span`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const HomeEntryText = styled.p`
  display: flex;
  height: 100%;
  align-items: center;
`;

export const HomeEntryCallToAction = styled.span`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
