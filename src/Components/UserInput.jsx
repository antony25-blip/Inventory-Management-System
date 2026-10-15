import React, { useState } from 'react'

function UserInput({product,setProduct}) {
    console.log(product)
  return (
    <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          <form>
            {/* Product Details */}
            <h5 className="fw-bold mb-3">Product Details</h5>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Product Name</label>
                
                <input value={product.productName} onChange={e => setProduct({ ...product, productName: e.target.value })} id="standard-basic-Pname"  type="text" className="form-control" placeholder="Enter product name"/>
    
              </div>

              <div className="col-md-6">
                <label className="form-label">SKU</label>
                <input value={product.SKU} onChange={e => setProduct({ ...product, SKU: e.target.value })} id="standard-basic-SKU" type="text" className="form-control" placeholder="Enter SKU"/>
              </div>

              <div className="col-md-6">
                <label className="form-label">Category</label>
                <select defaultValue={''} onChange={e => setProduct({ ...product, category: e.target.value })}  id="demo-simple-select-category" className="form-select">
                  <option>Select category</option>
                  <option>Electronics</option>
                  <option>Accessories</option>
                  <option>Clothing</option>
                  <option>Food</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Supplier</label>
                <select defaultValue={''} onChange={e => setProduct({ ...product, supplier: e.target.value })}  id="demo-simple-select-supplier" className="form-select">
                  <option>Select supplier</option>
                  <option>ABC Suppliers</option>
                  <option>Global Traders</option>
                  <option>Tech World</option>
                </select>
              </div>

            </div>

            <hr className="my-4" />

            {/* Pricing & Stock */}
            <h5 className="fw-bold mb-3">Pricing & Stock</h5>

            <div className="row g-3">

              <div className="col-md-4">
                <label className="form-label">Purchase Price</label>
                <input value={product.purchasePrice} onChange={e => setProduct({ ...product, purchasePrice: e.target.value })} id="standard-basic-purchasePrice" type="number" className="form-control" placeholder="₹ 0.00"/>
              </div>

              <div className="col-md-4">
                <label className="form-label">Selling Price</label>
                <input value={product.sellingPrice} onChange={e => setProduct({ ...product, sellingPrice: e.target.value })} id="standard-basic-sellingPrice" type="number" className="form-control" placeholder="₹ 0.00"/>
              </div>

              <div className="col-md-4">
                <label className="form-label">Stock Quantity</label>
                <input value={product.stockQuantity} onChange={e => setProduct({ ...product, stockQuantity: e.target.value })} id="standard-basic-stockQuantity" type="number" className="form-control" placeholder="Enter quantity"/>
              </div>

              <div className="col-md-4">
                <label className="form-label">Minimum Stock Level</label>
                <input value={product.minimumStockLevel} onChange={e => setProduct({ ...product, minimumStockLevel: e.target.value })} id="standard-basic-minStockLevel" type="number" className="form-control" placeholder="Example: 10"/>
              </div>

            </div>

            <hr className="my-4" />

            {/* Description */}
            <h5 className="fw-bold mb-3">Additional Information</h5>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea value={product.description} onChange={e => setProduct({ ...product, description: e.target.value })} id="standard-basic-description" className="form-control" rows="4" placeholder="Enter product description"></textarea>
            </div>

            

          </form>

        </div>
    </div>
  )
}

export default UserInput
