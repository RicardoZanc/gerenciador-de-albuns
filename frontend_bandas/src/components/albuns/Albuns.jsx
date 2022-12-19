import React, { useEffect, useState } from "react";
import CadastrarAlbum from "./CadastrarAlbum";
import EditarAlbum from "./EditarAlbum";

const Albuns = () => {
  const [albuns, setAlbuns] = useState([]);

  // Deleta album do banco
  const deleteAlbum = async (id) => {
    await fetch(`http://127.0.0.1:3333/album/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((response) => console.log(response))
      .then((response) => {
        setAlbuns(albuns.filter((a) => a.id_album !== id));
      })
      .catch((err) => console.log("Erro: " + err));
  };
  // Formata data
  const formatDate = (date) => {
    let y = date.slice(0, 4);
    let m = date.slice(5, 7);
    let d = date.slice(8, 10);
    let dmy = `${d}/${m}/${y}`;
    return dmy;
  };

  const getAlbuns = async () => {
    await fetch("http://127.0.0.1:3333/album")
      .then((response) => response.json())
      .then((data) => setAlbuns(data))
      .catch((err) => console.log("Erro: " + err));
  };

  useEffect(() => {
    getAlbuns();
  }, []);

  console.log(albuns);

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col" className="text-center me-2">
              Id
            </th>
            <th scope="col" className="text-center">
              Nome
            </th>
            <th scope="col" className="text-center">
              Data de Lançamento
            </th>
            <th scope="col" className="text-center">
              Banda
            </th>
            <th scope="col" className="text-center">
              <CadastrarAlbum />
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr> */}
          {albuns.map((album) => (
            <tr key={album.id_album}>
              <th scope="row" className="text-center me-2">
                {album.id_album}
              </th>
              <td>{album.nome_album}</td>
              <td className="text-center">
                {formatDate(album.data_lanc_album)}
              </td>
              <td>{album.nome_banda}</td>
              <td className="text-center">
                <EditarAlbum album={album} />
              </td>
              <td className="text-center">
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    deleteAlbum(album.id_album);
                  }}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Albuns;
