import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import {updateProductAPI} from '../Services/allAPI' 

function UpdateProduct({ product, show, onClose, refreshProducts }) {

  const [formData, setFormData] = useState({
    productId:"",
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

  // Load existing product values
  useEffect(() => {

    if (product) {
      setFormData({
        productId:product.id,
        productName: product.productName || "",
        SKU: product.SKU || "",
        category: product.category || "",
        supplier: product.supplier || "",
        purchasePrice: product.purchasePrice || "",
        sellingPrice: product.sellingPrice || "",
        stockQuantity: product.stockQuantity || "",
        minimumStockLevel: product.minimumStockLevel || "",
        description: product.description || ""
      })
    }

  }, [product])


  const handleChange = (e) => {

    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value
    })
  }


  const handleUpdate = async () => {
    // Your update API will go here
    const response= await updateProductAPI(formData.productId,formData)
    console.log(response)
    if (response.status === 200) {

            alert("Product updated successfully")

            // Get latest products from API
            await refreshProducts()

            // Close modal
            onClose()
        }

  }


  return (
    <Modal show={show} onHide={onClose} centered size="lg">

      <Modal.Header closeButton>
        <Modal.Title>Update Product</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="row">
          {/* Product Name */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Product Name</label>
            <input type="text" name="productName" value={formData.productName} onChange={handleChange} className="form-control"/>
          </div>


          {/* SKU */}
          <div className="col-md-6 mb-3">
            <label className="form-label">SKU</label>
            <input type="text" name="SKU" value={formData.SKU} onChange={handleChange} className="form-control"/>
          </div>


          {/* Category */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Category</label>

            <select name="category" value={formData.category} onChange={handleChange} className="form-select">
              <option value="">Select Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Accessories">Accessories</option>
              <option value="Clothing">Clothing</option>
            </select>
          </div>


          {/* Supplier */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Supplier</label>
            <input type="text" name="supplier" value={formData.supplier} onChange={handleChange} className="form-control"/>
          </div>


          {/* Purchase Price */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Purchase Price</label>
            <input type="number" name="purchasePrice" value={formData.purchasePrice} onChange={handleChange} className="form-control"/>
          </div>


          {/* Selling Price */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Selling Price</label>
            <input type="number" name="sellingPrice" value={formData.sellingPrice} onChange={handleChange} className="form-control"/>
          </div>


          {/* Stock Quantity */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Stock Quantity</label>
            <input type="number" name="stockQuantity" value={formData.stockQuantity} onChange={handleChange} className="form-control"/>
          </div>


          {/* Minimum Stock */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Minimum Stock Level</label>
            <input type="number" name="minimumStockLevel" value={formData.minimumStockLevel} onChange={handleChange} className="form-control"/>
          </div>


          {/* Description */}
          <div className="col-12 mb-3">
            <label className="form-label">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} className="form-control" rows="3"/>
          </div>

        </div>

      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button variant="primary" onClick={handleUpdate}>Update Product</Button>
      </Modal.Footer>

    </Modal>
  )
}

export default UpdateProduct