import { Header } from "components/Header";
import { Container } from "components/Container";
import { SearchField } from "components/SearchField";

function App() {
  return (
    <div className="App">
      <Container>
        <Header />
        <SearchField />
      </Container>
    </div>
  );
}

export default App;
