import { useState } from "react"
import { useAddProductMutation, useDeleteProductMutation, useGetFoodsQuery } from "./redux"

function App() {
  const [limit, setLimit] = useState('')
  const [product, setProduct] = useState('')
  const { data = [], isLoading, isError, error } = useGetFoodsQuery(limit)
  const [ addProduct, { isError: ProductIsError, error: ProductError } ] = useAddProductMutation()
  const [ deleteProduct ] = useDeleteProductMutation()

  const handleAddProduct = async () => {
    if (product.trim()) {
      try {
        const payload = await addProduct({name: product}).unwrap()
        console.log('fulfilled', payload)
      } catch (error) {
        console.log('rejected', error)
      }
    }

    setProduct('')
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center mt-8">
        <h2 className="text-red-500">{error}</h2>
      </div>
    )
  }

  if (ProductIsError) {
    return (
      <div className="flex justify-center items-center mt-8">
        <h2 className="text-red-500">{ProductError}</h2>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-8">
        <h2>Loading...</h2>
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-5 mt-2">
        <div className="flex flex-col gap-4">
          <input 
            type="text"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            placeholder="Enter product name"
            className="border-2 border-slate-300 outline-none text-xl px-4 py-2"
          />

          <button 
            type="button"
            className="bg-green-400 p-2"
            onClick={() => handleAddProduct()}
          >
            Add Product
          </button>
        </div>

        <div>
          <select value={limit} onChange={(e) => setLimit(e.target.value)}>
            <option value="''">all</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
        </div>

        <div className="flex flex-col justify-center items-center gap-2 bg-slate-300 py-3">
          {data.map(item => {
            return (
              <div key={item.id} className="flex flex-col items-center grow-0 flex-shrink-0 basis-auto px-3">
                <div className="flex gap-2">
                  <span className="flex items-end">{item.name}</span>
                  <div className="w-10 border-b border-black border-dashed"></div>
                  <button onClick={() => deleteProduct(item.id)} type="button" className="bg-white border-2 border-slate-700 px-2">Remove</button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default App
