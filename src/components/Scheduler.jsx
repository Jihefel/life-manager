import { useState } from "react";
import menu from "../assets/data/menus.json";
import {
  ToggleButtonGroup,
  ToggleButton,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

function Scheduler(props) {
  const joursAbreges = ["L", "M", "M", "J", "V", "S", "D"];

  const jours = [
    "lundi",
    "mardi",
    "mercredi",
    "jeudi",
    "vendredi",
    "samedi",
    "dimanche",
  ];

  const dateActuelle = new Date();
  const indexDay = dateActuelle.getDay();
  const jourActuel = jours.at(+indexDay - 1);

  const [selectedDay, setSelectedDay] = useState(jourActuel);
  const [selectedVersion, setSelectedVersion] = useState("v1");

  const changeDay = (e, newDay) => {
    if (newDay === null) {
      return;
    }
    setSelectedDay(newDay);
  };

  const changeVersion = (e, newVersion) => {
    if (newVersion === null) {
      return;
    }
    setSelectedVersion(newVersion);
  };

  return (
    <section className="scheduler pb-6">
      <div
        className={`days flex flex-col justify-center py-6 sticky top-0 ${
          props.theme === "dark" ? "bg-darkmode" : "bg-white"
        }`}
      >
        <ToggleButtonGroup
          color="primary"
          className="flex flex-wrap justify-center"
          exclusive
          value={selectedDay}
          onChange={changeDay}
        >
          {joursAbreges.map((jour, index) => (
            <ToggleButton
              value={jours[index]}
              className="px-3"
              key={jours[index]}
            >
              {jour}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <ToggleButtonGroup
          color="primary"
          className="flex flex-wrap justify-center mt-3"
          exclusive
          value={selectedVersion}
          onChange={changeVersion}
        >
          <ToggleButton value="v1">V1</ToggleButton>
          <ToggleButton value="v2">V2</ToggleButton>
        </ToggleButtonGroup>
      </div>
      <div className="menu container mx-auto">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="center">Repas</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(menu[selectedDay][selectedVersion]).map(
                ([key, value], index) => (
                  <TableRow
                    key={key + " " + selectedDay + " " + selectedVersion}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      className="fw-semibold"
                    >
                      {key}
                    </TableCell>
                    {/*NOTE - Pour afficher les balises html du json en react */}
                    <TableCell dangerouslySetInnerHTML={{ __html: value }} />{" "}
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </section>
  );
}

export default Scheduler;
