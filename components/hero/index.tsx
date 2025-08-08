import {Button, Divider, Input, Text} from '@nextui-org/react';
import React from 'react';
import {CheckIcon} from '../icons/CheckIcon';
import {Box} from '../styles/box';
import {Flex} from '../styles/flex';
import { useState } from "react";
import axios from "axios";

export const Hero = () => {

 const [response, setResponse] = useState<string>("");
const [value, setValue] = useState<string>("");
const [loading, setLoading] = useState<boolean>(false);
const [animation, setAnimation] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);


 const handleSubmit = async () => {
    setLoading(true); 
    setResponse("Thinking..."); // Display "Thinking..." while processing
  try {
    const res = await axios.post("/api/hello", { question: value });
    const message = res.data.choices[0].message.content;
    setResponse(message);

    if (res.data.matchedCommand) {
      setAnimation(res.data.matchedCommand); // trigger animation

      // reset to default mock.png after animation plays
      setTimeout(() => {
        setAnimation(null);
      }, 3000);

    } else {
      setAnimation(null); // no animation
    }
  } catch (err) {
    console.error(err);
    setResponse("Error connecting to AI.");
    } finally {
      setLoading(false); // loading set to false after bot sends msg
    }
  };

   return (
      <>
         <Flex
            css={{
               'gap': '$3',
               'px': '$6',
               'flexDirection': 'column',
               'alignContent': 'center',
               'justifyContent': 'center',
               // 'alignItems': 'center',
               'width': '100%',
               '@sm': {
                  flexDirection: 'row',
                  mt: '$20',
               },
            }}
            justify={'center'}
         >
            <Box
               css={{
                  pt: '$13',

                  display: 'flex',
                  flexDirection: 'column',
                  gap: '$5',
               }}
            >
               <Box
                  css={{
                     maxWidth: '600px',
                  }}
               >
                  
                  <Text
                     h1
                     css={{
                        display: 'inline',
                     }}
                  >
                     Dutiful{' '}
                  </Text>
               
                  <Text
                     h1
                     css={{
                        display: 'inline',
                     }}
                     color="primary"
                  >
                     Duck
                  </Text>
               </Box>

               <Text
                  css={{
                     color: '$accents8',
                     maxWidth: '400px',
                  }}
                  size={'$lg'}
                  span
               >
                  Enter a command for the dutiful duck. All commands are 1 word. If you don't get it right, the ai helper will guide you to the right answer. Enter them all for an acheivement. 
                  Check back later for updates and more commands
               </Text>

               <Flex
                  css={{
                     gap: '$8',
                     pt: '$4',
                  }}
                  wrap={'wrap'}
               >

                  
                  <Input placeholder="Enter a command" size="lg" onChange={onChange} />
                  <Button onClick={handleSubmit}>Enter</Button>
               </Flex>
               <Flex
                  wrap={'wrap'}
                  css={{
                     'gap': '$8',
                     'py': '$7',
                     '@sm': {
                        py: '$4',
                     },
                  }}
               >
<div>
   <Text
                     css={{
                        color: '$accents8',
                        maxWidth: '400px',
                     }}
                     size={'$lg'}
                     span
                  >
                     <p> {response}</p>
                  </Text>

         
         {/* {animation && (
   <div className="sprite-container">
      <div className={`sprite ${animation}`} />
  </div>
)} */}
      </div>

               </Flex>
            </Box>
            {/* <Box
               css={{
                  '& img': {
                     width: '775px',
                     objectFit: 'contain',
                  },
               }}
            >
               <img src="mock.png" />


            </Box> */}
            
<Box
  css={{
    '& img': {
      width: '775px',
      objectFit: 'contain',
    },
  }}
>
  <img 
    src={animation ? `/images/${animation}.png` : "/images/mock.png"} 
    alt={animation || "Default mock image"} 
  />
</Box>


         </Flex>
         <Divider
            css={{position: 'absolute', inset: '0p', left: '0', mt: '$10'}}
         />
      </>
   );
};
