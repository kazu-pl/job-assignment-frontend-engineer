import Nav from "components/Nav";

export default function Editor(): JSX.Element {
  return (
    <>
      <Nav />

      <div className="editor-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">
              <form>
                <fieldset>
                  <fieldset className="form-group">
                    <input type="text" className="form-control form-control-lg" placeholder="Article Title" />
                  </fieldset>
                  <fieldset className="form-group">
                    <input type="text" className="form-control" placeholder="What's this article about?" />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea className="form-control" rows={8} placeholder="Write your article (in markdown)" />
                  </fieldset>
                  <fieldset className="form-group">
                    <input type="text" className="form-control" placeholder="Enter tags" />
                    <div className="tag-list" />
                  </fieldset>
                  <button className="btn btn-lg pull-xs-right btn-primary" type="button">
                    Publish Article
                  </button>
                </fieldset>
              </form>
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
