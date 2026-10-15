import apiService from "../api/apiService";

// Save product
export const saveProductAPI = async (productDetails) => {
  return await apiService("POST", "/products", productDetails);
};


// All product
export const allproductsAPI = async () => {
  return await apiService("GET", "/products",{});
};

// update product
export const updateProductAPI = async(productId,productDetails)=>{
  return await apiService('PUT',`/products/${productId}`,productDetails)
}

// delete product
export const deleteProductAPI = async(productId)=>{
  return await apiService('DELETE',`/products/${productId}`,{})
}



 // Add sale
export const addSaleAPI = async (saleData) => {
  return await apiService("POST", "/sales", saleData);
};

// Get all sales
export const allSalesAPI = async () => {
  return await apiService("GET", "/sales", {});
};
