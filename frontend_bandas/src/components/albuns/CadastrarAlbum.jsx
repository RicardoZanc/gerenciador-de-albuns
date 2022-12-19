import { useState, useEffect } from "react";

const CadastrarAlbum = () => {
  const [nome, setNome] = useState("");
  const [dataLanc, setDataLanc] = useState("");
  const [banda, setBanda] = useState();
  const [listaBandas, setListaBandas] = useState([]);

  const getBandas = async () => {
    await fetch("http://127.0.0.1:3333/banda")
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
    await fetch("http://127.0.0.1:3333/album", {
      method: "POST",
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
        className="btn btn-success"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Adicionar
      </button>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Adicionar
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body container">
              <form>
                <div className="row">
                  <div className="col-6">
                    <label className="w-100 text-center" htmlFor="nome">
                      Nome do álbum
                    </label>
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
                  <option selected>Escolha a banda</option>
                  {listaBandas.map((b) => (
                    <option value={b.id_banda}>{b.nome_banda}</option>
                  ))}
                </select>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={onSubmitForm}
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CadastrarAlbum;
