import { rgba } from "polished";
import styled from "styled-components";

export const LocationItemAmountElement = styled.div`
  display: grid;
  grid-template-columns: 3ch minmax(0, 1fr) 3ch;
  align-items: center;
  border-radius: 0.5rem;
  overflow: hidden;
  max-width: 100%;
`;

export const LocationItemAmountButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  border: none;
  height: 100%;
  color: #fff;
  background-color: ${({ theme }) => "#000"};
  cursor: pointer;
  padding: 0 0.3rem;

  &:hover {
    background-color: ${({ theme }) => rgba("#000", 0.7)};
  }
`;

export const LocationItemAmountInput = styled.input`
  border: none;
  outline: none;
  text-align: center;
  color: #fff;
  background-color: ${({ theme }) => "#000"};
`;
