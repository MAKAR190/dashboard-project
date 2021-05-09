import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as selectors from "../../redux/auth/authSelectors";
import { urls } from "../../routes";
function PrivateRoute({
  component: Component,
  isAuthenticated,
  ...otherProps
}) {
  return (
    <Route {...otherProps}>
      {(props) => {
        return isAuthenticated && otherProps.restricted ? (
          <Redirect to={urls.dashboard} />
        ) : (
          <Component {...props} />
        );
      }}
    </Route>
  );
}
const mapStateToProps = (state) => ({
  isAuthenticated: selectors.isAuthenticated(state),
});

export default connect(mapStateToProps)(PrivateRoute);
