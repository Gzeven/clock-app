"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import Refresh from "../../../public/assets/desktop/icon-refresh.svg";
import { fetchRandomQuote } from "../api/ApiCalls"; 

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1.0625rem;
  padding: 2rem 1.625rem 0;
  @media (min-width: 768px) {
    justify-content: flex-start;
    padding: 5rem 4rem 0;
    gap: 1rem;
  }
  @media (min-width: 1280px) {
    padding: 3.5rem 10.3125rem 0;
  }
`;

const QuoteText = styled.div`
  max-width: 573px;
`;

const AuthorText = styled.div`
  font-weight: 700;
  margin-top: 0.5rem;
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.6s ease;
  img {
    width: 1.041875rem;
    height: 1.041875rem;
  }
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      opacity: 1;
    }
  }
  @media (min-width: 768px) {
    margin-top: 0.4rem;
  }
`;

const Quote: React.FC = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    getQuote();
  }, []);

  const getQuote = async () => {
    const data = await fetchRandomQuote();
    if (data) {
      setQuote(data.quote);
      setAuthor(data.author);
    }
  };

  return (
    <Container>
      <div>
        <QuoteText>
          <h5>{quote}</h5>
        </QuoteText>
        <AuthorText>
          <h5>{author}</h5>
        </AuthorText>
      </div>
      <Button onClick={getQuote}>
        <Image src={Refresh} alt="Get new quote" width="0" height="0" />
      </Button>
    </Container>
  );
};

export default Quote;
