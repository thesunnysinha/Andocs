import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "./apiConfig";

export const fetchProduct = createApi({
  reducerPath: "fetchProduct",
  baseQuery: fetchBaseQuery({ baseUrl: `${API_BASE_URL}/api/` }),
  endpoints: (builder) => ({
    fetchProducts: builder.query({
      query: (paramas) => ({
        url: `products/${paramas.category}/`,
        method: "GET",
      }),
    }),

    fetchProductDetail: builder.query({
      query: (id) => {
        const url = `product_details/${id}/`;
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
  useFetchProductsQuery,
  useFetchProductDetailQuery,
  useFetchProductCommentQuery,
  useFetchProductRecommendationQuery,
} = fetchProduct;
