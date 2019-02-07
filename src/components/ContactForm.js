import React from 'react';

import './form.css';

export default () => {
  return (
    <form name="contact" method="post" data-netlify="true" data-netlify-honeypot="bot-field">
      <fieldset>
        <legend>If you would like to contact me in order to discuss accessibility audits and consultancy, please use the following form.</legend>
        <input type="hidden" name="bot-field" value="contact"></input>

        <div className="field">
          <label className="label" htmlFor="name">Name</label>
          <div className="control">
            <input className="input" id="name" type="text" name="name" required/>
          </div>
        </div>

        <div className="field">
          <label className="label" htmlFor="email">Email</label>
          <div className="control">
            <input className="input" id="email" type="email" name="email" required/>
          </div>
        </div>

        <div className="field">
          <label className="label" htmlFor="subject">Subject</label>
          <div className="control">
            <div className="select">
              <select id="subject" name="subject[]">
                <option value="Work opportunity">Work opportunity</option>
                <option value="Saying hello">Saying hello</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>

        <div className="field">
          <label className="label" htmlFor="message">Message</label>
          <div className="control">
            <textarea className="textarea" id="message" name="message" required></textarea>
          </div>
        </div>

        <div className="field">
          <div className="control">
            <button className="button is-link" type="submit">Send message</button>
          </div>
        </div>
      </fieldset>
    </form>
  );
}

