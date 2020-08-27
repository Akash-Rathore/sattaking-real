import React from 'react';
import Banner from "./components/Banner";
import Scoller from "./components/Scoller";
import DateTime from "./components/DateTime";
import CardNumber from "./components/CardNumber";
import WhatupDetails from "./components/WhatupDetails";
import CombinedRecord from "./components/CombinedRecord";
import ShowResult from "./components/ShowResult";
import Spinner from "./components/Spinner";
import Chat from "./components/Chat";
import SliderDown from "./components/SliderDown";

function App() {
  return (<>

    <Banner />
    <Scoller />
    <DateTime />
    <CardNumber />
    <WhatupDetails />
    <CombinedRecord />
    <ShowResult />
    <Spinner />
    <Chat />
   {/*  <SliderDown />
 */}
  </>);
}

export default App;
