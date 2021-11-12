// import original module declarations
import "styled-components";
import { ITheme } from "styled-components";

// and extend them!
declare module "styled-components" {
  export interface ITheme {
    primary: string;
    secondary: string;
    warning: string;
    shadow: string;
  }
}

export const appTheme: ITheme = {
  primary: "#3075d7",
  secondary: "#00909a",
  warning: "#bd5b00",
  shadow: "0 0 10px 4px rgba(0, 0, 0, 0.2);",
};
