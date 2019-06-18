import { rgba } from "polished"
import { isEmpty } from "ramda"
import React from "react"
import { useDropzone } from "react-dropzone"
import styled from "styled-components"

interface UploaderProps {
  onUpload: (file: File) => void
}

export function Uploader(props: UploaderProps) {
  const onDrop = (acceptedFiles: File[]) => {
    if (!isEmpty(acceptedFiles)) {
      const file = acceptedFiles[0]

      props.onUpload(file)
    }
  }

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <Container {...getRootProps()}>
      <input {...getInputProps()} />
      <Text>
        <Highlighted>Browse</Highlighted> or drag images here
      </Text>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  min-height: 200px;
  cursor: pointer;
`

const Text = styled.p`
  font-size: 16px;
  font-weight: 400;
  line-height: 28px;
  letter-spacing: 0.04em;
  margin: 0;
  text-align: center;
  color: ${rgba("black", 0.6)};
  font-weight: 500;
`

const Highlighted = styled.span`
  background-color: ${rgba("black", 0.1)};
  padding: 3px 9px;
  border-radius: 50px;
`
