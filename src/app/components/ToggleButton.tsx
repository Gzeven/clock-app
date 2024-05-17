import React, { useState } from "react";
import styled from "styled-components";
import arrowUpIcon from "../../../public/assets/desktop/icon-arrow-up.svg";
import Image from "next/image";

const Button = styled.button`
  margin-top: 3rem;
  width: 7.1875rem;
  height: 2.4375rem;
  background-color: var(--white);
  border-radius: 1.75rem;
  border: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--grey);
  cursor: pointer;
  @media (min-width: 768px) {
    width: 9.125rem;
    height: 3.5rem;
    margin-top: 5rem;
  }
  @media(hover: hover) and (pointer: fine) {
    &:hover img {
    opacity:0.5; // Change the image color to white on hover
  }
  }
`;

const ArrowIcon = styled(Image)<{ $isExpanded: boolean }>`
  background-color: var(--grey);
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  transform: ${({ $isExpanded }) =>
    $isExpanded ? "rotate(0deg)" : "rotate(180deg)"};
  transition: all 0.8s ease;
  
  @media (min-width: 768px) {
    width: 2.5rem;
    height: 2.5rem;
  }


`;

const Text = styled.span`
  margin-left: 13px;
  font-weight: 700;
  font-size: 0.75rem;
  line-height: 14px;
  letter-spacing: 3.75px;
  text-transform: uppercase;
  color: #000000;
  opacity: 50%;
  @media (min-width: 768px) {
    margin-left: 1rem;
    font-size: 1rem;
  }
`;

interface ToggleButtonProps {
  $isExpanded: boolean;
  onClick: () => void;
  toggleComponents: () => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  $isExpanded,
  onClick,
}) => {
  return (
    <Button onClick={onClick}>
      <Text>{$isExpanded ? "Less" : "More"}</Text>
      <ArrowIcon src={arrowUpIcon} alt="Arrow Icon" $isExpanded={$isExpanded} />
    </Button>
  );
};

export default ToggleButton;
