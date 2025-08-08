"use client";
import type {NextPage} from 'next';
import {Nav} from '../components/navbar/navbar';
import {Layout} from '../components/navbar/layout';
import {Hero} from '../components/hero';
import {Trusted} from '../components/trusted';
import {Box} from '../components/styles/box';
import {Features1} from '../components/features1';
import {Features2} from '../components/features2';
import {Features3} from '../components/features3';
import {Testimonials} from '../components/tesminonials';
import {Statistics} from '../components/statistics';
import {Plans} from '../components/plans';
import {Faq} from '../components/faq';
import {Trial} from '../components/trial';
import {Footer} from '../components/footer';



import { useState } from "react";
import axios from "axios";

const Home: NextPage = () => {

const [response, setResponse] = useState<string>("Enter a command");
const [value, setValue] = useState<string>("");
const [loading, setLoading] = useState<boolean>(false);
const [animation, setAnimation] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);


 const handleSubmit = async () => {
    setLoading(true); 
    setResponse("Thinking..."); 
  try {
    const res = await axios.post("/chat", { question: value });
    const message = res.data.choices[0].message.content;
    setResponse(message);

    if (res.data.matchedCommand) {
      setAnimation(res.data.matchedCommand); // should trigger animation
    } else {
      setAnimation(null); 
    }
  } catch (err) {
    console.error(err);
    setResponse("Error connecting to AI.");
    } finally {
      setLoading(false);
    }
  };

   return (
      <Layout>
         <Nav />
         <Box as="main">
            <Hero />
            {/* <Trusted /> */}
            {/* <Features1 /> */}
            {/* <Features2 /> */}
            {/* <Features3 /> */}
            {/* <Testimonials /> */}
            {/* <Statistics /> */}
            {/* <Plans /> */}
            {/* <Faq /> */}
            {/* <Trial /> */}
            {/* <Footer /> */}
         </Box>
      </Layout>
   );
};

export default Home;
