import React from 'react'
import { render } from 'react-dom'
import 'fabric-webpack'

import ParallaxScrolling from './page/ParallaxScrolling'
import { AnimatePresence, motion } from "framer-motion"
import { Switch, Route, NavLink, useLocation, Link } from "react-router-dom";

const App = () => {
  const location = useLocation()
  return (<div>
    <main
      className="col-6 col-sm-8 col-md-10 py-5"
      style={{ overflowX: "hidden", position: "relative" }}
    >
      <AnimatePresence>
        <Switch location={location} key={location.pathname}>
          <Route path="/" component={ParallaxScrolling} />
        </Switch>
      </AnimatePresence>
    </main>
  </div>)
}

export default App;
