import { FC, FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { Button, Title } from "../../components";
import "./SubscribeSection.scss";

export const SubscribeSection: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    const successStorage = sessionStorage.getItem("subscribeSuccess");
    if (successStorage === "true") setSuccess(true);
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const resp = await axios.post("http://localhost:8080/email", { email });
      if (resp.status === 200) {
        setSuccess(true);
        setEmail("");
        sessionStorage.setItem("subscribeSuccess", "true");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="subscribe">
      <h3 className="subscribe__title">Support</h3>
      <Title
        title="Subscribe Newsletter & get"
        color="#1c1c1e"
        marginBottom={26}
      />
      <Title title="Bank News" color="#1c1c1e" fontWeight={500} />

      <form className="subscribe__form" onSubmit={handleSubmit}>
        {success ? (
          <Title title="You are already subscribed to the bank's newsletter" />
        ) : (
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button
              type="submit"
              buttonType="subscribe"
              paddingY={3}
              paddingX={13}
              borderRadius={20}
            >
              <img
                src="/Icons/send.svg"
                alt="send"
                className="subscribe__send"
              />
              <span>Subscribe</span>
            </Button>
          </div>
        )}
      </form>
    </section>
  );
};
