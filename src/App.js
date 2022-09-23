import AppProvider from "./AppContext";
import Dashboard from "./components/dashboard/Dashboard";
import Logo from "./components/logo/Logo";
import Menu from "./components/menu/Menu";
import Summary from "./components/summary/Summary";
import ReportsProvider from "./components/reports/ReportsContext";
import Reports from "./components/reports/Reports";
import ChartView from "./components/chart-view/ChartView";
import Themes from "./components/themes/Themes";
import Aside from "./components/aside/Aside";

function App() {
  return (
    <AppProvider>
      <Themes />
      <Dashboard>
        <Logo column="13/span 4" row="4/span 3" />
        <Menu column="1/span 2" row="1/span 1" />
        <Aside column="1/span 2" row="2/span 6" />
        <Summary column="12/span 5" row="1/span 2" />
        <ReportsProvider>
          <Reports column="3/span 9" row="1/span 7" initial="day" />
          <ChartView column="1/span 16" row="8/span 2" initial="hour" />
        </ReportsProvider>
      </Dashboard>
    </AppProvider>
  );
}

export default App;
