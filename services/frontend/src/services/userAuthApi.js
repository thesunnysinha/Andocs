import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userAuthApi = createApi({
  reducerPath: "userAuthApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/api/user/" }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (user) => {
        return {
          url: "register/",
          method: "POST",
          body: user,
        };
      },
    }),
    verifyUser: builder.mutation({
      query: (user) => {
        return {
          url: "verify/",
          method: "POST",
          body: user,
        };
      },
    }),
    login: builder.mutation({
      query: (user) => {
        return {
          url: "login/",
          method: "POST",
          body: user,
        };
      },
    }),
    googleLogin: builder.mutation({
      query: () => {
        return {
          url: "google-login/",
          method: "GET",
        };
      },
    }),
    userDetail: builder.query({
      query: (access_token) => {
        return {
          url: "profile/",
          method: "GET",
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    userEditProfile: builder.mutation({
      query: (paramas) => {
        return {
          url: "edit-profile/",
          method: "PUT",
          body: paramas.profile,
          headers: {
            Authorization: `Bearer ${paramas.access_token}`,
          },
        };
      },
    }),
    userAddress: builder.query({
      query: (access_token) => {
        return {
          url: "address/",
          method: "GET",
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    userAddAddress: builder.mutation({
      query: (paramas) => {
        return {
          url: "add_address/",
          method: "POST",
          body: paramas.address,
          headers: {
            Authorization: `Bearer ${paramas.access_token}`,
          },
        };
      },
    }),
    userDeleteAddress: builder.mutation({
      query: (paramas) => {
        return {
          url: `delete_address/${paramas.address_id}/`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${paramas.access_token}`,
          },
        };
      },
    }),
    userEditAddress: builder.mutation({
      query: (paramas) => {
        return {
          url: `edit_address/${paramas.address_id}/`,
          method: "PUT",
          body: paramas.address,
          headers: {
            Authorization: `Bearer ${paramas.access_token}`,
          },
        };
      },
    }),
    userOrders: builder.query({
      query: (paramas) => {
        return {
          url: "orders/",
          method: "GET",
          headers: {
            Authorization: `Bearer ${paramas.access_token}`,
          },
        };
      },
    }),
    userOrderDetail: builder.query({
      query: (paramas) => {
        return {
          url: `order_detail/${paramas.order_id}/`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${paramas.access_token}`,
          },
        };
      },
    }),
    userCreateOrder: builder.mutation({
      query: (paramas) => {
        return {
          url: "create_order/",
          method: "POST",
          body: paramas.order,
          headers: {
            Authorization: `Bearer ${paramas.access_token}`,
          },
        };
      },
    }),
    userAddProductComment: builder.mutation({
      query: (params) => {
        return {
          url: `add_comment/${params.product_id}/`,
          method: "POST",
          body: params.comment,
          headers: {
            Authorization: `Bearer ${params.access_token}`,
          },
        };
      },
    }),
    userEditProductComment: builder.mutation({
      query: (paramas) => {
        return {
          url: `edit_comment/${paramas.comment_id}/`,
          method: "PUT",
          body: paramas.comment,
          headers: {
            Authorization: `Bearer ${paramas.access_token}`,
          },
        };
      },
    }),
    changeUserPassword: builder.mutation({
      query: (paramas) => {
        return {
          url: "changepassword/",
          method: "POST",
          body: paramas.actualData,
          headers: {
            Authorization: `Bearer ${paramas.access_token}`,
          },
        };
      },
    }),
    sendPasswordResetEmail: builder.mutation({
      query: (paramas) => {
        return {
          url: "send-reset-password-email/",
          method: "POST",
          body: paramas.user,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
    resetPassword: builder.mutation({
      query: (paramas) => {
        return {
          url: `reset-password/${paramas.id}/${paramas.token}/`,
          method: "POST",
          body: paramas.actualData,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
    fetchCart: builder.query({
      query: (access_token) => {
        return {
          url: "cart/",
          method: "GET",
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    addProductToCart: builder.mutation({
      query: (params) => {
        return {
          url: `add_to_cart/${params.id}/`,
          method: "POST",
          headers: {
            Authorization: `Bearer ${params.access_token}`,
          },
        };
      },
    }),
    updateProductInCart: builder.mutation({
      query: (paramas) => {
        return {
          url: `update_product_quantity/${paramas.id}/${paramas.qk}/`,
          method: "POST",
          headers: {
            Authorization: `Bearer ${paramas.access_token}`,
          },
        };
      },
    }),
    deleteProductFromCart: builder.mutation({
      query: (paramas) => {
        return {
          url: `delete_product_from_cart/${paramas.id}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${paramas.access_token}`,
          },
        };
      },
    }),

    fetchWishlist: builder.query({
      query: (access_token) => {
        return {
          url: "wishlist/",
          method: "GET",
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    addProductToWishlist: builder.mutation({
      query: (params) => {
        return {
          url: `add_to_wishlist/${params.id}/`,
          method: "POST",
          headers: {
            Authorization: `Bearer ${params.access_token}`,
          },
        };
      },
    }),
    deleteProductFromWishlist: builder.mutation({
      query: (paramas) => {
        return {
          url: `delete_product_from_wishlist/${paramas.id}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${paramas.access_token}`,
          },
        };
      },
    }),
  }),
});
export const {
  useRegisterMutation,
  useVerifyUserMutation,
  useLoginMutation,

  useUserDetailQuery,
  useUserEditProfileMutation,

  useChangeUserPasswordMutation,
  useSendPasswordResetEmailMutation,
  useResetPasswordMutation,

  useGoogleLoginMutation,
  useFetchCartQuery,
  useAddProductToCartMutation,
  useDeleteProductFromCartMutation,
  useUpdateProductInCartMutation,

  useUserAddressQuery,
  useUserAddAddressMutation,
  useUserDeleteAddressMutation,
  useUserEditAddressMutation,

  useUserOrdersQuery,
  useUserOrderDetailQuery,
  useUserCreateOrderMutation,

  useUserAddProductCommentMutation,
  useUserEditProductCommentMutation,

  useAddProductToWishlistMutation,
  useFetchWishlistQuery,
  useDeleteProductFromWishlistMutation,
} = userAuthApi;
