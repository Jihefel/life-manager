/* eslint-disable react-hooks/exhaustive-deps */import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
// import { FaTasks } from "react-icons/fa";
// import { RiAlarmWarningLine } from "react-icons/ri";
import { GiMeal, GiMuscularTorso } from "react-icons/gi";
import { MdDashboard } from "react-icons/md";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { TfiShoppingCartFull } from "react-icons/tfi";
import { useNavigate, useLocation, Outlet, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Offcanvas, CloseButton } from "react-bootstrap";

export default function Navtabs(props) {
  const navigate = useNavigate();
  const location = useLocation();

  //SECTION - Hooks pour Offcanvas
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //!SECTION

  //NOTE - Values des onglets (props.value)
  const valueToPathMap = {
    0: { nom: "Tableau de bord", url: "/dashboard", icon: <MdDashboard /> },
    1: { nom: "Repas", url: "/repas", icon: <GiMeal /> },
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
  const classNameForPathMap = `text-xl flex items-center ${props.theme === "dark" ? "text-white" : "text-darkmode"}`;

  //NOTE - L'url change l'onglet actif
  useEffect(() => {
    const pathIndex = Object.values(valueToPathMap).findIndex((item) => item.url === location.pathname);
    if (pathIndex >= 0) props.setValue(pathIndex);
  }, []);

  //NOTE - L'onglet actif change l'url
  useEffect(() => {
    const value = Object.values(valueToPathMap)[props.value];

    if (value) navigate(value.url);
  }, [props.value]);

  
  return (
    <>
      <Button
        className={`d-lg-none bg-transparent border-0 text-2xl ${props.theme === "dark" ? "text-white" : "text-darkmode"}`}
        onClick={handleShow}>
        <HiOutlineMenuAlt2 />
      </Button>

      <Tabs
        value={props.value}
        onChange={props.handleChange}
        aria-label='icon label tabs example'
        variant='fullWidth'
        className='d-none d-lg-block'>
        {Object.values(valueToPathMap).map((item) => (
          <Tab
            icon={item.icon}
            label={item.nom}
            key={item.nom}
          />
        ))}
      </Tabs>

      <Offcanvas
        show={show}
        onHide={handleClose}
        responsive='lg'
        className={props.theme === "dark" ? "bg-darkmode" : "bg-white"}>
        <Offcanvas.Header className='justify-end'>
          {/* <Offcanvas.Title>Responsive offcanvas</Offcanvas.Title> */}
          <CloseButton
            variant={props.theme === "dark" ? "white" : ""}
            onClick={handleClose}
          />
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className='h-full px-3 py-4 overflow-y-auto d-lg-none'>
            <ul className='space-y-2 font-medium list-none pl-0 '>
              {Object.values(valueToPathMap).map((item, index) => (
                <li
                  onClick={() => setShow(!show)}
                  key={index}>
                  <Link
                    to={item.url}
                    className={`flex items-center p-2 rounded-lg ${props.theme === "dark" ? "hover:bg-gray-100 hover:bg-opacity-10" : "hover:bg-gray-100"}`}>
                    <span className={classNameForPathMap}>{item.icon}</span>
                    <span className={`flex-1 ml-3 whitespace-nowrap ${props.theme === "dark" ? "text-white" : "text-darkmode"}`}>{item.nom}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      <Outlet />
    </>
  );
}
