import React, {useState} from 'react';
import {FaHandshake,FiSend} from "react-icons/all";
import Button from "../../commons/Button";
import PageHeader from "../../commons/PageHeader";
import useForm from "./useForm";

import {
    ContactWrapper,
    LeftContent,
    ContactBox,
    ContactForm,
} from './ContactFormCSS';

function Contact() {
    const [submitted, setSubmitted] = useState(false)
    const {formData, errors, handleInput, isFormValid} = useForm();
    const sendEmail = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const {_replyto, name, message} = formData
        const raw = JSON.stringify({_replyto, name, message});

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        try {
            await fetch("https://formspree.io/mgenrlnr", requestOptions)
            setSubmitted(true)
        } catch (e) {
            setSubmitted(false)
        }
    }


    return (
            <ContactWrapper id="contact">
                <PageHeader>Let's connect.</PageHeader>
                <ContactBox>
                    {submitted&&(<Recieved><FaHandshake style={{fontSize: '7em'}}/>
                        <p>Your message has been recieved. I will try to get back to you as soon as possible. Thanks</p></Recieved>)}
                    {!submitted&&( <LeftContent>
                        <FaHandshake style={{fontSize: '5em'}}/>
                        <p>I would love to talk to you!</p>
                    </LeftContent>)}
                    {!submitted?(
                    <ContactForm

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
                            onClick={(e)=>{e.preventDefault()
                                sendEmail()
                            }}
                        >
                            <FiSend/> Submit
                        </Button>
                    </ContactForm>):(<div></div>)}
                </ContactBox>
            </ContactWrapper>
        );
}
export default Contact;