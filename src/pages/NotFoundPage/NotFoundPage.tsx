import { FC } from "react";
import { NavLink } from "react-router-dom";
import "./NotFoundPage.scss";
import { Layout } from "../../layout";
import { RoutePath } from "../../router";
import { ScrollToTop } from "../../utils";

export const NotFoundPage: FC = () => {
  return (
    <>
      <ScrollToTop />
      <Layout>
        <section className="container notfound">
          <div className="notfound__info">
            <h2 className="notfound__title1">Oops....</h2>
            <h2 className="notfound__title2">Page not found</h2>
            <p className="notfound__text">
              This Page doesn`t exist or was removed! We suggest you go back.
            </p>
            <NavLink to={RoutePath.HOME} className="notfound__button">
              Go back
            </NavLink>
          </div>

          <div className="notfound__image">
            <img src="/Images/404Image.png" alt="not found" />
          </div>
        </section>
      </Layout>
    </>
  );
};
