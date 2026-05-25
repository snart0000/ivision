import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { contactSchema } from "../schema/contactSchema";
import "../styles/contact.scss";
import contactVideo from "../assets/media/contact-vid.mp4";

type FormData = {
  name: string;
  email: string;
  contactNumber: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const COOLDOWN_TIME = 60 * 1000;
const COOLDOWN_KEY = "contactFormCooldownEnd";

const ContactUs = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    contactNumber: "+63 ",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSending, setIsSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    const updateCooldown = () => {
      const cooldownEnd = Number(localStorage.getItem(COOLDOWN_KEY)) || 0;
      const remaining = Math.max(0, Math.ceil((cooldownEnd - Date.now()) / 1000));

      setCooldown(remaining);

      if (remaining <= 0) {
        localStorage.removeItem(COOLDOWN_KEY);
      }
    };

    updateCooldown();

    const interval = setInterval(updateCooldown, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!statusMessage) return;

    const timer = setTimeout(() => {
      setStatusMessage("");
    }, 5000);

    return () => clearTimeout(timer);
  }, [statusMessage]);

  const formatContactNumber = (value: string) => {
    const digits = value.replace(/\D/g, "").replace(/^63/, "").slice(0, 10);

    const part1 = digits.slice(0, 3);
    const part2 = digits.slice(3, 6);
    const part3 = digits.slice(6, 10);

    let formatted = "+63 ";
    if (part1) formatted += part1;
    if (part2) formatted += `-${part2}`;
    if (part3) formatted += `-${part3}`;

    return formatted;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "name") {
      const lettersOnly = value.replace(/[^A-Za-z\s.'-]/g, "");
      setFormData((prev) => ({ ...prev, name: lettersOnly }));
      return;
    }

    if (name === "contactNumber") {
      setFormData((prev) => ({
        ...prev,
        contactNumber: formatContactNumber(value),
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const startCooldown = () => {
    const cooldownEnd = Date.now() + COOLDOWN_TIME;
    localStorage.setItem(COOLDOWN_KEY, String(cooldownEnd));
    setCooldown(60);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (cooldown > 0) {
      setStatusMessage(`Please wait ${cooldown}s before sending again.`);
      return;
    }

    const result = contactSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: FormErrors = {};

      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof FormData;
        fieldErrors[field] = issue.message;
      });

      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setIsSending(true);
    setStatusMessage("");

    try {
      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID as string,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID as string,
        {
          name: result.data.name,
          email: result.data.email,
          from_name: result.data.name,
          from_email: result.data.email,
          contact_number: result.data.contactNumber,
          message: result.data.message,
          to_email: "ivision.0426@gmail.com",
        },
        {
          publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY as string,
        }
      );

      setStatusMessage("Message sent successfully!");
      startCooldown();

      setFormData({
        name: "",
        email: "",
        contactNumber: "+63 ",
        message: "",
      });
    } catch (error) {
      console.error(error);
      setStatusMessage("Failed to send message. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="contact-us" id="contact-us">
      <video className="contact-us__video" autoPlay loop muted playsInline>
        <source src={contactVideo} type="video/mp4" />
      </video>

      <div className="contact-us__overlay"></div>

      <div className="contact-us__content">
        <p className="contact-us__label">Contact Us</p>

        <div className="contact-us__wrapper">
          <div className="form-container">
            <form className="form" onSubmit={handleSubmit}>
              {/* <span className="heading">Send Message</span> */}

              <div className="form-group">
                <input
                  className="form-input"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <label>Name</label>
                {errors.name && <small>{errors.name}</small>}
              </div>

              <div className="form-group">
                <input
                  className="form-input"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <label>Email</label>
                {errors.email && <small>{errors.email}</small>}
              </div>

              <div className="form-group">
                <input
                  className="form-input"
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  maxLength={16}
                />
                <label>Contact Number</label>
                {errors.contactNumber && <small>{errors.contactNumber}</small>}
              </div>

              <div className="form-group">
                <textarea
                  className="form-input message-input"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                />
                <label>Message</label>
                {errors.message && <small>{errors.message}</small>}
              </div>

              {statusMessage && <p className="form-status">{statusMessage}</p>}

              <button type="submit" disabled={isSending || cooldown > 0}>
                {isSending
                  ? "SENDING..."
                  : cooldown > 0
                  ? `WAIT ${cooldown}s`
                  : "SUBMIT"}
              </button>
            </form>
          </div>

          <div className="contact-us__info">
            <h2>Get In Touch</h2>

            <p className="contact-us__description">
              Ready to build something amazing?
              <br />
              Our team is always excited to collaborate and bring ideas to life.
            </p>

            <div className="contact-us__details">
              <p>
                <FaMapMarkerAlt />
                Bucana Malaki, Naic, Cavite
              </p>

              <p>
                <FaPhoneAlt />
                +63 923 359 3143
              </p>

              <p>
                <FaEnvelope />
                ivision.0426@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;