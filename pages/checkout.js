import Layout from "@/components/layout";
import products from "@/Data/productos.json";
import { ProductsContext } from "@/components/productContext";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

export default function CheckoutPage() {
  const { selectedProducts, setSelectedProducts } = useContext(ProductsContext);
  const uniqIds = [...new Set(selectedProducts)];
  const [selected, setSelected] = useState([]);
  const [address,setAddress] = useState('');
  const [city,setCity] = useState('');
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [Nom,setNom] = useState('');
  const [checkbox,setCheckbox] = useState(0);

  

  const products_json = products.productsInfo; // Asegúrate de tener acceso a products.productsInfo
  useEffect(() => {
    if (uniqIds.length > 0 && products) {
      setSelected(
        uniqIds.map((p) => {
          return products_json.find((item) => item._id === p);
        })
      );
    }
  }, [selectedProducts]);

  function moreOfThisProduct(id) {
    setSelectedProducts((prev) => [...prev, id]);
  }

  function lessOfThisProduct(id) {
    const pos = selectedProducts.indexOf(id);
    if (pos !== -1) {
      setSelectedProducts((prev) => {
        return prev.filter((value, index) => index !== pos);
      });
    } else{
      return setSelectedProducts([])
    }
  }

  console.log('1',selected)
  console.log('2',uniqIds)
  console.log('3',selectedProducts)

  let subtotal = 0;
  if (selectedProducts?.length) {
      subtotal = selectedProducts.reduce((acc, product) => {
      const price = selected.find(p => p._id === product)?.Preu || 0;
      return acc + price;
    }, 0);
  }
  
  let deliveryPrice = 5;
  
  if (subtotal > 50) {
    deliveryPrice = 0;
  } else {
    deliveryPrice = 5;
  }
 
  const total = Math.trunc((subtotal + deliveryPrice + checkbox) * 100) / 100;
  subtotal = Math.trunc(subtotal *100) / 100;

  function NumberName(){
    if (checkbox === 0){
      setCheckbox(2)
    } else {
      setCheckbox(0)
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
       <PayPalScriptProvider options={{"client-id": "test"}}>
        <PayPalButtons style={{ layout: "vertical", color: "blue"}} />
       </PayPalScriptProvider>

        <div className="mt-8">
          <input name="address" value={address} onChange={e => setAddress(e.target.value)} className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2" type="text" placeholder="Street address, number"/>
          <input name="city" value={city} onChange={e => setCity(e.target.value)} className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2" type="text" placeholder="City and postal code"/>
          <input name="name" value={name} onChange={e => setName(e.target.value)} className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2" type="text" placeholder="Your name"/>
          <input name="email" value={email} onChange={e => setEmail(e.target.value)} className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2" type="email" placeholder="Email address"/>
          <div className="flex space-x-2">
            <input type="checkbox" id="Number&Name" onClick={NumberName}/>
            <span className="pl-2 text-green-500"> Name & Number (+2€) </span>
          </div>
          {checkbox === 2 ? 
          <input name="name" value={Nom} onChange={e => setNom(e.target.value)} className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2 mt-2" type="text" placeholder="Name & Number"/>
          : ''}
        </div>
        <div className="mt-8">
          <div className="flex my-3">
            <h3 className="grow font-bold text-gray-400">Subtotal:</h3>
            <h3 className="font-bold">€{subtotal}</h3>
          </div>
          <div className="flex my-3">
            <h3 className="grow font-bold text-gray-400">Delivery:</h3>
            <h3 className="font-bold">€{deliveryPrice}</h3>
          </div>
          {checkbox === 2 ? <div className="flex my-3">
            <h3 className="grow font-bold text-gray-400">Number & Name:</h3>
            <h3 className="font-bold">€{checkbox}</h3>
          </div>: ''}
          <div className="flex my-3 border-t pt-3 border-dashed border-green-500">
            <h3 className="grow font-bold text-gray-400">Total:</h3>
            <h3 className="font-bold">€{total}</h3>
          </div>
        </div>
        <input type="hidden" name="products" value={selectedProducts.join(',')}/>
        <button type="submit" className="bg-emerald-500 px-5 py-2 rounded-xl font-bold text-white w-full my-4 shadow-emerald-300 shadow-lg">Pagar {total}€</button>
         
    </Layout>
  );
}
