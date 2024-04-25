import React, { useState } from 'react';
import styled from 'styled-components';
import arrowUpIcon from '../../../public/assets/desktop/icon-arrow-up.svg';
import Image from 'next/image'



const Button = styled.button`
  width: 115px;
  height: 39px;
  background-color: var(--white);
  border-radius: 28px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--grey);
  cursor: pointer;
  @media (min-width: 768px) {
    width: 146px;
  height: 56px;
  }
  @media (min-width: 1024px) {
 
  }
  
`;

const ArrowIcon = styled(Image)<{ $isExpanded: boolean }>`
  background-color: var(--grey);
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  transform: ${({ $isExpanded }) => ($isExpanded ? 'rotate(0deg)' : 'rotate(180deg)')};
  transition: transform 0.8s ease;
  @media (min-width: 768px) {
   width: 2.5rem;
   height: 2.5rem;
  }
  @media (min-width: 1024px) {
 
  }
`;

const Text = styled.span`
  margin-left: 13px;
font-weight: 700;
font-size: 12px;
line-height: 14px;
letter-spacing: 3.75px;
text-transform: uppercase;
color: #000000;
opacity: 50%;
@media (min-width: 768px) {
margin-left: 16px;
font-size: 1rem;
  }
  @media (min-width: 1024px) {
 
  }

`;


interface ToggleButtonProps {
    $isExpanded: boolean;
    onClick: () => void;
    toggleComponents: () => void;
  }
  
  const ToggleButton: React.FC<ToggleButtonProps> = ({ $isExpanded, onClick }) => {
    return (
      <Button onClick={onClick}>
        <Text>{$isExpanded ? 'Less' : 'More'}</Text>
        <ArrowIcon src={arrowUpIcon} alt="Arrow Icon" $isExpanded={$isExpanded} />
      </Button>
    );
  };

  export default ToggleButton;