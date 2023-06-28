"use client";
import Image from "next/image";
import Carousel from "./carousel";
import { useContext } from "react";
import { ProductsContext } from "./productContext";


export default function Product({ _id, Name, Preu, Any, Liga, Retro, Images }) {
  const {setSelectedProducts} = useContext(ProductsContext);
  function addProduct(){
    setSelectedProducts( prev => [...prev, _id]);
  }
  return (
    <div className="w-64 rounded-xl bg-gray-600/10 ">
      {Images.length > 1 ? (
        <Carousel>
          {Images.map((s) => (
            <Image src={s} key={s} alt = {s} width={1000} height={1000} />
          ))}
        </Carousel>
      ) : (
        <Image
          src={Images[0]}
          key={Images[0]}
          alt = {Images[0]}
          width={300}
          height={300}
          className="rounded-xl"
        />
      )}
      <div className="p-1">
        <div className="mt-2">
          <h3 className="font-bold text-lg ml-3"> {Name} </h3>
        </div>
        <p className="ml-4">{Any}</p>
        <div className="flex">
          <div className="mt-1 text-2xl font-bold ml-3 grow">{Preu}€</div>
          <button className="bg-green-400 text-white text-xl py-1 px-3 rounded-xl font-bold" onClick={addProduct} >
            +
          </button>
        </div>
      </div>
    </div>

    
  );
}
