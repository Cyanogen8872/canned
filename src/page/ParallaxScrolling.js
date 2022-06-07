import React, { useEffect, useState } from 'react'
import { render } from 'react-dom'

import ImageEditor from '../component/ImageEditor'

const ParallaxScrolling = () => {
  const [imageData, setImageData] = useState({})

  useEffect(() => {
    console.log(imageData)
  }, [imageData])

  return (
    <div>
      <ImageEditor setImageData={setImageData} imageData={imageData}>
      </ImageEditor>
    </div>
  ) 
}

export default ParallaxScrolling;
