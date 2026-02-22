import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function AtualizaProduto() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [imagem, setImagem] = useState(null);
  const [imagemAtual, setImagemAtual] = useState(null);

  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    preco: "",
    estoque: "",
    unidade: "kg"
  });

  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("success");

  // 🔹 Buscar produto ao carregar
  useEffect(() => {
    async function buscarProduto() {
      try {
        const response = await axios.get(`http://localhost:3000/produtos/${id}`, {
          withCredentials: true, // envia cookies
        });

        const data = response.data;

        setFormData({
          nome: data.nome || "",
          descricao: data.descricao || "",
          preco: data.preco || "",
          estoque: data.estoque || "",
          unidade: data.unidade || "kg",
        });

        setImagemAtual(data.imagem || null);

      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate("/login");
        } else {
          console.error("Erro ao buscar produto", error);
          setMensagem("Erro ao buscar produto");
          setTipoMensagem("danger");
        }
      }
    }

    buscarProduto();
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 🔹 Atualizar produto usando axios
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensagem("");

    try {
      const dados = new FormData();

      dados.append("nome", formData.nome);
      dados.append("descricao", formData.descricao);
      dados.append("preco", parseFloat(formData.preco));
      dados.append("estoque", parseInt(formData.estoque || 0));
      dados.append("unidade", formData.unidade);

      if (imagem) {
        dados.append("imagem", imagem);
      }

      const response = await axios.put(`http://localhost:3000/produtos/${id}`, dados, {
        withCredentials: true,
      });

      setTipoMensagem("success");
      setMensagem("Produto atualizado com sucesso!");

      // Atualiza imagem atual se tiver sido alterada
      if (imagem) {
        setImagemAtual(URL.createObjectURL(imagem));
        setImagem(null);
      }

    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/login");
      } else {
        setTipoMensagem("danger");
        setMensagem(error.response?.data?.erro || "Erro no servidor");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body p-4">
              <h4 className="text-center mb-4">Atualiza produto</h4>

              {mensagem && (
                <div className={`alert alert-${tipoMensagem} text-center`}>
                  {mensagem}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Imagem do Produto</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={(e) => setImagem(e.target.files[0])}
                  />
                </div>

                {imagem ? (
                  <div className="mt-3 text-center">
                    <img
                      src={URL.createObjectURL(imagem)}
                      alt="Preview"
                      className="img-fluid rounded"
                      style={{ maxHeight: "200px", objectFit: "cover" }}
                    />
                  </div>
                ) : imagemAtual ? (
                  <div className="mt-3 text-center">
                    <img
                      src={`http://localhost:3000/uploads/${imagemAtual}`}
                      alt="Produto"
                      className="img-fluid rounded"
                      style={{ maxHeight: "200px", objectFit: "cover" }}
                    />
                  </div>
                ) : null}

                <div className="mb-3">
                  <label className="form-label">Nome *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Descrição</label>
                  <textarea
                    className="form-control"
                    name="descricao"
                    rows="3"
                    value={formData.descricao}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Preço *</label>
                  <div className="input-group">
                    <span className="input-group-text">R$</span>
                    <input
                      type="number"
                      step="0.01"
                      className="form-control"
                      name="preco"
                      value={formData.preco}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Estoque</label>
                  <input
                    type="number"
                    className="form-control"
                    name="estoque"
                    value={formData.estoque}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Unidade</label>
                  <select
                    className="form-select"
                    name="unidade"
                    value={formData.unidade}
                    onChange={handleChange}
                  >
                    <option value="kg">Kg</option>
                    <option value="un">Unidade</option>
                    <option value="cx">Caixa</option>
                    <option value="l">Litro</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn btn-success w-100"
                  disabled={loading}
                >
                  {loading ? "Atualizando..." : "Atualizar Produto"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
