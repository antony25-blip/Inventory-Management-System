import React from 'react'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts'


function SalesRevenue({sales}) {
    const revenueByDate = sales.reduce((acc, sale) => {

        const date = new Date(sale.saleDate).toLocaleDateString('en-IN')

        if (!acc[date]) {
            acc[date] = 0
        }

        acc[date] += Number(sale.totalAmount)

        return acc

    }, {})
    const chartData = Object.entries(revenueByDate).map(
    ([date, revenue]) => ({
        date,
        revenue
    })
)

console.log("Chart data:", chartData)

  return (
    <div>
       <div className="card border-0 shadow-sm mt-4 bg-warning bg-opacity-25">

            <div className="card-body">

                <h5 className="fw-bold mb-1">
                    Sales & Revenue
                </h5>

                <p className="text-muted mb-4">
                    Revenue generated over time
                </p>


                <div style={{ width: "100%", height: "350px" }}>

                    <ResponsiveContainer width="100%" height="100%">

                        <LineChart data={chartData}>

                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis dataKey="date" />

                            <YAxis />

                            <Tooltip
                                formatter={(value) =>
                                    `₹${Number(value).toLocaleString('en-IN')}`
                                }
                            />

                            <Line
                                type="monotone"
                                dataKey="revenue"
                                stroke="#0d6efd"
                                strokeWidth={3}
                                dot={{ r: 4 }}
                            />

                        </LineChart>

                    </ResponsiveContainer>

                </div>

            </div>

        </div>
    </div>
  )
}

export default SalesRevenue
