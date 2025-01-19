import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "./apiConfig";

export const fetchProduct = createApi({
  reducerPath: "fetchProduct",
  baseQuery: fetchBaseQuery({ baseUrl: `${API_BASE_URL}/api/` }),
  endpoints: (builder) => ({
    fetchProducts: builder.mutation({
      query: (paramas) => ({
        url: `products?category=${paramas.category}`,
        method: "GET",
      }),
    }),

    fetchProductDetail: builder.query({
      query: (id) => {
        const url = `product/${id}/`;
        return {
          url,
          method: "GET",
        };
      },
    }),
    fetchProductComment: builder.query({
      query: (id) => {
        const url = `comments/${id}/`;
        return {
          url,
          method: "GET",
        };
      },
    }),
    fetchProductRecommendation: builder.query({
      query: (paramas) => {
        const url = `product_recommendation/`;
        return {
          url,
          method: "GET",
          headers: {
            authorization: `Bearer ${paramas.access_token}`,
          },
        };
      },
    }),
  }),
});

export const {
  useFetchProductsMutation,
  useFetchProductDetailQuery,
  useFetchProductCommentQuery,
  useFetchProductRecommendationQuery,
} = fetchProduct;
