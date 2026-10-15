import React, { useEffect, useState } from 'react';
import { allproductsAPI } from '../Services/allAPI';
import { Link } from 'react-router-dom'
import OffcanvasHome from '../Components/OffCanvasHome';
import { updateProductAPI } from '../Services/allAPI'
import { addSaleAPI } from '../Services/allAPI'


function Sale() {

    const [products, setProducts] = useState([])
    const [cart, setCart] = useState({})

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

    const handleIncrement = (product) => {
        const currentQuantity = cart[product.id] || 0
        if (currentQuantity >= Number(product.stockQuantity)) {
            alert("No more stock available")
            return
        }
        setCart({
            ...cart,
            [product.id]: currentQuantity + 1
        })
    }
    const handleDecrement = (product) => {
        const currentQuantity = cart[product.id] || 0
        if (currentQuantity <= 0) {
            return
        }
        setCart({
            ...cart,
            [product.id]: currentQuantity - 1
        })
    }


    const totalCost = products.reduce((total, product) => {
        const quantity = cart[product.id] || 0
        return total + (Number(product.sellingPrice) * quantity)
    }, 0)


    const handleCompleteSale = async () => {
        const selectedProducts = products.filter(
            product => (cart[product.id] || 0) > 0
        )

        if (selectedProducts.length === 0) {
            alert("Please select at least one product")
            return
        }

        // Validate stock before processing
        for (const product of selectedProducts) {
            const quantity = cart[product.id]

            if (quantity > Number(product.stockQuantity)) {
                alert(`Insufficient stock for ${product.productName}`)
                return
            }
        }

        try {
            // Save each selected product as a sales record
            for (const product of selectedProducts) {
                const quantity = cart[product.id]

                const saleData = {
                    productId: product.id,
                    productName: product.productName,
                    quantitySold: quantity,
                    sellingPrice: Number(product.sellingPrice),
                    totalAmount: Number(product.sellingPrice) * quantity,
                    saleDate: new Date().toISOString()
                }

                // POST: save the sale
                await addSaleAPI(saleData)

                // PUT/PATCH: update available stock
                const updatedProduct = {
                    ...product,
                    stockQuantity:
                        Number(product.stockQuantity) - quantity
                }

                await updateProductAPI(
                    product.id,
                    updatedProduct
                )
            }

            setCart({})
            await getAllProduct()

            alert("Sale completed successfully")
        } catch (error) {
            console.error("Error completing sale:", error)
            alert(
                "The sale could not be completed fully. Please check your sales and stock records before retrying."
            )
        }
    }



    const filteredProducts = products.filter((product) => {
    const search = searchKey.toLowerCase().trim()

    // Search by product name or SKU
    const matchesSearch =
        (product.productName || "").toLowerCase().includes(search) ||
        (product.SKU || "").toLowerCase().includes(search)

    // Filter by category
    const matchesCategory =
        selectedCategory === "All Categories" || product.category === selectedCategory

    // Filter by stock status
    const stock = Number(product.stockQuantity || 0)
    const minimumStock = Number(product.minimumStockLevel || 0)

    const matchesStock =
        selectedStock === "All Stock" ||
        (selectedStock === "In Stock" && stock > minimumStock) ||
        (selectedStock === "Low Stock" && stock > 0 && stock <= minimumStock) ||
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
                        <h2 className="fw-bold ">Sales Page</h2>

                    </div>
                    <p className="text-muted mb-0">Manage your products and inventory</p>
                </div>
            </div>


        
{/* Search & Filter */}
<div className="card border-0 shadow-sm ">
    <div className="card-body">
        <div className="row g-3">

            {/* Search */}
            <div className="col-12 col-md-6">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search products by name or SKU..."
                    value={searchKey}
                    onChange={(e) => setSearchKey(e.target.value)}
                />
            </div>

            {/* Category */}
            <div className="col-12 col-md-3">
                <select
                    className="form-select"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="All Categories">All Categories</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Clothing">Clothing</option>
                </select>
            </div>

            {/* Stock Status */}
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
                                            <button onClick={() => handleIncrement(product)} className="btn btn-sm btn-outline-primary">
                                                +
                                            </button>

                                            <span className="mx-3">
                                                {cart[product.id] || 0}
                                            </span>

                                            <button onClick={() => handleDecrement(product)} className="btn btn-sm btn-outline-danger">
                                                -
                                            </button>

                                        </td>
                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>
                    <div className="card border-0 shadow-sm ">
                        <div className="card-body d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">
                                Total Cost
                            </h5>
                            <h4 className="text-primary mb-0">
                                ₹{totalCost.toLocaleString()}
                            </h4>

                        </div>
                    </div>
                    <button
                        type="button"
                        className="btn btn-success px-4 fw-semibold"
                        onClick={handleCompleteSale}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Sale;
