import React from 'react';
import {FaHandshake,FiSend} from "react-icons/all";

import Button from "../../commons/Button";
import PageHeader from "../../commons/PageHeader";
import useForm from "./useForm";

import {
    ContactWrapper,
    LeftContent,
    ContactBox,
    ContactForm,
} from './Contact.style';

function Contact() {
    const { formData, errors, handleInput, isFormValid } = useForm();

    return (
        <ContactWrapper id="contact">
            <PageHeader>Get In Touch</PageHeader>
            <ContactBox>
                <LeftContent>
                    <FaHandshake style={{fontSize:'5em'}}/>
                    <h3>Thank You</h3>
                    <p>Do You Have Any Queries?</p>
                </LeftContent>
                <ContactForm
                    noValidate
                    action="https://formspree.io/hazru.anurag@gmail.com"
                    method="POST"
                >
                    <label className="label__email">
                        <span>Email</span>
                        <input
                            className={errors._replyto && 'invalid'}
                            onChange={handleInput}
                            value={formData.email}
                            id="email"
                            name="_replyto"
                            type="email"
                            required
                            placeholder="example@gmail.com"
                        />
                    </label>
                    <label className="label__name">
                        <span>Name</span>
                        <input
                            className={errors.name && 'invalid'}
                            onChange={handleInput}
                            value={formData.name}
                            name="name"
                            type="text"
                            required
                            placeholder="John Doe"
                        />
                    </label>
                    <label className="label__message">
                        <span>Message</span>
                        <textarea
                            className={errors.message && 'invalid'}
                            onChange={handleInput}
                            value={formData.message}
                            name="message"
                            required
                            placeholder="Hey there!"
                        />
                    </label>

                    <Button
                        disabled={!isFormValid}
                        className="submit__btn"
                        as="button"
                        type="submit"
                        value="send"
                    >
                        <FiSend/> Submit
                    </Button>
                </ContactForm>
            </ContactBox>
        </ContactWrapper>
    );
}
export default Contact;