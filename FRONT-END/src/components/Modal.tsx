import {homepage, showLists} from "../utils/links.ts";

type Props = {
  action: string;
  listId?: string;
  onDelete?: (id: string) => void;
};

const Modal = ({action, listId, onDelete}: Props) => {

  const handleDelete = (e: React.FormEvent) => {
    e.preventDefault();
    onDelete(listId);
  };

  switch (action) {
    case 'delete-list':
      return (
        <>
          <dialog id="modal" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-xl text-center my-8">Etes-vous sûr de vouloir supprimer cette liste ?</h3>
              <form className="flex justify-center gap-4" onSubmit={handleDelete}>
                <button type="submit" className="btn btn-neutral">
                  Supprimer
                </button>
              </form>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>Fermer</button>
            </form>
          </dialog>
        </>
      )
      break;
    case 'create-list':
      return (
        <>
          <dialog id="modal" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-xl text-center">Votre liste a bien été crée</h3>
              <p className="py-4 text-center text-lg">La suite du processus est la suivante :</p>

              <div className="flex justify-center gap-4">
                <a href={homepage} className="btn btn-neutral">Compléter plus tard</a>
                <a href={showLists} className="btn btn-neutral">Compléter maintenant</a>
              </div>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </>
      )
      break;
    case 'create-product':
      return (
        <>
          <dialog id="modal" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-xl text-center">Votre produit bien été crée</h3>

              <div className="flex justify-center gap-4 my-10">
                <form>
                  <button type="submit" className="btn btn-neutral">Ajouter un autre produit</button>
                </form>
                <a href={showLists} className="btn btn-neutral">Voir vos listes</a>
              </div>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </>
      )
      break;
    case 'edit-list':
      return (
        <>
          <dialog id="modal" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-xl text-center">Votre produit a bien été modifié</h3>

              <div className="flex justify-center gap-4 my-10">
                <a href={showLists} className="btn btn-neutral">Voir vos listes</a>
              </div>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </>
      )
      break;
    default:
      console.log(`Sorry, we are out of `);
  }
}

export default Modal