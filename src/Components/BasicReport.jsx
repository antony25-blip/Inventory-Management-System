import React from 'react'

function BasicReport({ products, sales }) {
    // console.log("Products in BasicReport:", products);
    // console.log("Sales in BasicReport:", sales);

    const totalRevenue = sales.reduce((total, sale) => total + Number(sale.totalAmount), 0)
    const totalSales = sales.length
    const itemsSold = sales.reduce((total, sale) => total + Number(sale.quantitySold), 0)

    const lowStockProducts = products.filter(product => Number(product.stockQuantity) < Number(product.minimumStockLevel))
    const lowStock = lowStockProducts.length

    const outOfStockProducts = products.filter(product => Number(product.stockQuantity) === 0)
    const outOfStock = outOfStockProducts.length
    return (
        <div>

            

            {/* Summary Cards */}
            <div className="row g-3 bg-info bg-opacity-10 p-3 rounded-3">

                {/* Total Revenue */}
                <div className="col-xl-3 col-md-6">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body">

                            <p className="text-muted mb-2">
                                Total Revenue
                            </p>

                            <h3 className="fw-bold mb-1">
                                ₹{totalRevenue.toLocaleString('en-IN', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                })}
                            </h3>

                            <small className="text-muted">
                                From {totalSales} sales
                            </small>

                        </div>
                    </div>
                </div>


                {/* Total Sales */}
                <div className="col-xl-3 col-md-6">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body">

                            <p className="text-muted mb-2">
                                Total Sales
                            </p>

                            <h3 className="fw-bold mb-1">
                                {totalSales}
                            </h3>

                            <small className="text-muted">
                                Sales transactions
                            </small>

                        </div>
                    </div>
                </div>


                {/* Items Sold */}
                <div className="col-xl-3 col-md-6">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body">

                            <p className="text-muted mb-2">
                                Items Sold
                            </p>

                            <h3 className="fw-bold mb-1">
                                {itemsSold.toLocaleString('en-IN')}
                            </h3>

                            <small className="text-muted">
                                Total quantity sold
                            </small>

                        </div>
                    </div>
                </div>


                {/* Low Stock */}
                <div className="col-xl-3 col-md-6">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body">

                            <p className="text-muted mb-2">
                                Low Stock
                            </p>

                            <h3 className="fw-bold mb-1">
                                {lowStock}
                            </h3>

                            <small className="text-danger">
                                {outOfStock} products out of stock
                            </small>

                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default BasicReport
