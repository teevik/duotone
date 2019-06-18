import React from "react"
import styled from "styled-components"
import { mediaQueries } from "../styling/constants"

export function Hero() {
  return (
    <div>
      <Title>Duotone Image Generator</Title>
      <SourceLink href="https://github.com/teevik/duotone">Source</SourceLink>
    </div>
  )
}

const Title = styled.h1`
  margin: 0;
  line-height: 48px;
  font-weight: 400;
  opacity: 0.75;

  @media ${mediaQueries.desktop} {
    font-size: 50px;
    margin-top: 50px;
  }

  @media ${mediaQueries.mobile} {
    font-size: 35px;
  }
`

const SourceLink = styled.a`
  display: inline-block;
  font-size: 18px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0.04em;
  color: #00594d;
  opacity: 0.7;
  margin-top: 10px;
`
