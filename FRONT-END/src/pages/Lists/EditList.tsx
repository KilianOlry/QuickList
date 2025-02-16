import {FormEvent, useEffect, useState} from "react";
import {getList, updateList,} from "../../utils/endpoint.ts";
import Modal from "../../components/Modal.tsx";
import {useParams} from "react-router-dom";
import {ListInterface} from "../../utils/interfaces/ListInterface.ts";

const EditList = () => {
  const { id } = useParams();
  const [currentList, setCurrentList] = useState([]);
  const [list, setList] = useState<ListInterface>({
    id: id || '',
    title: '',
    date: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const modal = document.getElementById('modal');

  const getGrosseryList = async () => {
    try {
      const response = await fetch(`${getList}${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch the grocery list');
    }
  };

  useEffect(() => {
    const fetchGrosseryLists = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getGrosseryList();
        setCurrentList(data[0]);
      } catch (error) {
        console.log(error);
        setError('Erreur lors de la récupération des données.');
      } finally {
        setLoading(false);
      }
    };

    // Call the fetch function whenever 'id' changes
    fetchGrosseryLists();
  }, [id]);

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(updateList, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(list),
      });

      if (!response.ok) {
        throw new Error('Erreur dans la requête');
      }

      modal?.showModal();

    } catch (error) {
      console.error('Erreur:', error);
    }
  }


  return (
    <div>
      <h1 className="text-3xl font-extrabold sm:text-5xl italic text-center my-10">
        Modification de votre
        <span className="font-extrabold text-red-700"> liste</span>
      </h1>

      <h2 className="text-2xl font-extrabold italic text-center mb-10">{currentList.title}</h2>

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
                 />
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
                 />
        </div>
        <div className="flex justify-center">
          <button className="btn btn-neutral px-8" type="submit">Valider</button>
        </div>
      </form>

      <Modal action={"edit-list"}/>
    </div>
  )
};

export default EditList;