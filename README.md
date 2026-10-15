# Inventory Management System

A web-based inventory management application built with React and Bootstrap to manage products, monitor stock levels, record sales, and generate sales reports.

## Overview

The Inventory Management System helps businesses manage their inventory efficiently through a centralized dashboard. Users can maintain product records, track available quantities, process sales, and view important business statistics.

The application provides an intuitive interface with product management, sales processing, inventory monitoring, and reporting features.

## Features

### Dashboard
- View the total number of products in inventory.
- Monitor total available stock units.
- Track total sales revenue.
- Navigate between different application modules.

### Product Management
- Add new products with product name, SKU, category, and supplier.
- Set purchase price and selling price.
- Define stock quantity and minimum stock level.
- Add product descriptions.
- Edit existing product details.
- Delete products when they are no longer required.
- Search products by name or SKU.
- Filter products by category and stock status.

### Inventory Management
- Monitor current stock quantities.
- Increase or decrease product quantities during sales processing.
- Identify low-stock products.
- Detect out-of-stock products.
- Maintain stock levels based on product sales.

### Sales Management
- Select products for sale.
- Increase or decrease the quantity of selected products.
- Calculate the total cost of selected items.
- Confirm sales transactions.
- Update inventory quantities after successful sales.
- Track sales transactions and quantities sold.

### Reports and Analytics
- Display total revenue generated.
- Track the number of sales transactions.
- Calculate the total quantity of items sold.
- Identify low-stock products.
- Visualize revenue trends using charts.
- Display top-selling products using a pie chart.

## Technologies Used

- **Frontend:** React.js
- **Styling:** Bootstrap, CSS
- **Programming Language:** JavaScript
- **API Communication:** Axios
- **Routing:** React Router
- **State Management:** React Hooks
- **Backend/API:** REST API or JSON Server, depending on the configured project setup
- **Charts:** Chart library used for sales and revenue visualization

## Project Structure

```text
inventory-management/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── AddProduct.jsx
│   │   ├── Sales.jsx
│   │   └── Report.jsx
│   ├── services/
│   │   └── allAPI.js
│   ├── Redux/
│   │   └── slice/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
└── README.md
```

*The directory structure above is illustrative. Adjust the filenames and folders to match your actual project.*

## Installation and Setup

### Prerequisites

Install the following before running the project:

- Node.js
- npm
- A code editor such as Visual Studio Code

### 1. Clone the repository

```bash
git clone <your-repository-url>
```

### 2. Navigate to the project directory

```bash
cd inventory-management
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the API server

If your application uses JSON Server, start it in a separate terminal using your configured database file:

```bash
npx json-server --watch db.json --port 3000
```

Make sure the database file and API endpoints match your project configuration.

### 5. Start the React application

```bash
npm run dev
```

Open the local URL displayed in your terminal, usually:

```text
http://localhost:5173
```

## Application Modules

| Module | Purpose |
|---|---|
| Dashboard | Displays key inventory and sales statistics |
| Products | Manages product information and stock records |
| Add Product | Creates new inventory entries |
| Sales | Processes product sales and tracks quantities |
| Reports | Visualizes revenue, sales, and inventory performance |

## Example Product Information

Each product can contain the following fields:

- Product ID
- Product Name
- SKU
- Category
- Supplier
- Purchase Price
- Selling Price
- Stock Quantity
- Minimum Stock Level
- Description

## Future Enhancements

- User authentication and role-based access control.
- Supplier management and purchase order tracking.
- Export reports to PDF and Excel.
- Date-wise and monthly sales reports.
- Automated low-stock notifications.
- Barcode scanning for faster product identification.
- Integration with a production database.

## Learning Outcomes

This project demonstrates practical skills in React component development, form handling, API integration, CRUD operations, state management, inventory calculations, sales processing, and data visualization.

## Author

**Antony S Mechery**

Computer Science and Engineering Graduate

## License

This project is intended for educational and portfolio purposes. Add a specific open-source license if you plan to distribute the source code under one.