import { FC, FormEvent } from "react";
import "./SubscribeSection.scss";
import { Button } from "../Button";

export const SubscribeSection: FC = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section className="container subscribe">
      <h3 className="subscribe__title1">Support</h3>
      <h3 className="subscribe__title2">Subscribe Newsletter & get</h3>
      <h3 className="subscribe__title3">Bank News</h3>

      <form className="subscribe__form" onSubmit={handleSubmit}>
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
          <Button type="submit" buttonType="subscribe">
            <img src="/Icons/send.svg" alt="send" className="subscribe__send" />
            <span>Subscribe</span>
          </Button>
        </div>
      </form>
    </section>
  );
};
