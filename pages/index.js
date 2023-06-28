import products from "@/Data/productos.json";
import Layout from "@/components/layout";
import Product from "@/components/product";
import { useState } from "react";

export default function Home() {
  const ligasNames = [...new Set(products.productsInfo.map((p) => p.Liga))];
  const [phrase, setPhrase] = useState("");

  let products_filter;
  if (phrase) {
    products_filter = products.productsInfo.filter((p) =>
      p.Name.includes(phrase)
    );
  } else {
    products_filter = products.productsInfo;
  }

  return (
    <>
        <Layout>
          <input
            value={phrase}
            onChange={(e) => setPhrase(e.target.value)}
            type="text"
            placeholder="Search for products..."
            className="bg-gray-100 w-full py-2 px-4 rounded-xl"
          />
          <div>
            {ligasNames.map((ligaName) => (
              <div key={ligaName}>
                {products_filter.find((p) => p.Liga === ligaName) && (
                  <div>
                    <h2 className="text-4xl py-5 font-semibold">
                      {" "}
                      {ligaName}{" "}
                    </h2>
                    <div className="flex -mx-5 overflow-x-scroll snap-x scrollbar-hide">
                      {products_filter
                        .filter((p) => p.Liga === ligaName)
                        .map((product) => (
                          <div key={product.Name} className="px-5 snap-start">
                            <Product {...product} />
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Layout>

           
    </>
  );
}
