import { lighten } from "polished";
import styled, { ITheme } from "styled-components";

export const LayoutMain = styled.main`
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: minmax(0, 8rem) 1fr;
  background-color: ${({ theme }: { theme: ITheme }) => {
    return lighten(0.4, theme.primary);
  }};
  overflow: hidden;
`;
export const LayoutNav = styled.div`
  padding: 1rem;
  grid-column-start: 1;
`;

export const LayoutContent = styled.div`
  padding: 1rem;
  grid-column-start: 2;
  overflow-y: auto;
`;
