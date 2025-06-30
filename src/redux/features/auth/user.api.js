import { baseApi } from "../../api/baseApi";


export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    userRegistration: builder.mutation({
      query: (userData) => ({
        url: "/users/registration",
        method: "POST",
        body: userData,
      }),
    }),
    userLogin: builder.mutation({
      query: (userData) => ({
        url: "/users/login",
        method: "POST",
        body: userData,
      }),
    }),
  }),
});

export const { useUserRegistrationMutation,useUserLoginMutation} = userApi;
