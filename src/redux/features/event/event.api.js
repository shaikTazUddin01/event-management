import { baseApi } from "../../api/baseApi";

export const eventApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addEvent: builder.mutation({
      query: (event) => ({
        url: "/event/add",
        method: "POST",
        body: event,
      }),
      invalidatesTags: ["event"],
    }),
    getEvent: builder.query({
      query: () => ({
        url: "/event/getAll",
        method: "GET",
      }),
    }),
  }),
});

export const { useAddEventMutation, useGetEventQuery } = eventApi;
