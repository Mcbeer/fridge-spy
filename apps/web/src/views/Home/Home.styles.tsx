import styled from "styled-components";

export const HomeSection = styled.section`
  height: 100%;
  position: relative;
  display: grid;
  grid-template-rows: 3rem 1fr;
`;

export const HomeList = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 1em;
`;

export const HomeNoHouses = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const HomeNoHousesText = styled.h2`
  font-size: 1.4em;
  opacity: 0.7;
`;
