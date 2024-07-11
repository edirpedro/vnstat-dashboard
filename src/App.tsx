import AppProviders from "./AppContext";
import Dashboard from "./components/dashboard/Dashboard";
import Logo from "./components/logo/Logo";
import Menu from "./components/menu/Menu";
import Summary from "./components/summary/Summary";
import ReportsProvider from "./components/reports/ReportsContext";
import Reports from "./components/reports/Reports";
import ChartView from "./components/chart-view/ChartView";
import Themes from "./components/themes/Themes";
import Aside from "./components/aside/Aside";
import { ErrorBoundary } from "react-error-boundary";

function App() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <AppProviders>
        <Themes />
        <Dashboard>
          <Logo />
          <Menu />
          <Aside />
          <Summary />
          <ReportsProvider>
            <Reports />
            <ChartView />
          </ReportsProvider>
        </Dashboard>
      </AppProviders>
    </ErrorBoundary>
  );
}

export default App;
