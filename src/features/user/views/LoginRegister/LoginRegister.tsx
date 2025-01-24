import { loginUser } from "features/user/store/userSlice";
import { useCallback } from "react";
import { useAppDispatch } from "store/hooks";
import { Formik, Form, FormikHelpers, Field } from "formik";
import { LoginUserRequest } from "types/conduit-api.types";

const initialLoginFormValues: LoginUserRequest["user"] = {
  email: "",
  password: "",
};

export default function LoginRegister(): JSX.Element {
  const dispatch = useAppDispatch();

  const handleLoginUserFormik = useCallback(
    (values: LoginUserRequest["user"], helpers: FormikHelpers<LoginUserRequest["user"]>) => {
      dispatch(loginUser({ user: values }));
    },
    [dispatch]
  );

  return (
    <>
      <nav className="navbar navbar-light">
        <div className="container">
          <a className="navbar-brand" href="/#">
            conduit
          </a>
          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              {/* Add "active" class when you're on that page" */}
              <a className="nav-link active" href="/#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#/editor">
                <i className="ion-compose" />
                &nbsp;New Article
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#/settings">
                <i className="ion-gear-a" />
                &nbsp;Settings
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#/login">
                Sign in
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#/register">
                Sign in
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign in</h1>
              <p className="text-xs-center">
                <a href="">Have an account?</a>
              </p>

              <Formik
                initialValues={initialLoginFormValues}
                onSubmit={handleLoginUserFormik}
                // below we can put some validation rules
                // validationSchema={validationFileSchema}
                enableReinitialize
              >
                {({ isSubmitting }) => (
                  <Form>
                    <fieldset className="form-group">
                      <Field className="form-control form-control-lg" type="text" placeholder="email" name="email" />
                    </fieldset>
                    <fieldset className="form-group">
                      <Field
                        className="form-control form-control-lg"
                        type="password"
                        placeholder="password"
                        name="password"
                      />
                    </fieldset>
                    <button className="btn btn-lg btn-primary pull-xs-right">Sign in</button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>

      <footer>
        <div className="container">
          <a href="/#" className="logo-font">
            conduit
          </a>
          <span className="attribution">
            An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design
            licensed under MIT.
          </span>
        </div>
      </footer>
    </>
  );
}
