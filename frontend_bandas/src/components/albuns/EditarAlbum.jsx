import { useState, useEffect } from "react";

const EditarAlbum = ({ album }) => {
  const [nome, setNome] = useState(album.nome_album);
  const [dataLanc, setDataLanc] = useState(album.data_lanc_album.slice(0, 10));
  const [banda, setBanda] = useState(album.id_banda);
  const [listaBandas, setListaBandas] = useState([]);

  const getBandas = async () => {
    await fetch("http://127.0.0.1:3333/banda/")
      .then((response) => response.json())
      .then((data) => setListaBandas(data))
      .catch((err) => console.log("Erro: " + err));
  };

  useEffect(() => {
    getBandas();
  }, []);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const body = { nome, dataLanc, banda };
    await fetch(`http://127.0.0.1:3333/album/${album.id_album}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .then((window.location = "/"))
      .catch((err) => console.log("Erro: " + err));
  };

  console.log(listaBandas);
  return (
    <div>
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target={`#exampleModal${album.id_album}`}
        onClick={() => {
          setNome(album.nome_album);
          setDataLanc(album.data_lanc_album);
          setBanda(album.id_banda);
        }}
      >
        Editar
      </button>

      <div
        class="modal fade"
        id={`exampleModal${album.id_album}`}
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1
                class="modal-title fs-5"
                id={`exampleModalLabel${album.id_album}`}
              >
                Editar
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body container">
              <form>
                <div className="row">
                  <div className="col-6">
                    <label className="w-100 text-center" htmlFor="nome">
                      Nome do álbum
                    </label>
                    <h1></h1>
                  </div>
                  <div className="col-6">
                    <label className="w-100 text-center" htmlFor="data">
                      Data de lançamento
                    </label>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <input
                      id="nome"
                      type="text"
                      className="w-100"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                    />
                  </div>
                  <div className="col-6">
                    <input
                      id="data"
                      type="date"
                      className="w-100"
                      value={dataLanc}
                      onChange={(e) => setDataLanc(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col">
                    <label className="w-100 text-center" htmlFor="banda">
                      Banda:
                    </label>
                  </div>
                </div>
                <select
                  id="banda"
                  class="form-select"
                  aria-label="Default select example"
                  value={banda}
                  onChange={(e) => setBanda(e.target.value)}
                >
                  {listaBandas.map((b) => (
                    <option value={b.id_banda}>{b.nome_banda}</option>
                  ))}
                </select>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={onSubmitForm}
              >
                Salvar alterações
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarAlbum;
