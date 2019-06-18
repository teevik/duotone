import React from "react"
import styled, { createGlobalStyle } from "styled-components"
import { mediaQueries } from "../styling/constants"
import { DuotoneCreator } from "./DuotoneCreator"
import { Hero } from "./Hero"

export function App() {
  return (
    <>
      <Container>
        <Hero />
        <DuotoneCreator />
      </Container>

      <GlobalStyles />
    </>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 1000px;
  margin: 0 auto;

  @media ${mediaQueries.desktop} {
    padding: 30px;
  }

  @media ${mediaQueries.mobile} {
    padding: 10px;
  }
`

const GlobalStyles = createGlobalStyle`
  .js-focus-visible *:focus:not(.focus-visible) {
    outline: none;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    text-decoration: inherit;
    color: inherit;
    font-family: inherit;
    font-family: "Roboto", sans-serif;
  }

  body {
    background-color: hsl(0, 0%, 95%);
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 500;
  }
`
