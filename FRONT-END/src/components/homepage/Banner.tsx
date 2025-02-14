const Banner = () => {
  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl italic">
            Créer ta liste
            <strong className="font-extrabold text-red-700 sm:block">en toute simplicité</strong>
          </h1>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded-sm bg-red-600 px-12 py-3 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:ring-3 focus:outline-hidden sm:w-auto"
              href="#"
            >
              Créer une liste
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Banner;