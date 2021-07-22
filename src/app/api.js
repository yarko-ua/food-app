import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const listApi = createApi({
  reducerPath: 'listAPI',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  tagTypes: ['Users'],
  endpoints: builder => ({
    getUsers: builder.query({
      query: () => 'users',
      providesTags: result => 
        result
          ? 
            [
              ...result.map(({ id }) => ({ type: 'Users', id })),
              { type: 'Users', id: 'List' },
            ]
          :
            [{type: 'Users', id: 'List'}]
    }),
    getUserById: builder.query({
      query: (uid) => `users/${uid}`,
      providesTags: (result, error, uid) => [{type: 'Users', id: uid}]
    }),
    setNewUser: builder.mutation({
      query: user => ({
        url: `users`,
        body: {...user},
        method: 'POST'
      }),
      invalidatesTags: [{type: 'Users', id: 'List'}]
      // transformResponse: response => response.data,
    }),
    updateUser: builder.mutation({
      query: user => ({
        url: `users/${user.id}`,
        method: 'PATCH',
        body: user
      }),
      invalidatesTags: (result, error, user) => [{type: 'Users', id: user.id}]
    }),
    deleteUser: builder.mutation({
      query: id => ({
        url: `users/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result, error, id) => [{type: 'Users', id}]
    })
  })
})

window.listApi = listApi;

export const { 
  useGetUsersQuery,
  useGetUserByIdQuery, 
  useSetNewUserMutation, 
  useDeleteUserMutation,
  useUpdateUserMutation
} = listApi;