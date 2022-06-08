import React, { useState } from 'react'

import DesignCanvas from './imageEditor/DesignCanvas'
import Rect from './imageEditor/Rect'
import Circle from './imageEditor/Circle'
import Image from './imageEditor/Image'

const ImageEditor = (setImageData, imageData) => {
  const [allChildren, setAllChildren] = useState([<Rect width={100} key="test" height={100} fill="blue" />,
  <Circle radius={20} top={200} />,
  <Image url="https://http.cat/100" scale={0.2} top={100} />])

  const addImage = () => {
    setAllChildren([...allChildren, <Image url="https://http.cat/100" scale={0.2} top={100} />])
  }

  return (
  <div>
    <DesignCanvas setImageData={setImageData} imageData={imageData}>
      { allChildren }
    </DesignCanvas>
    <button onClick={e => {
      addImage();
    }}>Add Image</button>
  </div>
  ) 
}

export default ImageEditor;
