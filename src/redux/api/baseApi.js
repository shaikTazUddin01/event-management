import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://event-management-server-jade.vercel.app" }),
  endpoints: () => ({}),
  tagTypes: ["event"]
  
});
