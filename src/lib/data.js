import { GiMeal, GiMuscularTorso } from "react-icons/gi";
import { MdDashboard } from "react-icons/md";
import { TfiShoppingCartFull } from "react-icons/tfi";

// Navtabs
export const valueToPathMap = {
  0: { nom: "Tableau de bord", url: "/dashboard", icon: <MdDashboard /> },
  1: { nom: "Menu", url: "/menu", icon: <GiMeal /> },
  2: {
    nom: "Liste de courses",
    url: "/listedecourses",
    icon: <TfiShoppingCartFull />,
  },
  3: {
    nom: "Entrainements",
    url: "/entrainements",
    icon: <GiMuscularTorso />,
  },
  // 4: { nom: "Tâches", url: "/tasks", icon: <FaTasks /> },
  // 5: { nom: "Rappels", url: "/rappels", icon: <RiAlarmWarningLine /> },
};
