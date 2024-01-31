import { useMemo, useEffect } from "react";
import useGetDate from "./hooks/useGetDate";
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
import { Routes, Route, useLocation } from "react-router-dom";
// Material UI
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { setWorkoutOfTheDay } from "./redux/features/entrainements/workoutsSlice";

export default function App() {
  useGetDate();
  const dispatch = useDispatch();
  const jourActuel = useSelector((state) => state.whatDate.today);
  

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

  // Avoir l'entrainement du jour
  useEffect(() => {
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
  }, [dispatch, jourActuel]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route exact path="/" element={<Navtabs theme={theme.palette.mode} />}>
            <Route exact path="dashboard" element={<Dashboard theme={theme.palette.mode} />} />
            <Route exact path="menu" element={<Menu theme={theme.palette.mode} />} />
            <Route exact path="listedecourses" element={<ShoppingList />} />
            <Route exact path="entrainements" element={<Entrainements />} />
            <Route exact path="rappels" element={<Rappels />} />
            <Route exact path="tasks" element={<Tasks />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}
