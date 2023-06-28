import Layout from "@/components/layout";
import products from "@/Data/productos.json";
import { ProductsContext } from "@/components/productContext";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";

export default function CheckoutPage() {
  const { selectedProducts, setSelectedProducts } = useContext(ProductsContext);
  const uniqIds = [...new Set(selectedProducts)];
  const [selected, setSelected] = useState([]);
  

  const products_json = products.productsInfo; // Asegúrate de tener acceso a products.productsInfo
  useEffect(() => {
    if (uniqIds.length > 0 && products) {
      setSelected(
        uniqIds.map((p) => {
          return products_json.find((item) => item._id === p);
        })
      );
    }
  }, [selectedProducts, products]);

  function moreOfThisProduct(id) {
    setSelectedProducts((prev) => [...prev, id]);
  }

  function lessOfThisProduct(id) {
    const pos = selectedProducts.indexOf(id);
    if (pos !== -1) {
      setSelectedProducts((prev) => {
        return prev.filter((value, index) => index !== pos);
      });
    }
  }

  return (
    <Layout>
      {!selected.length && <div> No products in yout shopping cart </div>}
      {selected.length &&
        selected.map((productInfo) => (
          <div className="flex mb-5" key={productInfo.id}>
            <div className="bg-gray-100 p-2 rounded-xl shrink-0">
              <Image
                src={productInfo.Images[0]}
                alt=""
                className="w-24 rounded-xl"
                width={350}
                height={350}
                key={productInfo.Images[0]}
              />
            </div>
            <div className="pl-4">
              <h3 className="font-bold text-lg"> {productInfo.Name} </h3>
              <div className="flex flex-col">
                <div className="font-bold">{productInfo.Preu}€</div>
                <div className="mt-2">
                  <button
                    onClick={() => lessOfThisProduct(productInfo._id)}
                    className="bg-green-500 px-2 rounded-lg text-white"
                  >
                    {" "}
                    -{" "}
                  </button>
                  <span className="px-2">
                    {
                      selectedProducts.filter(
                        (item) => item === productInfo._id
                      ).length
                    }
                  </span>
                  <button
                    onClick={() => moreOfThisProduct(productInfo._id)}
                    className="bg-green-500 px-2 rounded-lg text-white"
                  >
                    {" "}
                    +{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
    </Layout>
  );
}
