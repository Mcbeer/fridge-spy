import React, { ReactNode } from "react";
import styled from "styled-components";

export const LocationEntryContent = styled.section``;

export const LocationEntryTitle = styled.p`
  display: flex;
  height: 100%;
  align-items: center;
`;

interface LocationEntryItemListProps {
  children: ReactNode;
  expanded: boolean;
}

export const LocationEntryItemList = styled.ul``;
