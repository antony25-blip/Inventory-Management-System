import { React, useState } from 'react'
import UserInput from '../Components/UserInput'
import Preview from '../Components/Preview'
import OffcanvasHome from '../Components/OffCanvasHome'

function AddProduct() {
  const [product, setProduct] = useState({
    productName: "",
    SKU: "",
    category: "",
    supplier: "",
    purchasePrice: "",
    sellingPrice: "",
    stockQuantity: "",
    minimumStockLevel: "",
    description: ""
  })
  return (
    <div className="container-fluid p-4">
     <div className="position-relative d-flex align-items-center bg-white bg-opacity-75 ">

        <OffcanvasHome />

        <h2 className="fw-bold mb-1">Add Product</h2>

      </div>
      {/* Header */}

      <div className="mb-4">
        
        <p className="text-muted ms-3">
          Add a new product to your inventory
        </p>
      </div>
      <div className='row'>
        <div className='col-6'>
          <UserInput product={product} setProduct={setProduct} />
        </div>
        <div className='col-6'>
          {product.productName && (
            <Preview product={product} setProduct={setProduct} />
          )}
        </div>

      </div>
    </div>
  )
}

export default AddProduct