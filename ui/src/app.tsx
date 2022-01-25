import { Route, Routes } from "react-router-dom";
import ScreenIndex from "./screens";

export default function App() {
  return (
    <Routes>
      <Route index element={<ScreenIndex />} />
    </Routes>
  );
}
