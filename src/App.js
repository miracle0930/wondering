import React from 'react';
import { Route, Switch } from 'react-router-dom';
import BFSvsDFS from './pages/algorithms/graph/BFSvsDFS';
import ReduxHook from './pages/hooks/reduxHook/ReduxHook';

const App = () => {

  return (
    <Switch>
      <Route path={routes.bfs_vs_dfs} exact component={BFSvsDFS} />
      <Route path={routes.redux_hook} exact component={ReduxHook} />
    </Switch>
  )

}

const prefix = '/wondering'

const routes = {
  bfs_vs_dfs: prefix + '/bfs-vs-dfs',
  redux_hook: prefix + '/redux-hook'
}

export default App;