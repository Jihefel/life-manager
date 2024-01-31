import { useEffect } from "react";
import { useDispatch } from "react-redux";
import menus from "../assets/data/menus.json";
import { setIngredientsFromMenus } from "../redux/features/ingredients/selectedIngredientsSlice";

const useComputeIngredientsQty = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const linkedIngredients = [];

    // Parcours des jours de la semaine
    Object.keys(menus).forEach((jour) => {
      // Parcours chaque repas du jour
      Object.keys(menus[jour].v1).forEach((repas) => {
        // Parcours chaque ingrédient du repas
        menus[jour].v1[repas].ingredients.forEach((ingredient) => {
          const { nom, quantite } = ingredient;

          let valeur, unite;

          const quantiteRegex = /(\d+(\.\d+)?)/; // Recherche d'un ou plusieurs chiffres

          const fractionMap = {
            "1/2": 0.5,
            "1/3": 0.33,
            "1/4": 0.25,
            // Ajoutez d'autres fractions courantes ici si nécessaire
          };

          if (fractionMap.hasOwnProperty(quantite)) {
            valeur = fractionMap[quantite];
            unite = "";
          } else {
            const match = quantite.match(quantiteRegex);
            if (match) {
              valeur = parseFloat(match[0]);
              unite = quantite.replace(valeur, "").trim();
            } else {
              valeur = "";
              unite = quantite;
            }
          }

          // Recherche d'un ingrédient avec le même nom
          const existingIngredient = linkedIngredients.find((ing) => ing.nom === nom);

          if (existingIngredient) {
            // Si un ingrédient avec le même nom existe, additionne les quantités
            existingIngredient.quantite.valeur += valeur;
          } else {
            // Sinon, ajoute un nouvel ingrédient
            linkedIngredients.push({
              nom,
              quantite: {
                valeur,
                unite,
              },
            });
          }
        });
      });
    });

    dispatch(setIngredientsFromMenus(linkedIngredients));
  }, [dispatch]);
};

export default useComputeIngredientsQty;
