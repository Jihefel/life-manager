import { useEffect, useState } from "react";
import menus from "../assets/data/menus.json";
import { Button, List, ListItem, ListItemButton, ListItemText, Checkbox } from "@mui/material";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setSortedCheckedIngredients } from "../redux/features/ingredients/selectedIngredientsSlice";
import { TextField } from "@mui/material";

function ShoppingList() {
  const [allChecked, setAllChecked] = useState(false);
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [sortedIngredients, setSortedIngredients] = useState([]);
  const [sortedIngredientsSaved, setSortedIngredientsSaved] = useState([]);
  // const [sortedCheckedIngredients, setSortedCheckedIngredients] = useState([]);
  const sortedCheckedIngredients = useSelector((state) => state.selectedIngredients.sortedCheckedIngredients);
  const ingredientsFromMenus = useSelector((state) => state.selectedIngredients.ingredientsFromMenus);

  const dispatch = useDispatch();

  const handleButtonClick = (ingredient) => {
    if (checkedIngredients.includes(ingredient)) {
      setCheckedIngredients(checkedIngredients.filter((item) => item !== ingredient));
    } else {
      setCheckedIngredients([...checkedIngredients, ingredient]);
    }
  };

  const changeAll = () => {
    setAllChecked(!allChecked);
  };

  useEffect(() => {
    allChecked ? setCheckedIngredients(sortedIngredients) : setCheckedIngredients([]);
  }, [allChecked, sortedIngredients]);

  useEffect(() => {
    const sorted = [...ingredientsFromMenus].sort((a, b) => {
      const nameA = a.nom.substring(a.nom.indexOf(" ") + 1); // Exclut l'émoji et l'espace avant le nom
      const nameB = b.nom.substring(b.nom.indexOf(" ") + 1); // Exclut l'émoji et l'espace avant le nom
      return nameA.localeCompare(nameB);
    });
    setSortedIngredients(sorted);
    setSortedIngredientsSaved(sorted);
  }, [ingredientsFromMenus, allChecked]);

  useEffect(() => {
    const sorted = [...checkedIngredients].sort((a, b) => {
      const nameA = a.nom.substring(a.nom.indexOf(" ") + 1); // Exclut l'émoji et l'espace avant le nom
      const nameB = b.nom.substring(b.nom.indexOf(" ") + 1); // Exclut l'émoji et l'espace avant le nom
      return nameA.localeCompare(nameB);
    });
    dispatch(setSortedCheckedIngredients(sorted));
  }, [checkedIngredients]);


  const handleSearch = (event) => {
    const recherche = event.target.value.toLowerCase();

    const filteredIngredients = [...sortedIngredientsSaved].filter(ingredient => ingredient.nom.toLowerCase().includes(recherche))

    if (filteredIngredients) setSortedIngredients(filteredIngredients)

    if (recherche === '')  setSortedIngredients(sortedIngredientsSaved)
  }
  

  return (
    <Container>
      <div className='ingredients flex flex-col flex-wrap items-center mt-12'>
        <div className='mb-4'>
          <Checkbox
            checked={allChecked}
            onChange={changeAll}
          />
          <span>Tous</span>
        </div>
        <div className='searchbar mb-5'>
          <TextField
            id='outlined-controlled'
            label='Recherche'
            variant='outlined'
            onChange={handleSearch}
          />
        </div>
        <div className='flex flex-wrap justify-center mb-5'>
          {sortedIngredients?.map((ingredient, index) => (
            <Button
              onClick={() => handleButtonClick(ingredient)}
              key={index}
              variant={sortedCheckedIngredients.includes(ingredient) ? "outlined" : "text"}
            >
              {ingredient.nom}
            </Button>
          ))}
        </div>
      </div>
      <List dense>
        {sortedCheckedIngredients?.map((ingredient, index) => (
          <ListItem
            className='infos-ingredients'
            key={index + " " + ingredient.nom}
          >
            <ListItemButton>
              <ListItemText>
                {ingredient.nom} - {ingredient.quantite.valeur} {ingredient.quantite.unite}
              </ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default ShoppingList;
