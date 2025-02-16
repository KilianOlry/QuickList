import Modal from "../../components/Modal.tsx";
import { FormEvent, useState, useEffect } from "react";
import { ProductInterface } from "../../utils/interfaces/ProductInterface.ts";
import { useParams } from "react-router-dom";
import {addProduct} from "../../utils/endpoint.ts";

const AddProduct = () => {
  const { id } = useParams();
  const [list, setList] = useState<ProductInterface>({
    id: id || '',
    name: '',
    description: '',
  });

  const modal = document.getElementById('modal');

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();
    if (!list.name) {
      throw new Error("Une (ou plusieurs) valeur est invalide.");
    }

    fetch(addProduct, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(list)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur dans la requête');
        }
        return response.json();
      })
      .then(data => {
        modal.showModal();
      })
      .catch(error => {
        console.error('Erreur:', error);
      });

  };

  return (
    <div>
      <h1 className="text-3xl font-extrabold sm:text-5xl italic text-center my-10">
        Ajouter des produits
        <span className="font-extrabold text-red-700"> à votre liste</span>
      </h1>

      <form className="max-w-sm mx-auto" method="POST" onSubmit={submitForm}>
        <div className="mb-5">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Nom du produit
          </label>
          <input
            type="text"
            id="name"
            value={list.name}
            onChange={(e) => {
              const name = e.target.value;
              setList((prevState) => ({
                ...prevState,
                name: name,
              }));
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-5">
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Description
          </label>
          <input
            type="text"
            id="description"
            value={list.description}
            onChange={(e) => {
              const description = e.target.value;
              setList((prevState) => ({
                ...prevState,
                description: description,
              }));
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="flex justify-center">
          <button className="btn btn-neutral px-8" type="submit">Valider</button>
        </div>
      </form>

      <Modal action="create-product" />
    </div>
  );
};

export default AddProduct;
