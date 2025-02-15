import {FormEvent, useState} from "react";
import {ListInterface} from "../../utils/interfaces/ListInterface.ts";
import {addList} from "../../utils/endpoint.ts";

const AddList = () => {

  const [list, setList] = useState<ListInterface>({});

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
        console.log('Réponse du serveur:', data);
      })
      .catch(error => {
        console.error('Erreur:', error);
      });
  }

  return (
    <div>
      <h1 className="text-center">Créer ta liste</h1>

      <form className="max-w-sm mx-auto" method="POST" onSubmit={submitForm}>
        <div className="mb-5">
          <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom de
            l'article</label>
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
        <button type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Valider
        </button>
      </form>
    </div>
  )
}

export default AddList;