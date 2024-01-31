/* eslint-disable react-hooks/exhaustive-deps */
import { Tab, Tabs } from "@mui/material";
// import { FaTasks } from "react-icons/fa";
// import { RiAlarmWarningLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { valueToPathMap } from "../lib/data";
import Sidebar from "./Sidebar";

export default function Navtabs(props) {
  const navigate = useNavigate();
  const location = useLocation();
  // Value des onglets de la navtab
  const [value, setValue] = useState(0);

  //NOTE - Changement de l'onglet actif
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //SECTION - Hooks pour Offcanvas
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //!SECTION

  //NOTE - L'url change l'onglet actif
  useEffect(() => {
    const pathIndex = Object.values(valueToPathMap).findIndex((item) => item.url === location.pathname);
    if (pathIndex >= 0) setValue(pathIndex);
  }, []);

  //NOTE - L'onglet actif change l'url
  useEffect(() => {
    const activeValue = Object.values(valueToPathMap)[value];

    if (activeValue) navigate(activeValue.url);
  }, [value]);

  return (
    <>
      <Button
        className={`d-lg-none bg-transparent border-0 text-2xl ${props.theme === "dark" ? "text-white" : "text-darkmode"}`}
        onClick={handleShow}
      >
        <HiOutlineMenuAlt2 />
      </Button>

      <Tabs value={value} onChange={handleChange} aria-label="icon label tabs example" variant="fullWidth" className="d-none d-lg-block">
        {Object.values(valueToPathMap).map((item) => (
          <Tab icon={item.icon} label={item.nom} key={item.nom} />
        ))}
      </Tabs>

      <Sidebar theme={props.theme} show={show} setShow={setShow} handleClose={handleClose} location={location} />
      
      <Outlet />
    </>
  );
}
