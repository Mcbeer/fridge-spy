import styled from "styled-components";

export const Nav = styled.nav`
  box-shadow: ${({ theme }) => theme.shadow};
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.primary};
  border-radius: 1rem;
  padding: 4rem 0%;
`;

export const NavList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: space-evenly;
  height: 100%;
`;
