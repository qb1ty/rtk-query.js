import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const foodsApi = createApi({
    reducerPath: 'foodsApi',
    tagTypes: ['Products'],
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3000/'}),
    endpoints: (builder) => ({
        getFoods: builder.query({
            query: (limit = '') => `foods?${limit && `_limit=${limit}`}`,
            providesTags: (result) => result ? [...result.map(({ id }) => ({ type: 'Products', id })), 'Products'] : ['Products']
        }),
        addProduct: builder.mutation({
            query: (body) => ({
                url: 'foods',
                method: 'POST',
                body: body
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Products', id: arg.id }]
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `foods/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (res, err, arg) => [{ type: 'Products', id: arg.id }]
        })
    })
})

export const { useGetFoodsQuery, useAddProductMutation, useDeleteProductMutation } = foodsApi