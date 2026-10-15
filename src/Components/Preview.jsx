import React from "react";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { saveProductAPI, allproductsAPI } from '../Services/allAPI';
import { toast } from 'react-toastify';


function Preview({product,setProduct}) {
  const handleClear = () => {
  setProduct({
    productName: '',
    SKU: '',
    category: '',
    supplier: '',
    purchasePrice: '',
    sellingPrice: '',
    stockQuantity: '',
    minimumStockLevel: '',
    description: ''
  });
  }

  const handleAddProduct = async()=>{
    const {productName,SKU,category,supplier,purchasePrice,sellingPrice,stockQuantity,minimumStockLevel,description}=product
    if(productName && SKU && category && supplier && purchasePrice && sellingPrice && stockQuantity && minimumStockLevel && description){
      if(minimumStockLevel>stockQuantity){
        alert('minimum Stock Level is greater than Stock Quantity')
      }
      const allproducts = await allproductsAPI()
      console.log(allproducts)
      const result = allproducts.data.find((item)=>item.productName == product.productName)
      if(result == undefined){
      const response = await saveProductAPI(product)
      console.log(response)
       if (response.status == "201") {
        toast.success("resume added successfully")
        }
       }else{
          alert('This product already exist')
       }
      }
        else {
      toast.info("Please fill missing fields")
    }
  }
  return (
    <>
      <div className="d-flex flex-column w-100 h-100">
        <div >

        {/* Name */}
        <h2 className="mb-4">Product: {product?.productName}</h2>

        {/* Contact Details */}
        <p className="fs-6 lh-1 mb-4">
          SKU: {product?.SKU}
        </p>

        <p className="fs-6 lh-1 mb-4">
          Category: {product?.category}
        </p>

        <p className="fs-6 lh-1 mb-4">
          Supplier: {product?.supplier}
        </p>

        <p className="fs-6 lh-1 mb-4">
          Purchase Price: {product?.purchasePrice}
        </p>

        <p className="fs-6 lh-1 mb-4">
          Selling Price: {product?.sellingPrice}
        </p>
        <p className="fs-6 lh-1 mb-4">
          Stock Quantity: {product?.stockQuantity}
        </p>
        <p className="fs-6 lh-1 mb-4">
          Minimum Stock Level: {product?.minimumStockLevel}
        </p>

        <Divider className="bg-dark my-3" />

        {/* Professional Summary */}
        <h4>Description</h4>

        <p>
          {product?.description}
        </p>

</div>
<div className="d-flex justify-content-end gap-2 mt-auto pt-4">
      {/* Buttons */}
            <div className="d-flex justify-content-end gap-2 mt-4">

              <button onClick={handleClear} type="button" className="btn btn-light border">
                Cancel
              </button>

              <button onClick={handleAddProduct} type="submit" className="btn btn-primary px-4">
                Add Product
              </button>

            </div>
        </div>
      </div>
    </>
  );
}

export default Preview;