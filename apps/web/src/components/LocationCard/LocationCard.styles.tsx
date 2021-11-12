import React, { ReactNode } from "react";
import styled from "styled-components";

export const LocationCardListElement = styled.section`
  transition: transform 200ms ease-in-out;
  &:hover {
    transform: scale(1.03);
  }
`;

export const LocationCardContent = styled.div`
  display: grid;
  grid-template-rows: 12rem 2rem 1.5rem;
`;

export const LocationCardTitle = styled.h2`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 700;
`;

export const LocationCardDescription = styled.p`
  font-size: 1.1rem;
  display: flex;
  justify-content: center;
`;

export const LocationCardIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LocationCardItemList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;
