import routes from 'constants/routes';

export default function RouteService() {
  this.redirectToLogin = _redirectToLogin
  this.redirectToHome = _redirectToHome
}

// main
function _redirectToLogin(history) {
  history.push(routes.pages.logIn);
}

function _redirectToHome(history) {
  history.push(routes.pages.home);
}