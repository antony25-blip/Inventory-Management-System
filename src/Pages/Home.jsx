import React, { useEffect, useState } from 'react'
import Offcanvas from '../Components/OffCanvasHome'
import { allproductsAPI } from '../Services/allAPI'
import { allSalesAPI } from '../Services/allAPI'

function Home() {

  const cardStyle = {
    background: "rgba(227, 227, 227, 0.12)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: "1px solid rgba(255, 255, 255, 0.5)",
    borderRadius: "15px",
    color: " rgb(38, 49, 130)",
    boxShadow: "0 8px 30px rgba(119, 117, 117, 0.25)",
    textShadow: "0 2px 5px rgba(0, 0, 0, 0.5)"
  }
  const [products, setProducts] = useState([])
  const [sales, setSales] = useState(0)

  const totalStock = products.reduce(
    (total, product) => total + Number(product.stockQuantity || 0),
    0
  )


  useEffect(() => {
    getAllProducts()
    getAllSales()
  }, [])

  const getAllProducts = async () => {
    const response = await allproductsAPI()
    console.log(response)
    setProducts(response.data)
  }

  const getAllSales = async () => {
    try {
      const response = await allSalesAPI()

      console.log("Sales response:", response.data)

      // Ensure the response is an array
      const salesData = Array.isArray(response.data)
        ? response.data
        : []

      const total = salesData.reduce(
        (sum, sale) =>
          sum +
          Number(sale.sellingPrice || 0) *
          Number(sale.quantitySold || 0),
        0
      )

      setSales(total)
    } catch (error) {
      console.error("Error fetching sales:", error)
    }
  }

  return (
    <div className="min-vh-100 position-relative overflow-hidden">

      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="position-fixed top-0 start-0 w-100 h-100 object-fit-cover"
        style={{
          zIndex: -2,
          opacity: 0.28
        }}
      >
        <source
          src="https://cdn.dribbble.com/userupload/17606000/file/original-41a723a4ab8fca212732e679016bdeba.mp4"
          type="video/mp4"
        />
      </video>

      {/* Light overlay */}
      <div
        className="position-fixed top-0 start-0 w-100 h-100"
        style={{
          background: "rgba(255, 255, 255, 0.25)",
          zIndex: -1
        }}
      ></div>


      {/* Header */}
      <div className="position-relative d-flex align-items-center bg-white bg-opacity-75 border-bottom p-3">

        <Offcanvas />

        <h1 className="position-absolute start-50 translate-middle-x m-0 fw-bold">
          INVENTORY MANAGEMENT
        </h1>

      </div>


      {/* Dashboard */}
      <div className="container-fluid px-5 pt-5">

        <h2 className="fw-bold">
          Dashboard
        </h2>

        <h4 className="fw-normal">
          Manage your products, stock and sales
        </h4>


        {/* Cards */}
        <div className="row justify-content-center g-4 mt-5">

          {/* Products */}
          <div className="col-12 col-md-4 col-lg-3">

            <div
              style={cardStyle}
              className="text-center p-4"
            >
              <h4 className="mb-3">
                📦  Products
              </h4>
              <h2 className="fw-bold mb-0">
                {products.length}
              </h2>

              <p className="mb-0 mt-2">
                Total products in inventory
              </p>
            </div>

          </div>


          {/* Stock */}
          <div className="col-12 col-md-4 col-lg-3">
            <div
              style={cardStyle}
              className="text-center p-4"
            >
              <h4 className="mb-3">
                📊 Stock
              </h4>

              <h2 className="fw-bold mb-0">
                {totalStock}
              </h2>

              <p className="mb-0 mt-2">
                Total available units
              </p>
            </div>
          </div>


          {/* Sales */}
          <div className="col-12 col-md-4 col-lg-3">

            <div
              style={cardStyle}
              className="text-center p-4"
            >
              <h4 className="mb-3">
                💰 Sales
              </h4>

              <h2 className="fw-bold mb-0">
                ₹{sales.toLocaleString('en-IN')}
              </h2>

              <p className="mb-0 mt-2">
                Total sales revenue
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Home