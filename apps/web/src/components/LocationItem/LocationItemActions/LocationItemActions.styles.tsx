import { rgba } from "polished";
import styled from "styled-components";

export const LocationItemActionsElement = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
`;

export const LocationItemActionsButton = styled.button`
  height: 1.7rem;
  width: 1.7rem;
  outline: none;
  border: none;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => rgba(theme.primary, 0.5)};
  }
`;
