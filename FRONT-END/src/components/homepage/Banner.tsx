import {createList, showLists} from "../../utils/links.ts";

const Banner = () => {
  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-32 flex h-[calc(100dvh-68px)] items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl italic">
            Créer ta liste
            <strong className="font-extrabold text-red-700 sm:block"> en toute simplicité</strong>
          </h1>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded-sm bg-red-600 px-12 py-3 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:ring-3 focus:outline-hidden sm:w-auto"
              href={createList}
            >
              Créer une liste
            </a>

            <a
              className="block w-full rounded-sm px-12 py-3 text-sm font-medium text-red-600 shadow-sm hover:text-red-700 focus:ring-3 focus:outline-hidden sm:w-auto"
              href={showLists}
            >
              Voir vos listes
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Banner;