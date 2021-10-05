import styled from "styled-components"

export const ContactWrapper = styled.section`
  margin-bottom: 200px;
  height: 100%;
  width: 80%;
  @media (max-width: 478px) {
    width: 100%;
  }
`

export const ContactBox = styled.div`
  width: calc(100% - 30px);
  position: relative;
  height: 400px;
  margin-bottom: 50px;
  margin-top: 150px;
  background: #8579f9;
  padding: 20px;
  border-radius: 10px;
  @media (max-width: 1000px) {
    width: 100%;
    padding: 10px;
    margin-top: 50px;
  }
`
export const LeftContent = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 6%;
  width: fit-content;
  text-align: center;
  &,
  p,
  h3 {
    color: #f8f8f8;
  }
  @media (max-width: 1000px) {
    display: none;
  }
`

export const ContactForm = styled.form`
  position: absolute;
  width: 70%;
  top: -50px;
  right: -40px;
  padding: 50px 30px;
  background: #000b1d;
  border-radius: 10px;
  min-height: 400px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.05);
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "email name"
    "textarea textarea"
    ". button";

  label span {
    font-size: 0.85em;
    color: white;
  }
  textarea,
  input {
    color: white;
  }

  .label__email {
    grid-area: email;
  }

  .label__name {
    grid-area: name;
  }

  .label__message {
    grid-area: textarea;
  }

  .submit__btn {
    justify-self: end;
    width: fit-content;
    grid-area: button;
  }

  @media (max-width: 768px) {
    grid-template-areas:
      "email email"
      "name name"
      "textarea textarea"
      ". button";
  }

  input,
  textarea {
    padding: 10px 15px;
    border-radius: 5px;
    background-color: #0c1a34;
    border: none;
    margin: 10px 0;
    width: 100%;
  }

  textarea {
    margin: 10px 0;
    width: 100%;
    height: 200px;
    resize: none;
  }

  @media (max-width: 1000px) {
    input,
    textarea {
      padding: 20px 15px;
    }

    padding: 30px 25px 20px;
    position: unset;
    width: 100%;
    top: 0px;
    right: 0px;
  }
`
export const Recieved = styled.div`
  width: calc(100% - 30px);
  position: relative;
  height: 400px;
  margin-bottom: 50px;
  margin-top: 200px;
  transform: translateY(-50%);
  text-align: center;
  &,
  p,
  h3 {
    color: #f8f8f8;
  }
`
