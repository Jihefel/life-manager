import React, { useState } from "react";
// Components
import Navtabs from "./components/Navtabs";
import Error from "./components/Error";
import Scheduler from "./components/Scheduler";
import Rappels from "./components/Rappels";
import Tasks from "./components/Tasks";
// React Router
import { Routes, Route } from "react-router-dom";
// Material UI
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

export default function App() {
  //ANCHOR - States
  const [value, setValue] = useState(0);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  //ANCHOR - Comportements
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  //ANCHOR - Render
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route
            path="/"
            element={<Navtabs value={value} setValue={setValue} handleChange={handleChange} />}
          >
            <Route
              path="scheduler"
              element={<Scheduler theme={theme.palette.mode} />}
            />
            <Route path="rappels" element={<Rappels />} />
            <Route path="tasks" element={<Tasks />} />
          </Route>
          <Route path="/*" element={<Error />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}
