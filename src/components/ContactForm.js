import React from 'react';

import './form.css';

export default () => {
  return (
    <form name="contact" method="post" data-netlify="true" data-netlify-honeypot="bot-field">
      <input type="hidden" name="bot-field" value="contact"></input>

      <div className="field">
        <label className="label" htmlFor="name">Name</label>
        <div className="control">
          <input className="input" id="name" type="text" required/>
        </div>
      </div>

      <div className="field">
        <label className="label" htmlFor="email">Email</label>
        <div className="control">
          <input className="input" id="email" type="email" required/>
        </div>
      </div>

      <div className="field">
        <label className="label" htmlFor="subject">Subject</label>
        <div className="control">
          <div className="select">
            <select id="subject">
              <option>Work opportunity</option>
              <option>Saying hello</option>
              <option>Other</option>
            </select>
          </div>
        </div>
      </div>

      <div className="field">
        <label className="label" htmlFor="message">Message</label>
        <div classname="control">
          <textarea className="textarea" id="message" required></textarea>
        </div>
      </div>

      <div className="field">
        <div className="control">
          <button className="button is-link" type="submit">Send message</button>
        </div>
      </div>
    </form>
  );
}

