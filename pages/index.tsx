"use client";
import type {NextPage} from 'next';
import {Nav} from '../components/navbar/navbar';
import {Layout} from '../components/navbar/layout';
import {Hero} from '../components/hero';
import {Box} from '../components/styles/box';
import {Footer} from '../components/footer';



import { useState } from "react";
import axios from "axios";

//ngjfkd
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
      setAnimation(res.data.matchedCommand); // should triggr animation
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
            {/* <Footer /> */}
         </Box>
      </Layout>
   );
};

export default Home;
