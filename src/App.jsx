import { useState, useMemo, useEffect } from "react";
// Components
import Navtabs from "./components/Navtabs";
import Error from "./pages/Error";
import Menu from "./pages/Menu";
import Dashboard from "./pages/Dashboard";
import Entrainements from "./pages/Entrainements";
import Rappels from "./pages/Rappels";
import Tasks from "./pages/Tasks";
import ShoppingList from "./pages/ShoppingList";
// Images
import hautDuCorps from "./assets/images/haut-corps.jpg";
import basDuCorps from "./assets/images/bas-corps.jpg";
import fullBody from "./assets/images/corps-entier.jpg";
// React Router
import { Routes, Route } from "react-router-dom";
// Material UI
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
// Redux
import { useDispatch } from "react-redux";
import { getDay, getHour, getMinute } from "./redux/features/date/dateSlice";
import { setIngredientsFromMenus } from "./redux/features/ingredients/selectedIngredientsSlice";
import { setWorkoutOfTheDay } from "./redux/features/entrainements/workoutsSlice";
import menus from "./assets/data/menus.json";

export default function App() {
  const dispatch = useDispatch();

  //NOTE - Value des onglets de la navtab
  const [value, setValue] = useState(0);
  //NOTE - Changement de l'onglet actif
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //NOTE - Détection du thème de l'appareil
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  //NOTE - Application du thème en fonction de celui de l'appareil
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  //Initiales des jours pour les boutons
  const joursAbreges = ["L", "M", "M", "J", "V", "S", "D"];

  // Jours en long
  const jours = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];

  //SECTION - Détection du jour actuel
  const getDate = () => {
    const dateActuelle = new Date();
    const indexDay = dateActuelle.getDay();
    const jourActuel = jours.at(+indexDay - 1);
    const heureActuelle = dateActuelle.getHours();
    const minuteActuelle = dateActuelle.getMinutes();

    return { jourActuel, heureActuelle, minuteActuelle };
  };
  getDate();

  const updateTime = () => {
    const { jourActuel, heureActuelle, minuteActuelle } = getDate();
    dispatch(getDay(jourActuel));
    dispatch(getHour(heureActuelle));
    dispatch(getMinute(minuteActuelle));
  };
  updateTime();
  useEffect(() => {
    const intervalId = setInterval(updateTime, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  //!SECTION

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
  }, []);

  useEffect(() => {
    const { jourActuel } = getDate();
    switch (jourActuel) {
      case "mardi":
        dispatch(setWorkoutOfTheDay({ nom: "Haut du corps", img: hautDuCorps }));
        break;
      case "jeudi":
        dispatch(setWorkoutOfTheDay({ nom: "Bas du corps", img: basDuCorps }));
        break;
      case "samedi":
        dispatch(setWorkoutOfTheDay({ nom: "Full Body", img: fullBody }));
        break;
      default:
        dispatch(setWorkoutOfTheDay(null));
        break;
    }
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route
            exact
            path='/'
            element={
              <Navtabs
                value={value}
                setValue={setValue}
                handleChange={handleChange}
                theme={theme.palette.mode}
              />
            }
          >
            <Route
              exact
              path='dashboard'
              element={
                <Dashboard
                  theme={theme.palette.mode}
                  jours={jours}
                />
              }
            />
            <Route
              exact
              path='menu'
              element={
                <Menu
                  theme={theme.palette.mode}
                  joursAbreges={joursAbreges}
                  jours={jours}
                />
              }
            />
            <Route
              exact
              path='listedecourses'
              element={<ShoppingList />}
            />
            <Route
              exact
              path='entrainements'
              element={<Entrainements />}
            />
            <Route
              exact
              path='rappels'
              element={<Rappels getDate={getDate} />}
            />
            <Route
              exact
              path='tasks'
              element={<Tasks />}
            />
          </Route>
          <Route
            path='*'
            element={<Error />}
          />
        </Routes>
      </ThemeProvider>
    </>
  );
}
