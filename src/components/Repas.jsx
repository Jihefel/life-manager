function Repas(props) {
  return (
    <>
      <h3 className='text-xl text-slate-400 underline'>Ingrédients</h3>
      <ul>
        {props.repas.ingredients.map((ingr, index) => (
          <li key={index + ingr.nom}>
            <span className='text-slate-500'>{ingr.quantite}</span>{" "}
            {ingr.nom === "Asperges" ? (
              <>
                <img src='https://img.icons8.com/color/48/null/asparagus.png' style={{ height: "1.1rem", width: "1.3rem" }} alt='Asperges' />
                <span>&thinsp;Asperges</span>
              </>
            ) : (
              ingr.nom
            )}
          </li>
        ))}
      </ul>
      <h3 className='text-xl text-slate-400 underline'>Instructions</h3>
      <ol>
        {props.repas.instructions.map((etape, index) => (
          <li key={index}>{etape}</li>
        ))}
      </ol>
    </>
  );
}

export default Repas;
