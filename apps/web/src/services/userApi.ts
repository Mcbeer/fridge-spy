import { IUser } from "@fridgespy/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8001/api/v1" }),
  endpoints: (builder) => ({
    authorizeUser: builder.mutation({
      query: ({ email, password }: { email: string; password: string }) => ({
        url: "/auth/authorize",
        body: { email, password },
        method: "POST",
      }),
      transformResponse: (response: { user: IUser }) => response.user,
    }),
  }),
});
