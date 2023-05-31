import brasilr from "../assets/brasil_round.png";
import portugalr from "../assets/portugal_round.png";
import brasilf from "../assets/brasil_flat.png";
import portugalf from "../assets/portugal_flat.png";
import { useEffect, useState } from "react";

const EquivalenciaBrPt = ({ pr, vr, ve, mr, me }) => {
  const [vant, setVant] = useState("");

  let bandBrasil = brasilr;
  let bandPortugal = portugalr;
  let bandVantagem = "";

  useEffect(() => {
    function verificaVantagem(bVant) {
      if (bVant === brasilr) {
        setVant("b");
      } else if (bVant === portugalr) {
        setVant("p");
      } else setVant("");
    }
    verificaVantagem(bandVantagem);
  });

  vr = vr.toString().replace(".", "").replace(",", ".");
  mr = mr.toString().replace(".", "").replace(",", ".");
  ve = ve.toString().replace(".", "").replace(",", ".");
  me = me.toString().replace(".", "").replace(",", ".");

  const perSMBr = (Number.parseFloat(vr) / Number.parseFloat(mr)) * 100;
  const perSMPt = (Number.parseFloat(ve) / Number.parseFloat(me)) * 100;

  pr === "" ? (pr = pr) : (pr = `Produto: ${pr}`);

  if (vr > 0.0 && ve > 0.0) {
    if (perSMPt < perSMBr) {
      bandVantagem = bandPortugal;
    } else if (perSMPt > perSMBr) {
      bandVantagem = bandBrasil;
    } else {
      bandVantagem = "";
    }
  }

  function calculaPrazo(salMinimo, vlrProduto) {
    let tempo = vlrProduto / salMinimo;
    let result = "";
    let t = 0;

    if (vlrProduto < salMinimo) {
      t = Math.round(tempo * 30);
      result = `${
        t === 1 ? t + " dia" : t === 0 ? "algumas horas" : t + " dias"
      }`;
    } else {
      t = Math.round(tempo);
      result = `${t} ${t === 1 ? "mês" : "meses"}`;
    }
    return result;
  }

  let prazoBr = calculaPrazo(Number.parseFloat(mr), Number.parseFloat(vr));
  let prazoPt = calculaPrazo(Number.parseFloat(me), Number.parseFloat(ve));

  return (
    <div>
      <div className="produto">{pr}</div>
      <div
        className={`vantagens-geral ${vant === "" ? "esconder-objeto" : ""}`}
      >
        <div className="custos-brasil">
          <div className="custo-paises">
            <span className="texto-box">Equivalente a</span>
            <img src={brasilf} className="flat-flag" />
            <span
              className={`percentual-flag ${
                vant === "b" ? "mais-vantajoso" : "menos-vantajoso"
              }`}
            >
              {perSMBr.toLocaleString("pt-br", {
                style: "decimal",
                maximumFractionDigits: 2,
              }) + "%"}
            </span>
            <span className="texto-box">do salário mínimo</span>
          </div>
          <div className="custo-paises">
            <span className="texto-box">Aproximadamente</span>
            <img src={brasilf} className="flat-flag" />
            <span
              className={`${
                prazoBr === "algumas horas"
                  ? "percentual-flag-texto"
                  : "percentual-flag"
              } ${vant === "b" ? "mais-vantajoso" : "menos-vantajoso"}`}
            >
              {prazoBr}
            </span>
            <span className="texto-box">de trabalho</span>
          </div>
        </div>
        <div className="custos-portugal">
          <div className="custo-paises">
            <span className="texto-box">Equivalente a</span>
            <img src={portugalf} className="flat-flag" />
            <span
              className={`percentual-flag ${
                vant === "p" ? "mais-vantajoso" : "menos-vantajoso"
              }`}
            >
              {perSMPt.toLocaleString("pt-br", {
                style: "decimal",
                maximumFractionDigits: 2,
              }) + "%"}
            </span>
            <span className="texto-box">do salário mínimo</span>
          </div>
          <div className="custo-paises">
            <span className="texto-box">Aproximadamente</span>
            <img src={portugalf} className="flat-flag" />
            <span
              className={`${
                prazoPt === "algumas horas"
                  ? "percentual-flag-texto"
                  : "percentual-flag"
              } ${vant === "p" ? "mais-vantajoso" : "menos-vantajoso"}`}
            >
              {prazoPt}
            </span>
            <span className="texto-box">de trabalho</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquivalenciaBrPt;
