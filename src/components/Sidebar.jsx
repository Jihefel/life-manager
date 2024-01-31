import { CloseButton, Offcanvas } from "react-bootstrap";
import { valueToPathMap } from "../lib/data";
import { Link } from "react-router-dom";
import clsx from "clsx";

function Sidebar(props) {
  const classNameForPathMap = `text-xl flex items-center ${props.theme === "dark" ? "text-white" : "text-darkmode"}`;

  return (
    <Offcanvas show={props.show} onHide={props.handleClose} responsive="lg" className={props.theme === "dark" ? "bg-darkmode" : "bg-white"}>
      <Offcanvas.Header className="justify-end">
        {/* <Offcanvas.Title>Responsive offcanvas</Offcanvas.Title> */}
        <CloseButton variant={props.theme === "dark" ? "white" : ""} onClick={props.handleClose} />
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="h-full px-3 py-4 overflow-y-auto d-lg-none">
          <ul className="pl-0 space-y-2 font-medium list-none ">
            {Object.values(valueToPathMap).map((item, index) => (
              <li onClick={() => props.setShow(!props.show)} key={index}>
                <Link
                  to={item.url}
                  className={clsx("flex items-center p-2 rounded-lg", {
                    "hover:bg-gray-100/10": props.theme === "dark",
                    "hover:bg-gray-100": props.theme !== "dark",
                    "bg-gray-100/10": item.url === props.location.pathname && props.theme === "dark",
                    "bg-gray-100": item.url === props.location.pathname && props.theme !== "dark",
                  })}
                >
                  <span className={classNameForPathMap}>{item.icon}</span>
                  <span className={`flex-1 ml-3 whitespace-nowrap ${props.theme === "dark" ? "text-white" : "text-darkmode"}`}>{item.nom}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default Sidebar;
