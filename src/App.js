import React from 'react';
import BFSvsDFS from './pages/algorithms/graph/BFSvsDFS';
import { Route, Switch } from 'react-router-dom';

const App = () => {

  return (
    <Switch>
      <Route path={routes.bfs_vs_dfs} exact component={BFSvsDFS} />
    </Switch>
  )

}

const prefix = '/wondering'

const routes = {
  bfs_vs_dfs: prefix + '/bfs-vs-dfs'
}

export default App;