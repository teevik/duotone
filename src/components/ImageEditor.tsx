import { saveAs } from "file-saver"
import { rgba } from "polished"
import React, { RefObject, useEffect, useRef, useState } from "react"
import { RGBColor } from "react-color"
import styled, { css } from "styled-components"
import { FileDownload } from "styled-icons/material/FileDownload"
import { Fullscreen } from "styled-icons/material/Fullscreen"
import { SwapHoriz } from "styled-icons/material/SwapHoriz"
import { createDuotoneImage } from "../helpers/createDuotoneImage"
import { useIsFullscreen } from "../hooks/useIsFullscreen"
import { mediaQueries } from "../styling/constants"
import { ColorPicker } from "./ColorPicker"

const defaultShadowColor = {
  r: 0,
  g: 0,
  b: 64
}

const defaultHighlightColor = {
  r: 216,
  g: 231,
  b: 79
}

interface UseDuotoneCanvasOptions {
  canvasRef: RefObject<HTMLCanvasElement>
  image: HTMLImageElement
  shadowColor: RGBColor
  highlightColor: RGBColor
}

function useDuotoneCanvas(options: UseDuotoneCanvasOptions) {
  const { canvasRef, image, shadowColor, highlightColor } = options

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext("2d")!
    const imageData = createDuotoneImage(image, shadowColor, highlightColor)
    ctx.putImageData(imageData, 0, 0)
  }, [canvasRef, highlightColor, image, shadowColor])
}

interface ImageEditorProps {
  image: HTMLImageElement
  onClose: () => void
}

export function ImageEditor(props: ImageEditorProps) {
  const { image } = props

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [shadowColor, setShadowColor] = useState<RGBColor>(defaultShadowColor)
  const [highlightColor, setHighlightColor] = useState<RGBColor>(defaultHighlightColor)
  const isFullscreen = useIsFullscreen()
  useDuotoneCanvas({ canvasRef, image, shadowColor, highlightColor })

  const onSwapColors = () => {
    setShadowColor(highlightColor)
    setHighlightColor(shadowColor)
  }

  const onFullscreen = () => {
    const canvas = canvasRef.current!
    canvas.requestFullscreen()
  }

  const onDownload = () => {
    const canvas = canvasRef.current!

    canvas.toBlob(blob => saveAs(blob!, "duotone image.jpeg"))
  }

  const imageRatio = image.width / image.height

  return (
    <Container>
      <CanvasContainer style={{ maxWidth: imageRatio * 400 }}>
        <Canvas ref={canvasRef} width={image.width} height={image.height} />
        <CanvasOverlay hide={isFullscreen} onClick={props.onClose}>
          Select new image
        </CanvasOverlay>
      </CanvasContainer>
      <Divider />

      <ColorControls>
        <ColorPicker title="Shadow Color" color={shadowColor} onChange={setShadowColor} />

        <IconButton onClick={onSwapColors}>
          <SwapHoriz />
        </IconButton>

        <ColorPicker
          title="Highlight Color"
          color={highlightColor}
          onChange={setHighlightColor}
        />
      </ColorControls>

      <Divider />

      <Actions>
        <IconButton>
          <FileDownload onClick={onDownload} />
        </IconButton>
        <IconButton>
          <Fullscreen onClick={onFullscreen} />
        </IconButton>
      </Actions>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 0;
`

const CanvasContainer = styled.div`
  position: relative;
  align-self: center;
`

const Canvas = styled.canvas`
  display: block;
  width: 100%;
`

const CanvasOverlay = styled.div<{ hide: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${rgba("black", 0.6)};
  color: white;
  font-size: 30px;
  opacity: 0;
  cursor: pointer;

  transition: opacity 0.2s ease;

  ${props =>
    !props.hide &&
    css`
      &:hover {
        opacity: 1;
      }
    `}
`

const Divider = styled.hr`
  border: 2px solid ${rgba("black", 0.1)};
  margin: 30px 0;
`

const IconButton = styled.button`
  opacity: 0.8;
  background: none;
  border: none;
  cursor: pointer;

  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }

  & > svg {
    width: 30px;
    height: 30px;
  }
`

const Actions = styled.div`
  display: flex;
  justify-content: center;

  ${IconButton} {
    margin: 0 15px;
  }
`

const ColorControls = styled.div`
  display: flex;
  justify-content: center;

  ${IconButton} {
    margin: 0 20px;
  }

  @media ${mediaQueries.mobile} {
    flex-direction: column;
    align-items: center;

    ${IconButton} {
      margin: 20px 0;
    }
  }
`
