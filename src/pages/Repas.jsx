import { useState } from "react";
import menu from "../assets/data/menus.json";
import { ToggleButtonGroup, ToggleButton, Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { MdExpandMore } from "react-icons/md";
import { useSelector } from "react-redux";

function Repas(props) {
  //SECTION - Détection du jour actuel pour afficher le menu du jour
  const jourActuel = useSelector((state) => state.whatDate.today);
  const [selectedDay, setSelectedDay] = useState(jourActuel);

  const changeDay = (e, newDay) => {
    if (newDay === null) {
      return;
    }
    setSelectedDay(newDay);
  };
  //!SECTION

  //NOTE - Changement de version des menus
  const [selectedVersion, setSelectedVersion] = useState("v1");
  const changeVersion = (e, newVersion) => {
    if (newVersion === null) {
      return;
    }
    setSelectedVersion(newVersion);
  };

  //SECTION - Expansion des accordions
  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  //!SECTION

  return (
    <section className='scheduler pb-6'>
      <div className={`days flex flex-col justify-center py-6 sticky top-0 z-10 ${props.theme === "dark" ? "bg-darkmode" : "bg-white"}`}>
        <ToggleButtonGroup
          color='primary'
          className='flex flex-wrap justify-center py-3'
          exclusive
          value={selectedDay}
          onChange={changeDay}
        >
          {props.joursAbreges.map((jour, index) => (
            <ToggleButton
              value={props.jours[index]}
              className='px-3'
              key={props.jours[index]}
              size='small'
            >
              {jour}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
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
      <div className='menu container mx-auto'>
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
              className=' items-center'
            >
              <p
                style={{ width: "31%", flexShrink: 0 }}
                className='flex items-center font-bold mb-0'
              >
                {periode}
              </p>
              {/*NOTE - Pour afficher les balises html du json en react */}
              <small
                className='dark:text-slate-300 flex items-center'
                dangerouslySetInnerHTML={{ __html: repas.titre }}
              ></small>
            </AccordionSummary>
            <AccordionDetails>
              <h1 className='text-xl text-slate-400 underline'>Ingrédients</h1>
              <ul>
                {repas.ingredients.map((ingr, index) => (
                  <li key={index + ingr.nom + selectedDay + periode}>
                    <span className='text-slate-500'>{ingr.quantite}</span>{" "}
                    {ingr.nom === "Asperges" ? (
                      <>
                        <img
                          src='https://img.icons8.com/color/48/null/asparagus.png'
                          style={{ height: "1.1rem", width: "1.3rem" }}
                          alt='Asperges'
                        />
                        <span>&thinsp;Asperges</span>
                      </>
                    ) : (
                      ingr.nom
                    )}
                  </li>
                ))}
              </ul>
              {repas.instructions !== undefined ? (
                <>
                  <h1 className='text-xl text-slate-400 underline'>Instructions</h1>
                  <ol>
                    {repas.instructions.map((etape, index) => (
                      <li key={index + selectedDay + periode}>{etape}</li>
                    ))}
                  </ol>
                </>
              ) : null}
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </section>
  );
}

export default Repas;
