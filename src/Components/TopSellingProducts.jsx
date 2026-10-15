import React from 'react'
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts'

function TopSellingProducts({ sales }) {

    const productSales = sales.reduce((acc, sale) => {

        const productName = sale.productName

        if (!acc[productName]) {
            acc[productName] = 0
        }

        acc[productName] += Number(sale.quantitySold)

        return acc

    }, {})

    const chartData = Object.entries(productSales).map(
    ([productName, quantity]) => ({
        productName,
        quantity
    })
    )
    const topProducts = chartData
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, 5)


    const COLORS = [
        '#0d6efd',
        '#20c997',
        '#ffc107',
        '#dc3545',
        '#6f42c1'
    ]


//console.log("Chart data:", chartData)

    return (
        <div className="card border-0 shadow-sm mt-4 bg-secondary bg-opacity-25">

            <div className="card-body">

                <h5 className="fw-bold mb-1">
                    Top Selling Products
                </h5>

                <p className="text-muted mb-0">
                    Products with the highest sales
                </p>

                <div style={{ width: "100%", height: "350px" }}>

                    <ResponsiveContainer width="100%" height="100%">

                        <PieChart>

                            <Pie
                                data={topProducts}
                                dataKey="quantity"
                                nameKey="productName"
                                cx="50%"
                                cy="50%"
                                outerRadius={120}

                            >

                                {topProducts.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}

                            </Pie>

                            <Tooltip />

                            <Legend />

                        </PieChart>

                    </ResponsiveContainer>

                </div>


            </div>

        </div>
    )
}

export default TopSellingProducts