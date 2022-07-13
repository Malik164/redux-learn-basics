import Counter from "./containers/Counter";

import "./containers/css/bootstrap.min.css"
import Layout from "./layout/Layout";
import AxiosTut from "./containers/AxiosTut";
import { Route, Routes } from "react-router";
import InfiniteScroll from "./containers/InfiniteScroll";

function App() {
  return (
    <Layout>

        <Routes>
        <Route path="/" exact element={<Counter />} />
        <Route path="/axios" element={<AxiosTut />} />
        <Route path="/scroll" element={<InfiniteScroll />} />
      </Routes>

      </Layout>

  );
}

export default App;
