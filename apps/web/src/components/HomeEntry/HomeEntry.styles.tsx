import styled from "styled-components";

export const HomeEntryListElement = styled.li`
  cursor: pointer;
  transition: transform 200ms ease-in-out;

  &:hover {
    transform: scale(1.03);
  }
`;

export const HomeEntryContent = styled.div`
  display: grid;
  align-items: center;
  grid-template-rows: 12rem 1fr 1fr 10%;
`;

export const HomeEntryHomeIcon = styled.span`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  justify-content: center;
`;

export const HomeEntryText = styled.p`
  display: flex;
  height: 100%;
  align-items: center;
  cursor: pointer;
`;
