import axios from "axios";
import { useEffect, useState } from "react";
import EquivalenciaBrPt from "./EquivalenciaBrPt";

export default function ProporcaoRealEuro() {
  const [produto, setProduto] = useState("");
  const [valorReal, setValorReal] = useState(0);
  const [valorEuro, setValorEuro] = useState(0);
  const [salMinimoBR, setSalMinimoBR] = useState("1320,00");
  const [salMinimoPT, setSalMinimoPT] = useState("760,00");
  const [cotacao, setCotacao] = useState(0);

  const buscarCotacao = async () => {
    await axios
      .get(`http://economia.awesomeapi.com.br/json/last/EUR-BRL`)
      .then((response) => {
        setCotacao(response.data);
      });

    if (cotacao !== 0) {
      let data = new Date(cotacao.EURBRL.timestamp * 1000);

      document.getElementById("cotacao").textContent = `Cotação ${
        cotacao.EURBRL.name
      }: 1 ${cotacao.EURBRL.code} equivale a ${cotacao.EURBRL.high} ${
        cotacao.EURBRL.codein
      } - cotação de ${formatarData(data)}`;
    }
  };

  function formatarData(dt) {
    let dia = dt.getDate() < 10 ? "0" + dt.getDate() : dt.getDate();
    let mes =
      dt.getMonth() + 1 < 10 ? "0" + (dt.getMonth() + 1) : dt.getMonth() + 1;
    let hora = dt.getHours() < 10 ? "0" + dt.getHours() : dt.getHours();
    let min = dt.getMinutes() < 10 ? "0" + dt.getMinutes() : dt.getMinutes();
    let sec = dt.getSeconds() < 10 ? "0" + dt.getSeconds() : dt.getSeconds();

    return (
      dia +
      "/" +
      mes +
      "/" +
      dt.getFullYear() +
      " " +
      hora +
      ":" +
      min +
      ":" +
      sec
    );
  }

  useEffect(() => {
    buscarCotacao();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    buscarCotacao();

    setProduto(document.getElementsByName("produto")[0].value);
    setValorReal(document.getElementsByName("valorreal")[0].value);
    setValorEuro(document.getElementsByName("valoreuro")[0].value);
    setSalMinimoBR(document.getElementsByName("minreal")[0].value);
    setSalMinimoPT(document.getElementsByName("mineuro")[0].value);
  };

  function handleChange(event) {
    setSalMinimoBR(document.getElementsByName("minreal")[0].value);
    setSalMinimoPT(document.getElementsByName("mineuro")[0].value);
  }

  return (
    <div className="formulario">
      <p className="pageTitle">
        Comparativo de preços para aquisição de produtos em € ou R$
      </p>
      <form onSubmit={handleSubmit} className="form-control">
        <div className="produto-centro">
          <label htmlFor="produto">Produto</label>
          <input type="text" name="produto" className="inputproduto" />
        </div>

        <div className="lado-esquerdo">
          <label htmlFor="valorreal">Valor R$: </label>
          <input
            type="text"
            name="valorreal"
            required
            className="input-esquerda"
          />

          <label htmlFor="valoreuro">Valor €: </label>
          <input
            type="text"
            name="valoreuro"
            required
            className="input-direita"
          />
        </div>

        <div className="lado-direito">
          <label htmlFor="minreal">Sal.Mínimo BR: </label>
          <input
            type="text"
            name="minreal"
            value={salMinimoBR}
            onChange={handleChange}
            className="input-esquerda"
          />

          <label htmlFor="mineuro">Sal.Mínimo PT: </label>
          <input
            type="text"
            name="mineuro"
            value={salMinimoPT}
            onChange={handleChange}
            className="input-direita"
          />
        </div>

        <button type="submit" name="submit">
          Calcular
        </button>
      </form>
      <br />
      <div className="resposta">
        <EquivalenciaBrPt
          pr={produto}
          vr={valorReal}
          ve={valorEuro}
          mr={salMinimoBR}
          me={salMinimoPT}
        />
      </div>
      <div className="cotacao" id="cotacao"></div>
      <div className="footer">Copyright © 2023 Frederico Zanitti Silva</div>
    </div>
  );
}
