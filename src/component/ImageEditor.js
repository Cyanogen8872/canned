import React, { useState } from 'react'

import DesignCanvas from './imageEditor/DesignCanvas'
import Rect from './imageEditor/Rect'
import Circle from './imageEditor/Circle'
import Image from './imageEditor/Image'

const ImageEditor = (setImageData, imageData) => {
  // const [data, setData] = useState('test')


  return (
  <div>
    <DesignCanvas setImageData={setImageData} imageData={imageData}>
      <Rect width={100} height={100} fill="blue" />
      <Circle radius={20} top={200} />
      <Image url="https://http.cat/100" scale={0.2} top={100} />
    </DesignCanvas>
  </div>
  ) 
}

export default ImageEditor;
