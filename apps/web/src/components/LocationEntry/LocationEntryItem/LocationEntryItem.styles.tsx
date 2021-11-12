import { linearGradient, transparentize } from "polished";
import styled from "styled-components";

export const LocationEntryItemProductDisplay = styled.div`
    font-size: 1.3rem;
    line-height: 1.5rem;
`
export const LocationEntryItemElement = styled.li`
    display: grid;
    grid-template-columns: 1rem 1fr 4rem 12rem;
    position: relative;
    align-items: center;
    height: 2rem;

    &::after {
    content: '';
    position: absolute;
    bottom: -0.2rem;
    right: 0;
    left: 0;
    height: 1px;
    background-image: ${({ theme }) => linearGradient({colorStops: [transparentize(1, theme.primary), theme.primary, transparentize(1, theme.primary)], toDirection: '90deg'})};
  }
`