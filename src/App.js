import "./App.scss";
import Header from "./components/Header/Header";
import Warehouses from "./pages/Warehouses/Warehouses";
import WarehouseDetails from "./pages/WarehouseDetails/WarehouseDetails";
import EditWarehouse from "./pages/EditWarehouse/EditWarehouse";
import AddWarehouse from "./pages/AddWarehouse/AddWarehouse";
import Inventory from "./pages/Inventory/Inventory";
import InventoryItemDetails from "./pages/InventoryItemDetails/InventoryItemDetails";
import InventoryItemEdit from "./pages/InventoryItemEdit/InventoryItemEdit";
import InventoryItemAdd from "./pages/InventoryItemAdd/InventoryItemAdd";
import Footer from "./components/Footer/Footer";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div className="body">
          <div className="header__extension"></div>
          <div className="page-components">
            <Routes>
              <Route exact path="/" element={<Navigate to="/warehouses"/>} />
              <Route path="/warehouses" element={<Warehouses />} />
              <Route path="/" element={<Navigate to="/warehouses" />} />
              <Route
                path="/warehouses/:warehouseId"
                element={<WarehouseDetails />}
              />
              <Route
                path="/warehouses/:warehouseId/edit"
                element={<EditWarehouse />}
              />
              <Route path="/warehouses/add" element={<AddWarehouse />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="inventory/:id" element={<InventoryItemDetails />} />
              <Route
                path="/inventory/:id/edit"
                element={<InventoryItemEdit />}
              />
              <Route path="inventory/add" element={<InventoryItemAdd />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
