import React, { useEffect, useState } from "react";

import TypeCard from "../TypeCard/TypeCard";
import { Box } from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';
import { Image } from '@chakra-ui/react';

import './PokemonCard.css';
import egg from '../../../images/egg.png';

const MotionBox = motion(Box);

export default function PokemonCard({ pokemon }) {
  const pokemonType = pokemon.types[0].type.name;
  const image = pokemon['sprites']['other']['official-artwork']['front_default'];
  let id = String(pokemon.id).padStart(3, '0');
  const [animateCard, setAnimateCard] = useState(false);
  const cardAnimation = useAnimation();

  const cardVariants = {
    init: {
      scale: 1.1,
    },
    anim: {
      scale: [1.1, 1.2, 1.1],
      transition: {
        ease: 'easeIn',
        type: 'spring',
        stiffness: 200,
        duration: 1,
        repeat: Infinity,
      },
    },
  };

  useEffect(() => {
    if (animateCard) {
      cardAnimation.start(cardVariants.anim);
    } else {
      cardAnimation.stop();
      cardAnimation.set(cardVariants.init);
    }
  }, [animateCard])

  return (
    <MotionBox
      className={`pokemonCard ${pokemonType}`}
      animate={cardAnimation}
      onHoverStart={() => setAnimateCard(true)}
      onHoverEnd={() => setAnimateCard(false)}
    >
      <div className="cardHeader">
        <div className="cardTitle">
          {pokemon.name}
        </div>
        <h2>#{id}</h2>
      </div>
      <div className="cardBody">
        <div className="pokemonTypeContainer">
          {pokemon.types.map((type) => <TypeCard type={type} key={type.slot} />)}
        </div>
        <div className="pokemonImage">
          <Image
            boxSize='143px'
            objectFit='cover'
            src={image}
            alt="pokemon"
            fallbackSrc={egg}
          />
        </div>
      </div>
    </MotionBox>
  )
}