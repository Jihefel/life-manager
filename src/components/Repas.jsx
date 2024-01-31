import AspergesIngredient from "./AspergesIngredient";

function Repas(props) {
  return (
    <>
      <h3 className="text-xl text-slate-400 underline">Ingrédients</h3>
      <ul>
        {props.repas.ingredients.map((ingr, index) => (
          <li key={index + ingr.nom}>
            <span className="text-slate-500">{ingr.quantite}</span> {ingr.nom === "Asperges" ? <AspergesIngredient /> : ingr.nom}
          </li>
        ))}
      </ul>
      <h3 className="text-xl text-slate-400 underline">Instructions</h3>
      <ol>
        {props.repas.instructions.map((etape, index) => (
          <li key={index}>{etape}</li>
        ))}
      </ol>
    </>
  );
}

export default Repas;
