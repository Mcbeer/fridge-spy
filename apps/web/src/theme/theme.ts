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
