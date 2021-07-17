import styled from "styled-components";
import { lighten } from "polished";

export const NavItemBase = styled.li`
  color: #fff;
  height: 5rem;
  width: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
  transition: background-color 250ms ease-in-out;
  background-color: inherit;
  margin: 0.5rem;
  border-radius: 5px;
  text-align: left;

  &:hover {
    background-color: ${({ theme }) => lighten(0.1, theme.primary)};
  }

  &:hover p::after {
    transform: scale(1);
  }

  & > a {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
`;

export const NavItemIcon = styled.span`
  display: block;
`;

export const NavItemLabel = styled.p`
  display: block;
  position: relative;
  text-align: center;

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: #fff;
    opacity: 1;
    transform: scale(0);
    transform-origin: center;
    overflow: hidden;
    transition: transform 300ms ease-in-out;
  }
`;
