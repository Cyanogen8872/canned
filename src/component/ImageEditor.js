import React, { useState } from 'react'

import DesignCanvas from './imageEditor/DesignCanvas'
import Rect from './imageEditor/Rect'
import Circle from './imageEditor/Circle'
import Image from './imageEditor/Image'

const ImageEditor = (setImageData, imageData) => {
  const [allChildren, setAllChildren] = useState([<Rect width={100} key="test" height={100} fill="blue" />,
  <Circle radius={20} top={200} />])

  const addImage = () => {
    setAllChildren([...allChildren, <Image url="https://www.osfhealthcare.org/blog/wp-content/uploads/2019/08/apples-OG-765x310.jpg" scale={0.2} top={100} />])
  }

  return (
  <div>
    <DesignCanvas setImageData={setImageData} imageData={imageData} setAllChildren={setAllChildren} allChildren={allChildren}>
      { allChildren }
    </DesignCanvas>
    <button onClick={e => {
      addImage();
    }}>Add Image</button>
  </div>
  ) 
}

export default ImageEditor;
