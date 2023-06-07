import { useSelector } from "react-redux";
import menu from "../assets/data/menus.json";
import { useState, useEffect } from "react";
import Entrainements from "./Entrainements";
import Repas from "../components/Repas";

function Dashboard(props) {
  const jourActuel = useSelector((state) => state.whatDate.today);
  const heureActuelle = useSelector((state) => state.whatDate.hour);
  const minuteActuelle = useSelector((state) => state.whatDate.minute);
  const [periodeRepas, setPeriodeRepas] = useState(null);
  const [repasActuel, setRepasActuel] = useState(null);
  
  useEffect(() => {
    
    let periodesDesRepas = Object.keys(menu[jourActuel].v1);
    let collationAujourdhui = periodesDesRepas[1] === "Collation du matin";

    switch (true) {
      // Petit-dejeuner
      case heureActuelle >= 7 && heureActuelle <= 10:
        setPeriodeRepas(periodesDesRepas[0]);
        break;
      // Collation du matin
      case heureActuelle > 10 && (heureActuelle > 10 || (heureActuelle <= 12 && minuteActuelle < 30)):
        collationAujourdhui ? setPeriodeRepas(periodesDesRepas[1]) : setPeriodeRepas(periodesDesRepas[0]);
        break;
      // Déjeuner
      case ((heureActuelle >= 12 && minuteActuelle <= 30) || heureActuelle >= 12) && (heureActuelle < 15 || (heureActuelle === 15 && minuteActuelle < 30)):
        collationAujourdhui ? setPeriodeRepas(periodesDesRepas[2]) : setPeriodeRepas(periodesDesRepas[1]);
        break;
      // Goûter
      case ((heureActuelle >= 15 && minuteActuelle <= 30) || heureActuelle >= 15) && (heureActuelle < 20):
        collationAujourdhui ? setPeriodeRepas(periodesDesRepas[3]) : setPeriodeRepas(periodesDesRepas[2]);
        break;
      // Dîner
      case (heureActuelle >= 20 && heureActuelle < 23):
        collationAujourdhui ? setPeriodeRepas(periodesDesRepas[4]) : setPeriodeRepas(periodesDesRepas[3]);
        break;
      // Collation du soir
      case heureActuelle >= 23 || heureActuelle < 7:
        if (heureActuelle >= 0 && heureActuelle < 7) {
          periodesDesRepas = Object.keys(menu[props.jours[jourActuel === "lundi" ? 6 : props.jours.indexOf(jourActuel) - 1]].v1);
          collationAujourdhui = periodesDesRepas[1] === "Collation du matin";
          collationAujourdhui ? setPeriodeRepas(periodesDesRepas[5]) : setPeriodeRepas(periodesDesRepas[4]);
        } else {
          collationAujourdhui ? setPeriodeRepas(periodesDesRepas[5]) : setPeriodeRepas(periodesDesRepas[4]);
        }
        break;

      default:
        console.error(heureActuelle, minuteActuelle);
        break;
    }
  }, [minuteActuelle]);

  useEffect(() => {
    if (periodeRepas) {
      if (heureActuelle >= 0 && heureActuelle < 7) {
        setRepasActuel(Object.entries(menu[props.jours[jourActuel === "lundi" ? 6 : props.jours.indexOf(jourActuel) - 1]].v1).find((repas) => repas[0] === periodeRepas));
      } else {
        setRepasActuel(Object.entries(menu[jourActuel].v1).find((repas) => repas[0] === periodeRepas));
      }
    }
  }, [periodeRepas]);

  return (
    <div className='grid md:grid-rows-3 md:grid-flow-col gap-md-4 gap-2 p-md-5 py-3 px-1'>
      <div className={`row-span-3 p-md-5 p-3 rounded-lg shadow-lg ${props.theme === "dark" ? "border" : ""}`}>
        <h1 className='py-3 pt-md-0 text-sm'>{periodeRepas ? periodeRepas : null}</h1>
        {repasActuel ? (
          <>
            <h2 className='mb-3'>{repasActuel[1].titre}</h2>
            <Repas repas={repasActuel[1]} />
          </>
        ) : null}
      </div>
      <div className={`row-span-3 p-md-5 p-3 rounded-lg shadow-lg ${props.theme === "dark" ? "border" : ""}`}>
        <h1 className='py-3 pt-md-0 text-sm'>Entraînement du jour</h1>
        <Entrainements />
      </div>
      {/* <div className='row-span-2 col-span-2 bg-pink-400'>
      03
      </div> */}
    </div>
  );
}

export default Dashboard;
