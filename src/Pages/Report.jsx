import React,{useState,useEffect} from 'react'
import { allproductsAPI }from '../Services/allAPI'
import { allSalesAPI }from '../Services/allAPI'
import BasicReport from '../Components/BasicReport'
import SalesRevenue from '../Components/SalesRevenue'
import TopSellingProducts from '../Components/TopSellingProducts'
import OffcanvasHome from '../Components/OffCanvasHome'

function Report() {
    const [products, setProducts] = React.useState([])
    const [sales, setSales] = React.useState([])

    const getReportData = async () => {
        try {
            const productResponse =await allproductsAPI()
            //console.log("Products data:", productResponse);
            if(productResponse.status === 200){
                setProducts(productResponse.data)
            }

            const salesResponse = await allSalesAPI()
            //console.log("Sales data:", salesResponse);
            if(salesResponse.status === 200){
                setSales(salesResponse.data)
            }
        } catch (error) {
            console.error("Error fetching report data:", error);
        }
    }

    useEffect(() => {
        getReportData()
    }, [])
  return (
    <div className="container-fluid py-4">
            <div className="position-relative d-flex align-items-center bg-white bg-opacity-75 ">

        <OffcanvasHome />

        <h2 className="fw-bold mb-1">Report</h2>

      </div>
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>
                    <p className="text-muted mb-0">
                        Overview of your sales and inventory
                    </p>
                </div>
            

        </div>
        <BasicReport products={products} sales={sales}/>
        <SalesRevenue sales={sales} />
        <TopSellingProducts sales={sales} />

    </div>
  )
}

export default Report
