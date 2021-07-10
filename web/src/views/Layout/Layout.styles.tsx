import { darken, lighten } from "polished";
import styled from "styled-components";

export const LayoutMain = styled.main`
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: minmax(0, 8rem) 1fr;
  background-color: ${({ theme }) => lighten(0.4, theme.primary)};
`;
export const LayoutNav = styled.div`
  margin: 1rem;
  grid-column-start: 1;
`;

export const LayoutContent = styled.div`
  margin: 1rem;
  grid-column-start: 2;
`;
