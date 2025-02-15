import {useEffect, useState} from "react";
import {getList} from "../../utils/endpoint.ts";
import EditIcon from "../../components/icons/EditIcon.tsx";
import TrashIcon from "../../components/icons/TrashIcon.tsx";

const ShowLists = () => {

  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getGrosseryLists() {
    return fetch(getList)
      .then((res) => res.json())
      .then((data) => data);
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


  return (
    <>
      <h1 className="text-3xl font-extrabold sm:text-5xl italic text-center my-10">
        Voici vos
        <span className="font-extrabold text-red-700"> listes</span>
      </h1>
      <section className="px-6 lg:px-0 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">

        {lists.map((item) => (
          <article
            className="relative z-10 bg-white/20 p-6 rounded-md shadow-sm cursor-pointer border-2 border-gray-50 hover:border-black hover:border-2 transition-colors duration-300 h-80">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold capitalize">{item.title}</h2>
              <p className="italic font-thin">{item.date}</p>
            </div>

            <p className="text-gray-700 font-semibold mb-2">Produit(s) :</p>
            <div className="collapse collapse-plus">
              <input type="radio" name="my-accordion-3"/>
              <div className="collapse-title text-sm">Poisson</div>
              <div className="collapse-content">
                <p className="font-thin text-sm">hello</p>
              </div>
            </div>

            <a href="#" className="z-20 absolute -top-4 right-10 bg-gray-900 rounded-full size-8 grid place-content-center p-2">
              <EditIcon />
            </a>

            <form className="absolute -top-4 right-0 bg-gray-900 rounded-full size-8 grid place-content-center">
              <button type="submit">
                <TrashIcon />
              </button>
            </form>
          </article>
        ))}

      </section>
    </>

  )
}

export default ShowLists;