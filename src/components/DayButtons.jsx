import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { JOURS, JOURS_INITIALES } from "../constants/constants";

function DayButtons(props) {
  return (
    <ToggleButtonGroup color="primary" className="flex flex-wrap justify-center py-3" exclusive value={props.selectedDay} onChange={props.changeDay}>
      {JOURS_INITIALES.map((jour, index) => (
        <ToggleButton value={JOURS[index]} className="px-3" key={JOURS[index]} size="small">
          {jour}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

export default DayButtons;
