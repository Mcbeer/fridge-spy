import { linearGradient, transparentize } from "polished";
import styled from "styled-components";

export const LocationItemProductDisplay = styled.div`
  font-size: 1.1rem;
`;
export const LocationItemElement = styled.li`
  display: grid;
  grid-template-columns: 1.5rem 1fr 6rem 6rem;
  gap: 0.5rem;
  position: relative;
  align-items: center;
  height: 2rem;

  &::after {
    content: "";
    position: absolute;
    bottom: -0.2rem;
    right: 0;
    left: 0;
    height: 1px;
    background-image: ${({ theme }) =>
      linearGradient({
        colorStops: [
          transparentize(1, theme.primary),
          theme.primary,
          transparentize(1, theme.primary),
        ],
        toDirection: "90deg",
      })};
  }
`;
