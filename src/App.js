import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./data/Sidebars/Topbar";
import Sidebar from "./data/Sidebars/Sidebar";
import Dashboard from "./data/dashboard/";
import Team from "./data/team";
import Roles from "./data/Roles";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

function App() {
  // Theme and color mode setup
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true); // Sidebar toggle state

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* Ensures consistent baseline styling */}
        <div className="app">
          {/* Sidebar */}
          <Sidebar isSidebar={isSidebar} />

          {/* Main Content */}
          <main className="content">
            {/* Topbar for navigation or actions */}
            <Topbar setIsSidebar={setIsSidebar} />

            {/* Routing */}
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/users" element={<Team />} />
              <Route path="/roles" element={<Roles />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
