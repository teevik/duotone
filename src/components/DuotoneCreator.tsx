import { rgba } from "polished"
import React, { useState } from "react"
import ReactCSSTransitionReplace from "react-css-transition-replace"
import styled from "styled-components"
import { createImage } from "../helpers/createImage"
import { readFileAsDataURL } from "../helpers/readFileAsDataURL"
import { ImageEditor } from "./ImageEditor"
import { Uploader } from "./Uploader"

export function DuotoneCreator() {
  const [image, setImage] = useState<HTMLImageElement>()

  const onUpload = (file: File) => {
    readFileAsDataURL(file)
      .then(createImage)
      .then(setImage)
  }

  const onClose = () => setImage(undefined)

  const content = image ? (
    <ImageEditor key="image-editor" image={image} onClose={onClose} />
  ) : (
    <Uploader key="uploader" onUpload={onUpload} />
  )

  return (
    <Container
      transitionName="cross-fade"
      transitionEnterTimeout={1000}
      transitionLeaveTimeout={500}
    >
      {content}
    </Container>
  )
}

const Container = styled(ReactCSSTransitionReplace)`
  display: flex;
  flex-direction: column;
  background-color: white;
  margin: 50px 0;
  box-shadow: 0 3px 6px ${rgba("black", 0.16)};
  border-radius: 4px;

  .cross-fade-leave {
    opacity: 1;
  }
  .cross-fade-leave.cross-fade-leave-active {
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  .cross-fade-enter {
    opacity: 0;
  }
  .cross-fade-enter.cross-fade-enter-active {
    opacity: 1;
    transition: opacity 0.5s ease;
    transition-delay: 0.5s;
  }

  &.cross-fade-height {
    transition: height 0.5s ease;
  }
`
