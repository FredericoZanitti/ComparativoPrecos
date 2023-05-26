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

    perbr = `Necessita de ${perSMBr.toFixed(
      2
    )}% do salário mínimo brasileiro para adquirí-lo`;
    perpt = `Necessita de ${perSMPt.toFixed(
      2
    )}% do salário mínimo português para adquirí-lo`;
  } else vantagem = "";

  return (
    <>
      <p className="vantagem vantagemPrincipal">
        {vantagem} {<img src={bandVantagem} className="bandeiras" />}
      </p>
      <p className="produto">{pr}</p>
      <p className="percent">{perbr}</p>
      <p className="percent">{perpt}</p>
    </>
  );
};

export default EquivalenciaBrPt;
