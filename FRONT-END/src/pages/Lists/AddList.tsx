import {FormEvent, useState} from "react";
import {ListInterface} from "../../utils/interfaces/ListInterface.ts";
import {addList} from "../../utils/endpoint.ts";
import Modal from "../../components/Modal.tsx";

const AddList = () => {

  const [list, setList] = useState<ListInterface>({});

  const modal = document.getElementById('modal');

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();
    if (!list.title || !list.date) {
      throw new Error(
        "Une (ou plusieurs) valeur est invalide."
      );
    }

    fetch(addList, {
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
  }

  return (
    <div>
      <h1 className="text-3xl font-extrabold sm:text-5xl italic text-center my-10">
        Création de votre
        <span className="font-extrabold text-red-700"> listes</span>
      </h1>

      <form className="max-w-sm mx-auto" method="POST" onSubmit={submitForm}>
        <div className="mb-5">
          <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom de
            votre liste</label>
          <input type="text"
                 id="title"
                 onChange={(e) => {
                   const title = e.target.value ?? null;
                   setList((prevState) => ({
                     ...prevState,
                     title: title,
                   }));
                 }}
                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                 required/>
        </div>
        <div className="mb-5">
          <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
          <input type="date" id="date"
                 onChange={(e) => {
                   const date = e.target.value ?? null;
                   setList((prevState) => ({
                     ...prevState,
                     date: date,
                   }));
                 }}
                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                 required/>
        </div>
        <div className="flex justify-center">
          <button className="btn btn-neutral px-8" type="submit">Valider</button>
        </div>
      </form>

      <Modal/>
    </div>
  )
}

export default AddList;