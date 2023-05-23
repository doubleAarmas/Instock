import WarehouseSubheader from "../../components/WarehouseSubheader/WarehouseSubheader";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import WarehouseInventoryList from "../../components/WarehouseInventory/WarehouseInventoryList";

function WarehouseDetails() {
  const { warehouseId } = useParams();
  const [warehouseDetailData, setWarehouseDetailData] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5051/warehouses/${warehouseId}`).then((res) => {
      setWarehouseDetailData(res.data[0]);
    });
  }, [warehouseId]);

  return (
    <>
      <WarehouseSubheader warehouseDetailData={warehouseDetailData} />
      <WarehouseInventoryList />
    </>
  );
}
export default WarehouseDetails;
