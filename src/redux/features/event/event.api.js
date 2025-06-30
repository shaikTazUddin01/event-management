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

    getAllEvent: builder.query({
      query: (args) => {
        const { search_title, date } = args || {}; // New params

        console.log("__RTK Query Args__:", args);

        const params = new URLSearchParams();
        if (search_title) {
          params.append("search_title", search_title);
        }
        if (date) {
          params.append("filter_date", date);
        }

        const queryString = params.toString();
        const url = queryString
          ? `/event/getAll?${queryString}`
          : "/event/getAll";

        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["event"],
    }),
    getMyEvent: builder.query({
      query: (email) => ({
        url: `/event/myEvent?email=${email}`,
        method: "GET",
      }),
      providesTags: ["event"],
    }),
    deleteEvent: builder.mutation({
      query: (id) => ({
        url: `/event/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["event"],
    }),
    updateEvent: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/event/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["event"],
    }),
  }),
});

export const {
  useAddEventMutation,
  useGetAllEventQuery,
  useDeleteEventMutation,
  useGetMyEventQuery,
  useUpdateEventMutation,
} = eventApi;
