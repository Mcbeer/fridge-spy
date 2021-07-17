import { darken } from "polished";
import styled from "styled-components";
import { theme } from "../../theme/theme";

export const HomeEntryListElement = styled.li`
  cursor: pointer;
  & > div:hover {
    background-color: ${() => darken(0.05, "#fff")};
  }
`;

export const HomeEntryContent = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 10% 1fr 1fr 10%;
`;
