import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import Loadable from 'react-loadable'
import { connect } from 'react-redux'

import Loader from 'components/LayoutComponents/Loader'
import IndexLayout from 'layouts'
import NotFoundPage from 'containers/404'
import Callback from 'containers/callback'
import * as auth from 'services/auth'

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

  // Customers
  {
    path: '/customer/list',
    component: loadable(() => import('containers/customer')),
  },
  {
    path: '/customer/',
    component: loadable(() => import('containers/customer')),
  },
  {
    path: '/customer/:id',
    component: loadable(() => import('containers/customer')),
  },

  // Passengers
  {
    path: '/excursion/:id/passenger/list',
    component: loadable(() => import('containers/passenger/list')),
  },
  {
    path: '/excursion/:id/passenger/',
    component: loadable(() => import('containers/passenger/box')),
  },

  // Excursion
  {
    path: '/excursion/list',
    component: loadable(() => import('containers/excursion/list')),
  },
  {
    path: '/excursion/',
    component: loadable(() => import('containers/excursion/box')),
  },
]

const mapStateToProps = ({ router }) => ({
  pathname: router.location.pathname,
  search: router.location.search,
  hash: router.location.hash,
})

@connect(mapStateToProps)
class Router extends React.Component {
  async componentDidMount() {
    const { pathname } = this.props
    if (pathname === '/callback') {
      return
    }
    try {
      await auth.silentAuth()
      this.forceUpdate()
    } catch (err) {
      if (err.error === 'login_required') return
      console.log(err.error)
    }
  }

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
            <Route exact path="/callback" component={Callback} />
            <Route component={NotFoundPage} />
          </Switch>
        </IndexLayout>
      </ConnectedRouter>
    )
  }
}

export default Router
