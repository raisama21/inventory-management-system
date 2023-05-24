import { useState, useEffect } from "react";
import axios from "@/pages/api/axios";

import InventoryStats from "@/components/InventoryStats";

/* react icons */
import {
  BsFillCartCheckFill,
  BsFillCartXFill,
  BsCurrencyDollar,
} from "react-icons/bs";
import { MdCategory } from "react-icons/md";

export default function Dashboard(products) {
  const [productInfo, setProductInfo] = useState([]);

  const totalProductPrice = productInfo.reduce((acc, curr) => {
    return acc + curr.price;
  }, 0);

  const totalProductQuantity = productInfo.reduce((acc, curr) => {
    return acc + curr.quantity;
  }, 0);

  async function getProductInfo() {
    try {
      const response = await axios.get("/product/limited");

      setProductInfo(response?.data);
    } catch (error) {
      console.log(error?.response);
    }
  }

  useEffect(() => {
    getProductInfo();
  }, []);

  return (
    <section className="w-full ">
      <div className="pl-6 border-b-2 border-neutral-1/20">
        <h2 className="text-2xl font-medium mt-2">Inventory Stats</h2>

        <div className="flex gap-6 mt-6 mb-8">
          <InventoryStats
            name={"Total Products"}
            value={totalProductQuantity}
            ReactIcons={BsFillCartCheckFill}
          />

          <InventoryStats
            name={"Total Store Value"}
            value={totalProductPrice}
            ReactIcons={BsCurrencyDollar}
          />

          <InventoryStats
            name={"Out of Stock"}
            value={10}
            ReactIcons={BsFillCartXFill}
          />

          <InventoryStats
            name={"All Category"}
            value={10}
            ReactIcons={MdCategory}
          />
        </div>
      </div>
    </section>
  );
}
