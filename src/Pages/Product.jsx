import React, { useEffect, useState } from 'react';
import { allproductsAPI } from '../Services/allAPI';
import { deleteProductAPI } from '../Services/allAPI';
import Preview from '../Components/Preview';
import UpdateProduct from '../Components/UpdateProduct';
import { Link } from 'react-router-dom'
import OffcanvasHome from '../Components/OffCanvasHome';

function Product() {

    const [products, setProducts] = useState([])
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [showUpdate, setShowUpdate] = useState(false)

    const [searchKey, setSearchKey] = useState("")
const [selectedCategory, setSelectedCategory] = useState("All Categories")
const [selectedStock, setSelectedStock] = useState("All Stock")

    useEffect(() => {
        getAllProduct()
    }, [])

    const getAllProduct = async () => {
        const response = await allproductsAPI()
        //console.log(response)
        if (response.status == 200) {
            setProducts(response.data)
        } else {
            alert('something went wrong')
        }

    }
    console.log(products)

    const handleEdit = (product) => {
        setSelectedProduct(product)
        setShowUpdate(true)
    }

    const handleDelete = async(product) => {
        if (confirm(`Are you sure you want to delete ${product.productName}?`)) {
                try{
                    const response = await deleteProductAPI(product.id)
                    console.log('Delete response:', response)
                    if (response.status === 200) {
                        alert('Product deleted successfully')
                        getAllProduct() // Refresh the product list after deletion
                    } else {
                        alert('Failed to delete product')
                    }
                }
                catch(error){
                    console.error('Error deleting product:', error)
                    alert('An error occurred while deleting the product')
                }
        }}


    const filteredProducts = products.filter((product) => {

    // Search by product name or SKU
    const matchesSearch =
        (product.productName || "")
            .toLowerCase()
            .includes(searchKey.toLowerCase()) ||
        (product.SKU || "")
            .toLowerCase()
            .includes(searchKey.toLowerCase())

    // Filter by category
    const matchesCategory =
        selectedCategory === "All Categories" ||
        product.category === selectedCategory

    // Filter by stock status
    const stock = Number(product.stockQuantity || 0)
    const minimumStock = Number(product.minimumStockLevel || 0)

    const matchesStock =
        selectedStock === "All Stock" ||
        (selectedStock === "In Stock" && stock > minimumStock) ||
        (selectedStock === "Low Stock" &&
            stock > 0 && stock <= minimumStock) ||
        (selectedStock === "Out of Stock" && stock <= 0)

    return matchesSearch && matchesCategory && matchesStock
})

    return (
        <div className="container-fluid p-4">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <div className="position-relative d-flex align-items-center bg-white bg-opacity-75 ">

        <OffcanvasHome />

        <h2 className="fw-bold mb-1">Products</h2>

      </div>
      {/* Header */}
                    <p className="text-muted mb-0">Manage your products and inventory</p>
                </div>
                <Link to="/admin/addproduct" >
                <button className="btn btn-primary">+ Add Product</button>
                </Link>
            </div>


{/* Search & Filter */}
<div className="card border-0 shadow-sm mb-4">
    <div className="card-body">
        <div className="row g-3">

            {/* Search Products */}
            <div className="col-12 col-md-6">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by product name or SKU..."
                    value={searchKey}
                    onChange={(e) => setSearchKey(e.target.value)}
                />
            </div>

            {/* Category Filter */}
            <div className="col-12 col-md-3">
                <select
                    className="form-select"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="All Categories">
                        All Categories
                    </option>
                    <option value="Electronics">Electronics</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Clothing">Clothing</option>
                </select>
            </div>

            {/* Stock Filter */}
            <div className="col-12 col-md-3">
                <select
                    className="form-select"
                    value={selectedStock}
                    onChange={(e) => setSelectedStock(e.target.value)}
                >
                    <option value="All Stock">All Stock</option>
                    <option value="In Stock">In Stock</option>
                    <option value="Low Stock">Low Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                </select>
            </div>

        </div>
    </div>
</div>

            {/* Product Table */}
            <div className="card border-0 shadow-sm">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table align-middle">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Product</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Stock</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredProducts.map((product) => (

                                    <tr key={product.id}>

                                        <td>{product.id}</td>

                                        <td>
                                            <div className="fw-semibold">
                                                {product.productName}
                                            </div>
                                            <small className="text-muted">
                                                SKU-{product.SKU}001
                                            </small>
                                        </td>

                                        <td>{product.category}</td>

                                        <td>₹{product.sellingPrice.toLocaleString()}</td>

                                        <td>{product.stockQuantity}</td>

                                        <td>
                                            {Number(product.stockQuantity) > Number(product.minimumStockLevel) ? (
                                                <span className="badge bg-success-subtle text-success">
                                                    In Stock
                                                </span>
                                            ) : Number(product.stockQuantity) > 0 ? (
                                                <span className="badge bg-warning-subtle text-warning">
                                                    Low Stock
                                                </span>
                                            ) : (
                                                <span className="badge bg-danger-subtle text-danger">
                                                    Out of Stock
                                                </span>
                                            )}
                                        </td>

                                        <td>
                                            <button onClick={() => handleEdit(product)} className="btn btn-sm btn-outline-primary me-2">
                                                Edit
                                            </button>
                                            <button onClick={() => handleDelete(product)} className="btn btn-sm btn-outline-danger">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>

                                ))}

                            </tbody>

                        </table>
                        {selectedProduct && (
                            <UpdateProduct
                                product={selectedProduct}
                                show={showUpdate}
                                onClose={() => setShowUpdate(false)}
                                refreshProducts={getAllProduct}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;