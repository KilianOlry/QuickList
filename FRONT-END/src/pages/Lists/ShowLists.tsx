import {FormEvent, useEffect, useState} from "react";
import {deleteList, deleteProducts, getLists} from "../../utils/endpoint.ts";
import EditIcon from "../../components/icons/EditIcon.tsx";
import TrashIcon from "../../components/icons/TrashIcon.tsx";
import AddIcon from "../../components/icons/Add.tsx";
import Modal from "../../components/Modal.tsx";

const ShowLists = () => {

  const modal = document.getElementById("modal");
  const [lists, setLists] = useState([]);
  const [selectedListId, setSelectedListId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getGrosseryLists() {
    return fetch(getLists)
      .then((res) => res.json())
      .then((data) => data);
  }

  async function deleteGrosseryList(id: string) {
    try {
      const response = await fetch(deleteList, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id })
      });

      const responseText = await response.text();

      if (!response.ok) {
        throw new Error(`Erreur serveur : ${responseText}`);
      }

      const data = JSON.parse(responseText);
      return data;
    } catch (error) {
      console.log(error);
      setError("Erreur lors de la suppression.");
    }
  }

  async function deleteProduct(id: string) {
    try {
      const response = await fetch(deleteProducts, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id })
      });

      const responseText = await response.text();

      if (!response.ok) {
        throw new Error(`Erreur serveur : ${responseText}`);
      }

      const data = JSON.parse(responseText);
      return data;
    } catch (error) {
      console.log(error);
      setError("Erreur lors de la suppression.");
    }
  }


  useEffect(() => {
    const fetchGrosseryLists = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getGrosseryLists();
        setLists(data);
      } catch (error) {
        console.log(error);
        setError("Erreur lors de la récupération des données.");
      } finally {
        setLoading(false);
      }
    };

    fetchGrosseryLists();
  }, []);

  const handleModalOpen = (id: string) => {
    setSelectedListId(id);
    modal?.showModal();
  }

  const deleteGrossery = async (id: string) => {
    try {
      await deleteGrosseryList(id);
      setLists((prevLists) => prevLists.filter((item) => item.list_id !== id));
    } catch (error) {
      console.log(error);
      setError("Erreur lors de la suppression de la liste.");
    }
  };


  const handleDeleteProduct = async (e: FormEvent, productId: string, listId: string) => {
      e.preventDefault();
      await deleteProduct(productId);
      window.location.reload();
  };


  return (
    <>
      <h1 className="text-3xl font-extrabold sm:text-5xl italic text-center my-14">
        Voici vos
        <span className="font-extrabold text-red-700"> listes</span>
      </h1>

      <section className="px-6 lg:px-0 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14 md:gap-8">

        {lists.map((item) => (
          <article
            className="relative z-10 bg-white/20 p-6 rounded-md shadow-sm cursor-pointer border-2 border-gray-50 hover:border-black hover:border-2 transition-colors duration-300">
            <div className="h-80 overflow-y-auto scrollbar-thumb:hover">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold capitalize">{item.list_title}</h2>
                <p className="italic font-thin">{new Date(item.list_date).toLocaleDateString('fr-FR')}</p>
              </div>

              <p className="text-gray-700 font-semibold mb-2">Produit(s) :</p>
              {item.products.map((item) => (
                <div className="collapse collapse-plus border my-2">
                  <input type="radio" name="my-accordion-3"/>
                  <div className="collapse-title text-sm">{item.product_name}</div>
                  <div className="collapse-content flex items-center justify-between">
                    <p className="font-thin text-sm">{item.product_description}</p>
                    <form method="DELETE" onSubmit={(e) => handleDeleteProduct(e, item.product_id, item.list_id)}>
                      <button
                        type="submit"
                        className="bg-gray-900 text-white text-xs px-2 py-1 rounded-md shadow">
                        Supprimer
                      </button>
                    </form>


                  </div>
                </div>
              ))}
              <div className="absolute -top-6 right-1 w-full flex justify-end gap-4">
                <a href={`/edit_list/${item.list_id}`}
                   className="bg-gray-900 rounded-full size-10 grid place-content-center p-2 shadow-md">
                  <EditIcon/>
                </a>

                <a href={`/add_product/${item.list_id}`}
                   className="bg-gray-900 rounded-full size-10 grid place-content-center p-2 shadow-md">
                  <AddIcon/>
                </a>

                <button
                  onClick={() => handleModalOpen(item.list_id)}
                  className="bg-red-700 text-white p-2 rounded-full"
                >
                  <TrashIcon />
                </button>

              </div>
            </div>
          </article>
        ))}

      </section>

      <Modal action={"delete-list"} listId={selectedListId} onDelete={deleteGrossery} />
    </>

  )
}

export default ShowLists;