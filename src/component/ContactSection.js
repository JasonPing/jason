import React from "react";

import { Carton } from "./Carton";

function ContactSection() {
  return (
    <section className="section dark-blue-bg">
      <Carton />
      <div className="contact-section">
        <h1>Get in touch</h1>

        <div className="svg-wrapper">
          <a
            className="btn"
            href="mailto:eazyee6@gmial.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>
              <span>
                <p>eazyee6@gmail.com</p>
              </span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

export { ContactSection };
