const EquivalenciaBrPt = ({ pr, vr, ve, mr, me }) => {
  const perSMBr = (Number.parseFloat(vr) / Number.parseFloat(mr)) * 100;
  const perSMPt = (Number.parseFloat(ve) / Number.parseFloat(me)) * 100;

  let vantagem = "";
  let perbr = "";
  let perpt = "";
  let bandBrasil =
    "https://flagdownload.com/wp-content/uploads/Flag_of_Brazil_Flat_Round-1024x1024.png";
  let bandPortugal =
    "https://flagdownload.com/wp-content/uploads/Flag_of_Portugal_Flat_Round-1024x1024.png";
  let bandVantagem = "";

  pr === "" ? (pr = pr) : (pr = `Produto: ${pr}`);

  if (vr !== 0 && ve !== 0) {
    if (perSMPt < perSMBr) {
      vantagem = "Melhor custo benefício em PORTUGAL";
      bandVantagem = bandPortugal;
    } else if (perSMPt > perSMBr) {
      vantagem = "Melhor custo benefício no BRASIL";
      bandVantagem = bandBrasil;
    } else {
      vantagem = "PREÇOS EQUIVALENTES EM R$ E €";
      bandVantagem = "";
    }

    perbr = `Representa ${perSMBr.toLocaleString("pt-br", {
      style: "decimal",
      maximumFractionDigits: 2,
    })}% do salário mínimo brasileiro`;
    perpt = `Representa ${perSMPt.toLocaleString("pt-br", {
      style: "decimal",
      maximumFractionDigits: 2,
    })}% do salário mínimo português`;
  } else vantagem = "";

  return (
    <div className="vantagens-geral">
      <p className="vantagem">
        {vantagem} {<img src={bandVantagem} className="bandeiras" />}
      </p>
      <p className="produto">{pr}</p>
      <p
        className={`percent ${
          bandVantagem === bandBrasil ? "mais-vantajoso" : "menos-vantajoso"
        }`}
      >
        {perbr}
      </p>
      <p
        className={`percent ${
          bandVantagem === bandPortugal ? "mais-vantajoso" : "menos-vantajoso"
        }`}
      >
        {perpt}
      </p>
    </div>
  );
};

export default EquivalenciaBrPt;
