// import Home from "../screens/Home";

import { DataProvider } from "../context/DataContext";
import RootLayout from "./Rootlayout";

export default function Index() {
  return (
    <DataProvider>
      <RootLayout />
    </DataProvider>
  );
}
