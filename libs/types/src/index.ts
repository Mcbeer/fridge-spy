export * from "./IBrand";
export * from "./ICountry";
export * from "./IHouse";
export * from "./ILocation";
export * from "./IProduct";
export * from "./IProductType";
export * from "./ITimestamps";
export * from "./IToken";
export * from "./IUser";
export * from "./RedisChannels";
export * from "./UserRoles";

export interface IObjectList<T> {
  [key: string]: T;
}
