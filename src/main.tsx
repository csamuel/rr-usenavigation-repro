import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigation,
} from "react-router";

function Home() {
  const navigation = useNavigation();

  // On react-router 7.14.x this compiled fine: narrowing `state !== "idle"`
  // narrowed `navigation.location` from `Location | undefined` to `Location`.
  //
  // On react-router 7.15.1 this errors:
  //   TS18048: 'navigation.location' is possibly 'undefined'.
  //
  // The app still RUNS correctly — only the types regressed. Run the type
  // checker to see the failure:  `npm run typecheck`
  const isNavigating =
    navigation.state !== "idle" && navigation.location.pathname.length > 0;

  return <p>{isNavigating ? "Navigating…" : "Idle"}</p>;
}

const router = createBrowserRouter([{ path: "/", element: <Home /> }]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
