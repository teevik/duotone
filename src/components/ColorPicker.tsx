import { rgb, rgba } from "polished"
import React, { useCallback, useRef, useState } from "react"
import { RGBColor } from "react-color"
import ChromePicker from "react-color/lib/components/chrome/Chrome"
import styled, { css } from "styled-components"
import { useOnClickOutside } from "../hooks/useOnClickOutside"

interface ColorPickerProps {
  title: string
  color: RGBColor
  onChange: (color: RGBColor) => void
}

export function ColorPicker(props: ColorPickerProps) {
  const { title, color, onChange } = props

  const containerRef = useRef<HTMLDivElement>(null)
  const [pickerIsOpen, setPickerIsOpen] = useState(false)

  const closePicker = useCallback(() => setPickerIsOpen(false), [])
  const togglePicker = () => setPickerIsOpen(prevValue => !prevValue)

  useOnClickOutside(containerRef, closePicker)

  const colorHex = rgb(color.r, color.g, color.b)

  return (
    <Container ref={containerRef}>
      <Display
        style={{
          backgroundColor: colorHex
        }}
        onClick={togglePicker}
      />
      <Information>
        <Title onClick={togglePicker}>{title}</Title>
        <Hex>{colorHex}</Hex>
      </Information>

      <Picker
        isOpen={pickerIsOpen}
        disableAlpha
        color={color}
        onChange={colors => onChange(colors.rgb)}
      />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  position: relative;
`

const Display = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: 0 3px 6px ${rgba("black", 0.16)};
  margin-right: 15px;
  cursor: pointer;
`

const Picker = styled(ChromePicker)<{ isOpen: boolean }>`
  position: absolute;
  left: 48px;
  bottom: 0;
  z-index: 1;
  box-shadow: 0 6px 9px ${rgba("black", 0.16)} !important;
  pointer-events: none;
  opacity: 0;
  transform: translateY(-8px);

  transition: none 0.2s ease;
  transition-property: opacity, transform;

  ${props =>
    props.isOpen &&
    css`
      opacity: 1;
      pointer-events: initial;
      transform: translateY(0);
    `}
`

const Information = styled.div`
  display: flex;
  flex-direction: column;
`

const Title = styled.p`
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0;
  margin: 0;
  cursor: pointer;
`

const Hex = styled.p`
  font-size: 12px;
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0;
  margin: 0;
  padding: 2px 4px;
  background-color: #ededed;
  color: ${rgba("black", 0.7)};
  align-self: flex-start;
  border-radius: 4px;
`
