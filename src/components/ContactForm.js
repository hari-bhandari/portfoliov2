import React, { useState } from "react"
import styled from "styled-components"
import profile from "../content/profile.json"
import { Arrow } from "./ui"

const Form = styled.form`
  display: grid;
  gap: 18px;

  label {
    display: grid;
    gap: 8px;
    font-size: 14px;
    font-weight: 500;
    color: var(--text-muted);
  }
  input,
  textarea {
    width: 100%;
    font: inherit;
    font-size: 16px;
    color: var(--text);
    background: var(--surface);
    border: 1px solid var(--line-strong);
    border-radius: var(--radius-sm);
    padding: 14px 16px;
    transition:
      border-color 0.3s var(--ease),
      box-shadow 0.3s var(--ease);
  }
  textarea {
    min-height: 160px;
    resize: vertical;
  }
  input:focus,
  textarea:focus {
    outline: none;
    border-color: var(--accent);
    box-shadow: 0 0 0 4px var(--accent-soft);
  }
  .row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px;
  }
  @media (max-width: 640px) {
    .row {
      grid-template-columns: 1fr;
    }
  }
  .hp {
    position: absolute;
    left: -9999px;
  }
`

const Submit = styled.button`
  justify-self: start;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  height: 50px;
  padding: 0 24px;
  border-radius: 999px;
  border: 1px solid var(--text);
  background: var(--text);
  color: var(--bg);
  font: inherit;
  font-weight: 500;
  cursor: pointer;
  transition:
    background-color 0.3s var(--ease),
    border-color 0.3s var(--ease);

  &:hover:not(:disabled) {
    background: var(--accent);
    border-color: var(--accent);
  }
  &:disabled {
    opacity: 0.6;
    cursor: progress;
  }
`

const Message = styled.p`
  font-size: 15px;
  color: ${p => (p.$error ? "var(--accent)" : "var(--text-muted)")};
`

const ContactForm = () => {
  const [state, setState] = useState("idle")

  const onSubmit = async e => {
    e.preventDefault()
    const form = e.currentTarget
    setState("sending")
    try {
      const res = await fetch(profile.contactFormEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      })
      if (!res.ok) throw new Error(String(res.status))
      form.reset()
      setState("sent")
    } catch (err) {
      setState("error")
    }
  }

  if (state === "sent") {
    return <Message role="status">Thank you. Your message has arrived and I will reply as soon as I can.</Message>
  }

  return (
    <Form onSubmit={onSubmit}>
      <div className="row">
        <label>
          Name
          <input name="name" type="text" autoComplete="name" required />
        </label>
        <label>
          Email
          <input name="email" type="email" autoComplete="email" required />
        </label>
      </div>
      <label>
        Message
        <textarea name="message" required />
      </label>
      <label className="hp" aria-hidden="true">
        Leave this empty
        <input name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
      </label>
      <Submit type="submit" disabled={state === "sending"}>
        {state === "sending" ? "Sending" : "Send message"} <Arrow size={14} />
      </Submit>
      <div aria-live="polite">
        {state === "error" && (
          <Message $error>Something went wrong sending that. Please try again, or reach me on LinkedIn.</Message>
        )}
      </div>
    </Form>
  )
}

export default ContactForm
