import { Header } from "components/Header";
import { Container } from "components/Container";
import { SearchField } from "components/SearchField";
import { VacanciesList } from "components/VacanciesList";

function App() {
  return (
    <div className="App">
      <Container>
        <Header />
        <SearchField />
        <VacanciesList />
      </Container>
    </div>
  );
}

export default App;
