import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import Loadable from 'react-loadable'

import Loader from 'components/LayoutComponents/Loader'
import IndexLayout from 'layouts'
import NotFoundPage from 'containers/404'

const loadable = loader =>
  Loadable({
    loader,
    delay: false,
    loading: () => <Loader />,
  })

const routes = [
  // System Pages
  {
    path: '/user/login',
    component: loadable(() => import('containers/user/login')),
    exact: true,
  },
  {
    path: '/user/signup',
    component: loadable(() => import('containers/user/signup')),
    exact: true,
  },
  {
    path: '/user/signup2',
    component: loadable(() => import('containers/user/signup/step2')),
    exact: true,
  },
  {
    path: '/user/signup3',
    component: loadable(() => import('containers/user/signup/step3')),
    exact: true,
  },
  {
    path: '/user/signup4',
    component: loadable(() => import('containers/user/signup/step4')),
    exact: true,
  },
  {
    path: '/user/signup',
    component: loadable(() => import('pages/user/signup')),
    exact: true,
  },
  {
    path: '/user/signup2',
    component: loadable(() => import('pages/user/signup/step2')),
    exact: true,
  },
  {
    path: '/user/signup3',
    component: loadable(() => import('pages/user/signup/step3')),
    exact: true,
  },
  {
    path: '/user/signup4',
    component: loadable(() => import('pages/user/signup/step4')),
    exact: true,
  },
  {
    path: '/user/forgot',
    component: loadable(() => import('containers/user/forgot')),
    exact: true,
  },

  // Dashboards
  {
    path: '/dashboard/alpha',
    component: loadable(() => import('containers/dashboard/alpha')),
  },
  {
    path: '/dashboard/customers',
    component: loadable(() => import('containers/customer')),
  },
]

class Router extends React.Component {
  render() {
    const { history } = this.props
    return (
      <ConnectedRouter history={history}>
        <IndexLayout>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/dashboard/alpha" />} />
            {routes.map(route => (
              <Route
                path={route.path}
                component={route.component}
                key={route.path}
                exact={route.exact}
              />
            ))}
            <Route component={NotFoundPage} />
          </Switch>
        </IndexLayout>
      </ConnectedRouter>
    )
  }
}

export default Router
