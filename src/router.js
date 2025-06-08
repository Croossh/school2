import { Route, Routes } from "react-router-dom";
import Home from "pages/home/Home";
import Warning from "pages/warning/Warning";
import Password from "pages/password/Password";
import Cancel from "pages/cancel/Cancel";
import SelectMoney1 from "pages/selectMoney/SelectMoney1";
import SelectMoney2 from "pages/selectMoney/SelectMoney2";
import SelectMoney3 from "pages/selectMoney/SelectMoney3";
import SelectMoney4 from "pages/selectMoney/SelectMoney4";
import EndStage from "pages/endStage/EndStage";
import Before from "pages/home/Before";

const Router = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Home />} />
      <Route path={"/before"} element={<Before />} />
      <Route path={"/warning"} element={<Warning />} />
      <Route path={"/password"} element={<Password />} />
      <Route path={"/cancel"} element={<Cancel />} />
      <Route path={"/select1"} element={<SelectMoney1 />} />
      <Route path={"/select2"} element={<SelectMoney2 />} />
      <Route path={"/select3"} element={<SelectMoney3 />} />
      <Route path={"/select4"} element={<SelectMoney4 />} />
      <Route path={"/end"} element={<EndStage />} />
    </Routes>
  );
};

export default Router;
