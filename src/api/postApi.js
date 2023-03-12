import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const postApi = createApi({
  reducerPath: "postApi-reducer",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api",
  }),
  tagTypes: ["post"],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/",
      providesTags: (res) => {
        console.log("providesTags", res);
        return res
          ? [
              { type: "post", id: "LIST" },
              res.map(({ id }) => ({ type: "post", id })),
            ]
          : [{ type: "post", id: "LIST" }];
      },
    }),
    getPostById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (res, err, id) => {
        const corectId = Number(id) + 1;
        console.log("single post", corectId);
        return [{ type: "post", id: corectId }];
      },
    }),
    addPost: builder.mutation({
      query: (body) => ({
        url: "/",
        method: "post",
        body,
      }),
      invalidatesTags: (res, err, arr) => {
        console.log("invalidate", res);
        return res
          ? [{ type: "post", id: res.data.id }]
          : [{ type: "post", id: "LIST" }];
      },
    }),
    editPost: builder.mutation({
      query: (data) => {
        const { urlId: id, ...body } = data;
        return {
          url: `/${id}`,
          method: "put",
          body,
        };
      },
      invalidatesTags: (result, err, { urlId }) => {
        const corectId = Number(urlId) + 1;
        console.log("invalidate single post", corectId);
        return [{ type: "post", id: corectId }];
      },
    }),
  }),
});

export const {
  useGetPostsQuery,
  useAddPostMutation,
  useGetPostByIdQuery,
  useEditPostMutation,
} = postApi;
export default postApi;
