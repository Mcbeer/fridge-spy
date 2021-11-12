import React, { ReactNode } from "react";
import styled from "styled-components";

export const LocationEntryContent = styled.section``;

export const LocationEntryTitle = styled.p`
  display: flex;
  height: 100%;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 700;
`;

interface LocationEntryItemListProps {
  children: ReactNode;
  expanded: boolean;
}

export const LocationEntryItemList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: .4rem;
`;
