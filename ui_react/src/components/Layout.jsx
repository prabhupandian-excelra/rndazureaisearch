import { useState } from "react";
// import Footer from "./Footer";
import MainContent from "./MainContent";
import Header from "./Header";
const Layout = () => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);
  return (
    <div className="layout">
      <Header setData={setData} selected={selected} />
      <MainContent
        data={data}
        selected={selected}
        setSelected={setSelected}
        setData={setData}
      />
      {/* <Footer /> */}
    </div>
  );
};
export default Layout;
