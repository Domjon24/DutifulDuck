import {Button, Divider, Input, Text} from '@nextui-org/react';
import React, { useEffect } from 'react';
import {CheckIcon} from '../icons/CheckIcon';
import {Box} from '../styles/box';
import {Flex} from '../styles/flex';
import { useState } from "react";
import axios from "axios";
import { keyframes } from '@emotion/react';
import Image from 'next/image';

export const Hero = () => {
  const [response, setResponse] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [animation, setAnimation] = useState<string>('walk'); //change to gif


//   const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
//     setValue(e.target.value);



 const handleSubmit = async () => {
    setLoading(true); 
    setResponse("Thinking..."); // Display "Thinking..." while processing
  try {
    // const res = await axios.post("/api/hello", { question: value });
    // const message = res.data.choices[0].message.content;
    // setResponse(message);
     const res = await axios.post("/api/hello", { question: value });

    const message = res.data.choices?.[0]?.message?.content ?? "";
    const command = res.data.matchedCommand ?? null;
    setResponse(message);

    // if (res.data.matchedCommand) {
    //   setAnimation(res.data.matchedCommand);

     if (command) {
      setAnimation(command);

      // Reset back to walk after 3 seconds
      setTimeout(() => setAnimation("walk"), 3000);
    } else {
      setAnimation("walk");
    }

  } catch (err) {
    console.error(err);
    setResponse("Error connecting to AI.");
  } finally {
    setLoading(false);
  }
};
//     const walkAnimation = keyframes` //walking animation loop
//     0% {
//       background-position: center 0%;
//     }
//     100% {
//       background-position: center 100%;
//     }
//   `;

   return (
    <>
      <Flex
        css={{
          gap: '$3',
          px: '$6',
          flexDirection: 'column',
          alignContent: 'center',
          justifyContent: 'center',
          width: '100%',
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
          <Box css={{ maxWidth: '600px' }}>
            <Text h1 css={{ display: 'inline' }}>
              Dutiful{' '}
            </Text>
            <Text h1 css={{ display: 'inline' }} color="primary">
              Duck
            </Text>
          </Box>

                  <Text
            css={{ color: '$accents8', maxWidth: '400px' }}
            size={'$lg'}
            span
          >
            Enter a command for the dutiful duck. All commands are 1 word. If you do not get it right, the AI helper will guide you. Enter them all for an achievement. Check back later for updates and more commands.
          </Text>

          <Flex css={{ gap: '$8', pt: '$4' }} wrap={'wrap'}>
            <Input placeholder="Enter a command" size="lg"  onChange={(e) => setValue(e.target.value)} />
            
            {/* <script>console.log('alert('promise not to make fun of my animations...')');</script> */}
            <Button onClick={handleSubmit}>Enter</Button>
          </Flex>

          <Flex
            wrap={'wrap'}
            css={{
              gap: '$8',
              py: '$7',
              '@sm': {
                py: '$4',
              },
            }}
          >

                  
                  <Text css={{ color: '$accents8', maxWidth: '400px' }} size={'$lg'} span>
              <p>{response}</p>
            </Text>
          </Flex>
        </Box>

        {/* gigf Box */}
        <Box
          css={{
            display: 'flex',
            alignItems: 'flex-start',   
            justifyContent: 'center',

            '& img': {
              position: 'relative',
              width: '450px',
              height: '450px',
              objectFit: 'contain',
              // marginTop: '1rem',  
              marginLeft: '5rem',   
              paddingRight: '5rem',  
            },
          }}
        >

          {/* <img
            src={`/images/${animation}.gif`}
            alt={animation || 'walking duck'}
          /> */}

          <Image
            src={`/images/${animation}.gif`}
            alt={animation || 'walking duck'}
            width={400}
            height={400}
            style={{ objectFit: 'contain'}}
            />
        </Box>
      </Flex>

      <Divider css={{ position: 'absolute', inset: '0p', left: '0', mt: '$10' }} />
    </>
  );
};