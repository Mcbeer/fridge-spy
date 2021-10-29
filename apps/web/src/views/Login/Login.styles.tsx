import { lighten } from "polished";
import styled from "styled-components";

export const LoginMain = styled.main`
  position: absolute;
  inset: 0;
  background-color: ${({ theme }) => lighten(0.4, theme.primary)};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoginBox = styled.section`
  background-color: #fff;
  height: 60vh;
  width: 40vw;
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadow};
`;

export const LoginBoxTopDecorator = styled.span`
  background: rgb(48, 117, 215);
  background: linear-gradient(
    150deg,
    rgba(48, 117, 215, 1) 35%,
    rgba(0, 144, 154, 1) 100%
  );
  height: 1rem;
  width: 100%;
`;

export const LoginBoxContent = styled.div`
  padding: 1rem;
  height: 100%;
  margin-bottom: 2rem;
`;

export const LoginBoxTitle = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 700;
`;

export const LoginButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding-top: 1rem;
`;
