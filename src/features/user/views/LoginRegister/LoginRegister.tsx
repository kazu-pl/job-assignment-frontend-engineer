import { useCallback } from "react";
import { useAppDispatch } from "store/hooks";
import { Formik, Form, Field } from "formik";
import { LoginUser } from "types/conduit-api.types";
import { useHistory } from "react-router-dom";
import APP_PATHS from "constants/appPaths";
import Nav from "components/Nav";
import { loginUser } from "features/user/store/userSlice.thunks";

const initialLoginFormValues: LoginUser = {
  email: "",
  password: "",
};

export default function LoginRegister(): JSX.Element {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const handleLoginUserFormik = useCallback(
    async (values: LoginUser) => {
      try {
        await dispatch(loginUser({ user: values }));
        history.push(APP_PATHS.ARTICLE_LIST);
      } catch (err) {
        console.log({ err, where: "LoginRegister" });
      }
    },
    [dispatch, history]
  );

  return (
    <>
      <Nav />

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
                  <button className="btn btn-lg btn-primary pull-xs-right" type="submit">
                    Sign in
                  </button>
                </Form>
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
