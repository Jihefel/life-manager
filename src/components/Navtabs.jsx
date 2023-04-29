import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { FaTasks } from "react-icons/fa";
import { RiAlarmWarningLine, RiCalendarTodoFill } from "react-icons/ri";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useEffect } from "react";

export default function Navtabs(props) {
  //ANCHOR - States
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/scheduler":
        props.setValue(0)
        break;
      case "/rappels":
        props.setValue(1)
        break;
      case "/tasks":
        props.setValue(2)
        break;
      default:
        break;
    }
  }, []);
  
  useEffect(() => {
    switch (props.value) {
      case 0:
        navigate("/scheduler");
        break;
      case 1:
        navigate("/rappels");
        break;
      case 2:
        navigate("/tasks");
        break;

      default:
        break;
    }
  }, [props.value]);


  return (
    <>
      <Tabs
        value={props.value}
        onChange={props.handleChange}
        aria-label="icon label tabs example"
        variant="fullWidth"
      >
        <Tab icon={<RiCalendarTodoFill />} label="Planner" />
        <Tab icon={<RiAlarmWarningLine />} label="Rappels" />
        <Tab icon={<FaTasks />} label="Tâches" />
      </Tabs>
      <Outlet />
    </>
  );
}
