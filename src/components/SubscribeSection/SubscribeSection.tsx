import { FC } from "react";
import "./SubscribeSection.scss";

const SubscribeSection: FC = () => {
  return (
    <section className="container subscribe">
      <h3 className="subscribe__title1">Support</h3>
      <h3 className="subscribe__title2">Subscribe Newsletter & get</h3>
      <h3 className="subscribe__title3">Bank News</h3>

      <form action="post" className="subscribe__form">
        <div className="subscribe__input_container">
          <img
            src="/Icons/email.svg"
            alt="email"
            className="subscribe__email"
          />
          <input
            type="email"
            placeholder="Your email"
            className="subscribe__input"
          />
          <button type="submit" className="subscribe__submit">
            <img src="/Icons/send.svg" alt="send" className="subscribe__send" />
            <span>Subscribe</span>
          </button>
        </div>
      </form>
    </section>
  );
};

export default SubscribeSection;
