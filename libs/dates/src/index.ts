import { format } from "date-fns";

export const formatToTimestamptz = (date: Date | number): string => {
  return new Date(date).toISOString();
};

export const formatDate = (
  date: Date | number | string,
  formatTemplate: string
): string => {
  return format(new Date(date), formatTemplate);
};
