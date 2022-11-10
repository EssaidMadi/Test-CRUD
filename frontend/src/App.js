import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LandingPage from "./pages/LandingPage/LandingPage";
import MyProducts from "./pages/MyProducts/MyProducts";
import SingleProduct from "./pages/SingleProduct/Singleproduct";
import LoginScreen from "./pages/LoginScreen/LoginScreen";
import RegisterScreen from "./pages/RegisterScreen/RegisterScreen";
import CreateProduct from "./pages/SingleProduct/CreateProduct";
import { useState } from "react";

function App() {
  const [search, setSearch] = useState("");

  return (
    <Router>
      <Header setSearch={(s) => setSearch(s)} />
      <main className="App">
        <Route path="/" component={LandingPage} exact />
        <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route
          path="/myProducts"
          component={({ history }) => (
            <MyProducts search={search} history={history} />
          )}
        />
        <Route path="/product/:id" component={SingleProduct} />
        <Route path="/createproduct" component={CreateProduct} />;
      </main>
      <Footer />
    </Router>
  );
}

export default App;
