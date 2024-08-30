import { Container } from "components/Container";
import { Header } from "components/Header";
import { NotFound } from "components/NotFound";
import { HomePage } from "components/pages/HomePage";
import { VacancyPage } from "components/pages/VacancyPage";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Container>
      <Header />
      <Outlet />
    </Container>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/section/:vacancyId",
        element: <VacancyPage />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
