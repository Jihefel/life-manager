import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { useState } from "react";
import { MdExpandMore } from "react-icons/md";
import { useSelector } from "react-redux";
import menu from "../assets/data/menus.json";
import DayButtons from "../components/DayButtons";
import Repas from "../components/Repas";

function Menu(props) {
  //SECTION - Détection du jour actuel pour afficher le menu du jour
  const jourActuel = useSelector((state) => state.whatDate.today);
  const [selectedDay, setSelectedDay] = useState(jourActuel);

  const changeDay = (e, newDay) => {
    if (newDay === null) return;
    setSelectedDay(newDay);
  };
  //!SECTION

  //NOTE - Changement de version des menus
  const [selectedVersion, setSelectedVersion] = useState("v1");

  const changeVersion = (e, newVersion) => {
    if (newVersion === null) return;
    setSelectedVersion(newVersion);
  };

  //SECTION - Expansion des accordions
  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  //!SECTION

  return (
    <section className="scheduler pb-6">
      <div className={`days flex flex-col justify-center py-6 sticky top-0 z-10 ${props.theme === "dark" ? "bg-darkmode" : "bg-white"}`}>
        <DayButtons selectedDay={selectedDay} changeDay={changeDay} />
        {/* <ToggleButtonGroup
          color='primary'
          className='flex flex-wrap justify-center mt-3'
          exclusive
          value={selectedVersion}
          onChange={changeVersion}
        >
          <ToggleButton
            value='v1'
            size='small'
            className='px-3'
          >
            V1
          </ToggleButton>
          <ToggleButton
            value='v2'
            size='small'
            className='px-3'
            disabled
          >
            V2 🔜
          </ToggleButton>
        </ToggleButtonGroup> */}
      </div>
      <div className="menu container mx-auto">
        {Object.entries(menu[selectedDay][selectedVersion]).map(([periode, repas], index) => (
          <Accordion
            expanded={expanded === `panel${index + selectedDay}`}
            onChange={handleChange(`panel${index + selectedDay}`)}
            key={index + selectedDay}
          >
            <AccordionSummary
              expandIcon={<MdExpandMore />}
              aria-controls={`panel${index}bh-content`}
              id={`panel${index}bh-header`}
              className=" items-center"
            >
              <p style={{ width: "31%", flexShrink: 0 }} className="flex items-center font-bold mb-0">
                {periode}
              </p>
              {/*NOTE - Pour afficher les balises html du json en react */}
              <small className="dark:text-slate-300 flex items-center" dangerouslySetInnerHTML={{ __html: repas.titre }} />
            </AccordionSummary>
            <AccordionDetails>{repas && <Repas repas={repas} />}</AccordionDetails>
          </Accordion>
        ))}
      </div>
    </section>
  );
}

export default Menu;
