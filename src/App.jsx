import { NextUIProvider } from "@nextui-org/react";
import { RouterProvider } from "react-router-dom";
import route from "./routing/route";

function App() {
  return (
    <NextUIProvider>
      <RouterProvider router={route} />
    </NextUIProvider>
  );
}

export default App;
