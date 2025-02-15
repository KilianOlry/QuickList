import {homepage} from "../utils/links.ts";

const Modal = () => {
  return (
    <>
      <dialog id="modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-xl text-center">Votre liste a bien été crée</h3>
          <p className="py-4 text-center text-lg">La suite du processus est la suivante :</p>

          <div className="flex justify-center gap-4">
            <a href={homepage} className="btn btn-neutral">Compléter plus tard</a>
            <button className="btn btn-neutral">Compléter maintenant</button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>

  )
}

export default Modal