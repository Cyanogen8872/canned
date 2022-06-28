import React, { useEffect, useState, useRef } from 'react'
import uuid from 'react-uuid'
import {Box, ListItem, ListItemButton, ListItemText, TextField, Button, InputLabel, Typography, Divider, IconButton} from '@mui/material/'
import cloneDeep from 'lodash/cloneDeep'
import template from '../storage/Template'
import { Draggable, DragDropContext, Droppable  } from 'react-beautiful-dnd'
import { Delete as DeleteIcon, TextFields as TextFieldsIcon, Lock as LockIcon } from '@mui/icons-material'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'

import CodeGenerator from '../component/CodeGenerator'

const ParallaxScrolling = () => {
  const [imageData, setImageData] = useState({})
  const [images, setImages] = useState([])

  const [showRightMenu, setShowRightMenu] = useState(true)

  const [showGenerator, setShowGenerator] = useState(false)

  const [selectedEle, setSelectedEle] = useState(null)
  const [beach, setBeach] = useState({
    init: false,
    width: 100
  })

  const ref = useRef(null)


  useEffect(()=>{
    if (ref !== null && !beach.init) {
      ref.current.addEventListener('scroll', handleScroll)
      window.onresize = () => {handleResize()}
      setBeach({...beach, init: true})

      const temp = template()

      setImages(temp[1].data)
    }
  }, [])

  useEffect(()=>{
    if (ref !== null) {
      ref.current.addEventListener('scroll', handleScroll)
      return () => {
        ref.current.removeEventListener('scroll', handleScroll)
      }
    }
  }, [images])

  const handleScroll = () => {
    // trigger element move
    const y = ref.current.scrollTop
    const imgs = cloneDeep(images)

    for(let i = 0 ; i < imgs.length; i++) {
      // move
      // imgs[i].style.top = y * imgs[i].moveTopValue
      // imgs[i].style.left = y * imgs[i].moveLeftValue

      imgs[i].style.marginTop = y * imgs[i].marginTopValue
      imgs[i].style.marginLeft = y * imgs[i].marginLeftValue

      if (i == (imgs.length - 1)) {
        setImages(imgs)
      }
    }
  }

  const handleResize = () => {
    // resize to 16:9
    ref.current.style.height = (ref.current.clientWidth / 16 * 9) + 'px'
  }

  const handleChange = (prop) => (event) => {
    const cloneImgs = cloneDeep(images)
    if (cloneImgs[selectedEle]) {
      switch (prop) {
        case 'marginTopValue': case 'marginLeftValue':
          cloneImgs[selectedEle][prop] = event.target.value
          break
        case 'zIndex':
          let value = event.target.value
          if (value > 999) {
            value = 999
          } else if (value < 1) {
            value = 1
          }
          cloneImgs[selectedEle].style[prop] = value
          break
        default:
          cloneImgs[selectedEle].style[prop] = event.target.value
      }
      
    }
    setImages(cloneImgs)
  }
  
  const addImage = (e) => {
    if (!e.target.files[0]) {
      return
    }

    const imagePath = URL.createObjectURL(e.target.files[0])

    const newImage = {
      image: imagePath,
      name: 'image-0',
      format: e.target.files[0].type,
      type: 'image',
      id: uuid(),
      locked: false,
      depth: 0,
      moveLeftValue: 0,
      moveTopValue: 0,
      marginLeftValue: 5,
      marginTopValue: -5,
      style: {
        position: 'absolute',
        width: '100%',
        height: 'auto',
        draggable: 'true',
        marginTop: 0,
        marginLeft: 0,
        top: 0,
        left: 0,
        zIndex: images.length,
      },
      pos1: null,
      pos2: null,
      pos3: null,
      pos4: null,
    }
    setImages([...images, newImage]);
  }

  const removeImage = (index) => {
    if (!confirm('Confirm to remove this layer?')) {
      return
    }
    const img = cloneDeep(images)
    img.splice(index, 1)

    setImages(img)
  }

  const lockImg = () => {
    const imgs = cloneDeep(images)
    if (imgs[selectedEle]) {
      imgs[selectedEle].locked = !imgs[selectedEle].locked
      setImages(imgs)
    }
  }

  const dragMouseDown = (img, e, index) => {
    e = e || window.event;
    e.preventDefault();
    if (img.locked) {
      return
    }
    ref.current.scrollTop = 0;
    // get the mouse cursor position at startup:
    img.pos3 = e.clientX;
    img.pos4 = e.clientY;
    document.onmouseup = (e) => {closeDragElement(e, index)};
    // call a function whenever the cursor moves:
    document.onmousemove = (e) => {elementDrag(img, e)};
  }

  const elementDrag = (img, e) => {
    e = e || window.event;
    e.preventDefault();
    if (e.srcElement.id !== img.id) {
      closeDragElement(e, -1)
      return
    }

    // calculate the new cursor position:
    img.pos1 = img.pos3 - e.clientX;
    img.pos2 = img.pos4 - e.clientY;
    img.pos3 = e.clientX;
    img.pos4 = e.clientY;
    // set the element's new position:
    e.srcElement.style.top = (e.srcElement.offsetTop - img.pos2) + "px";
    e.srcElement.style.left = (e.srcElement.offsetLeft - img.pos1) + "px";
  }

  
  const closeDragElement = (e, index) => {
    if (index > -1) {
      // sync dragging image style
      let cloneImg = cloneDeep(images)

      cloneImg[index].style.top = e.srcElement.style.top
      cloneImg[index].style.left = e.srcElement.style.left
      cloneImg[index].style.marginTop = 0
      cloneImg[index].style.marginLeft = 0
      
      setImages(cloneImg)
    }

    document.onmouseup = null;
    document.onmousemove = null;
  }

  const onDragEnd = ({destination, source}) => {
    const imgs = cloneDeep(images)

    const [removed] = imgs.splice(source.index, 1)
    imgs.splice(destination.index, 0, removed);

    for (const [index, img] of imgs.entries()) {
      img.style.zIndex = index + 1
    }
    setImages(imgs)
  }

  const hiddenMenu = (menu) => {
    setShowRightMenu(!showRightMenu)
  }

  return (
    <div className='editor-background'>
      <Box sx={{height: '100px'}}> <Button onClick={()=>{setShowGenerator(!showGenerator)}}>Generate CSS</Button></Box>

      {/* Right menu */}
      <Box width="250px"
        style={{backgroundColor: '#292c31', height: (window.innerHeight - 100) + 'px', position: 'fixed', top: '100px', left:'0px', padding: '8px 12px', zIndex: 1000}}>
        
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)">
          <Box gridColumn="span 1"></Box>
          <Box gridColumn="span 11" display="grid" gridTemplateColumns="repeat(12, 1fr)" style={{width:'100%'}} gap={0}>
            
            {/* position */}
            <Box gridColumn="span 12">
              <Typography sx={{pl: 1}} variant="overline" display="block">
                  Position
              </Typography>
            </Box>
            <Box gridColumn="span 5" sx={{pl: 1}}>
              <TextField
                id="top-input"
                style={{borderColor: 'white',}}
                value={images[selectedEle] ? images[selectedEle].style.top : '0'}
                onChange={handleChange('top')}
                InputProps={{
                  classes: { notchedOutline: {borderColor: '#fff'} }
                }}
              />
              <InputLabel htmlFor="top-input">
                <Typography variant="caption" className='text-field-cation' display="block">
                  Y (Top)
                </Typography>
              </InputLabel>
            </Box>
            <Box gridColumn="span 5" sx={{pl: 1}}>
              <TextField
                id="left-input"
                value={images[selectedEle] ? images[selectedEle].style.left : '0'}
                onChange={handleChange('left')}
              /><InputLabel htmlFor="left-input">
                  <Typography variant="caption" className='text-field-cation' display="block">
                    X (Left)
                  </Typography>
                </InputLabel>
            </Box>
            <Box gridColumn="span 5" sx={{pl: 1}}>
              <TextField
                id="left-input"
                inputProps={
                  { readOnly: true, }
                }
                value={images[selectedEle] ? images[selectedEle].style.zIndex : '0'}
                onChange={handleChange('zIndex')}
              /><InputLabel htmlFor="left-input">
                  <Typography variant="caption" className='text-field-cation' display="block">
                    Layer (0-999)
                  </Typography>
                </InputLabel>
            </Box>
            
            {/* size */}
            <Box gridColumn="span 12" sx={{pt: 2, pb: 2}}>
              <Divider className='divider'/>
            </Box>
            <Box gridColumn="span 12">
              <Typography sx={{pl: 1, mb:0}} variant="overline" display="block" gutterBottom>
                  Size
              </Typography>
            </Box>
            <Box gridColumn="span 5" sx={{pl: 1}}>
              <TextField
                id="top-input"
                style={{borderColor: 'white',}}
                value={images[selectedEle] ? images[selectedEle].style.width : '0'}
                onChange={handleChange('width')}
                InputProps={{
                  classes: { notchedOutline: {borderColor: '#fff'} }
                }}
              />
              <InputLabel htmlFor="top-input">
                <Typography variant="caption" className='text-field-cation' display="block">
                  Width
                </Typography>
              </InputLabel>
            </Box>
            <Box gridColumn="span 5" sx={{pl: 1}}>
              <TextField
                id="left-input"
                value={images[selectedEle] ? images[selectedEle].style.height : '0'}
                onChange={handleChange('height')}
              />
              <InputLabel htmlFor="left-input">
                <Typography variant="caption" className='text-field-cation' display="block">
                  Height
                </Typography>
              </InputLabel>
            </Box>
            
            {/* movement */}
            <Box gridColumn="span 12" sx={{pt: 2, pb: 2}}>
              <Divider className='divider'/>
            </Box>
            <Box gridColumn="span 12">
              <Typography sx={{pl: 1, mb:0}} variant="overline" display="block" gutterBottom>
                  Movement
              </Typography>
            </Box>
            <Box gridColumn="span 5" sx={{pl: 1}}>
              <TextField
                id="top-input"
                style={{borderColor: 'white',}}
                value={images[selectedEle] ? images[selectedEle].marginTopValue : '0'}
                onChange={handleChange('marginTopValue')}
                InputProps={{
                  classes: { notchedOutline: {borderColor: '#fff'} }
                }}
              />
              <InputLabel htmlFor="top-input">
                <Typography variant="caption" className='text-field-cation' display="block">
                  Movement Y
                </Typography>
              </InputLabel>
            </Box>
            <Box gridColumn="span 5" sx={{pl: 1}}>
              <TextField
                id="left-input"
                value={images[selectedEle] ? images[selectedEle].marginLeftValue : '0'}
                onChange={handleChange('marginLeftValue')}
              />
              <InputLabel htmlFor="left-input">
                <Typography variant="caption" className='text-field-cation' display="block">
                  Movement X
                </Typography>
              </InputLabel>
            </Box>

            <Box gridColumn="span 12" sx={{pl: 1}}>
              <Typography variant="caption" className='text-field-ps' display="block">
                (Movement Y 1.0 = scrolling distance)
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Workbanch */}
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={0}>
        <Box gridColumn="span 12"
            ref={ref} 
            style={{
              height: ref.current? (ref.current.clientWidth / 16 * 9): '100px',
              maxWidth:'100%',
              overflow: 'scroll',
              overflowX: 'hidden'}}
          >
            <div width="100%" style={{height: '2000px', backgroundColor: '#171719'}}>
                {images && (
                  <div width="100%" style={{position: 'relative', width: '100%', height: '100%'}}>
                    {
                      images.map((image, index) => {
                        return <img alt="not found" 
                        style={image.style} src={image.image} 
                        id={image.id}
                        key={image.id}
                        onMouseDown={(e) => {setSelectedEle(index); dragMouseDown(image,e, index)}} />
                      })
                    }
                  </div>
                )}
            </div>
        </Box>
      </Box>
      
      {/* Right menu */}
      <Box width="250px"
        style={{backgroundColor: '#292c31',
        position: 'fixed',
        top: 'calc(50% - 48px)',
        right: showRightMenu ? '0px' : '-274px',
        padding: '8px 12px',
        height: '50%',
        zIndex: 1000}}>
        <div
          style={{position: 'absolute', top: 'calc(50% - 48px)', left:'-12px'}} flow="left"
          onClick={hiddenMenu}
          >
          <svg width="15" height="96" version="1.1" viewBox="0 0 15 96">
            <path style={{fill: '#292c31'}} id="flarp" d="m15 0h-3v1.01c-0.0011 3.42-0.91 8.97-4.27 12.3-0.178 0.175-0.353 0.347-0.527 0.518l-0.06 0.0589c-2.03 2-3.81 3.74-5.06 5.86-1.17 1.98-1.87 4.23-2.04 7.28h-0.0398v41c0 3.74 0.688 6.37 1.99 8.62 1.26 2.19 3.07 3.97 5.15 6.01l0.0625 0.0613c0.173 0.17 0.348 0.342 0.526 0.517 3.36 3.31 4.27 8.86 4.27 12.3v0.506h3z"></path>
          </svg>
          <span className="arrow">
            <svg className="svg-icon" viewBox="3 0 20 10">
							<path fill="none" d="M11.611,10.049l-4.76-4.873c-0.303-0.31-0.297-0.804,0.012-1.105c0.309-0.304,0.803-0.293,1.105,0.012l5.306,5.433c0.304,0.31,0.296,0.805-0.012,1.105L7.83,15.928c-0.152,0.148-0.35,0.223-0.547,0.223c-0.203,0-0.406-0.08-0.559-0.236c-0.303-0.309-0.295-0.803,0.012-1.104L11.611,10.049z"></path>
						</svg>
          </span>
        </div>
        <Box display="grid" style={{height: '100%', overflowY: 'scroll'}}>
          <DragDropContext onDragEnd={onDragEnd} style={{width:'100%'}}>
            <Droppable droppableId={'1'} style={{width:'100%'}}>
              {provided => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {images.map((image, index) => {
                    return (
                      <Draggable draggableId={image.name} index={index}  key={image.id + '-key'}>
                        {(provided, snapshot) => (
                          <ListItem
                            disablePadding
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            >
                            <ListItemButton
                              onClick={()=>{setSelectedEle(index)}}
                              style={{
                                height: '50px',
                                width: '100%',
                                backgroundColor: index === selectedEle ? 'rgba(255,255,255, 0.1)':'',
                                maxHeight: '50px',
                                paddingRight: '10px',
                                }}
                              >
                              <ListItemText
                                primary={image.name}
                                sx={{
                                  overflow: 'hidden',
                                  whiteSpace: 'nowrap',
                                  color: index === selectedEle ? 'rgba(255,255,255, 0.85)' : 'rgba(255,255,255, 0.6)',
                                  zIndex: 1001 }}
                              />

                              <div style={{ width: '50%', height: '100%', textAlign: 'center', top: '50%', }}>
                                <img src={image.image} style={{maxHeight: '100%', maxWidth: '100%'}}></img>
                              </div>
                              
                              <IconButton aria-label="delete" edge="end" size="small">
                                <LockIcon fontSize="inherit" sx={{ color: 'rgba(255,255,255, '+ (image.locked ? '0.6' : '0') +')', zIndex: 1001 }}/>
                              </IconButton>
                              
                              <IconButton aria-label="delete" edge="end" size="small" onClick={() => {removeImage(index)}}>
                                <DeleteIcon fontSize="inherit" sx={{ color: 'rgba(255,255,255, 0.6)', zIndex: 1001 }}/>
                              </IconButton>
                              
                            </ListItemButton>
                          </ListItem>
                        )}
                      </Draggable>
                    )
                  })}
                </div>
              )}
          </Droppable>
          </DragDropContext>
        </Box>
        
        <Box style={{position: 'absolute', width: '274px', bottom: '-40px', right: '0px', height: '40px', backgroundColor: '#292c31'}}>
                  
        </Box>
        <Box style={{position: 'absolute', bottom: '-28px', right: '5px'}}>
          <Button
            sx={{ml: 1, border: '0px solid rgba(255,255,255,0.6)', color: 'rgba(255,255,255,0.6)'}}
            component="label"
            style={{width: "40px", padding: '5px', minWidth: '0px', margin: 0,}}
          >
            <TextFieldsIcon style={{marginLeft: '0px'}} fontSize={'small'}/>
            <input
              type="file"
              hidden
              onChange={(event) => {
                addImage(event)
              }}
            />
          </Button>
        </Box>

        <Box style={{position: 'absolute', bottom: '-28px', right: '40px'}}>
          <Button
            sx={{ml: 1, border: '0px solid rgba(255,255,255,0.6)', color: 'rgba(255,255,255,0.6)'}}
            component="label"
            style={{width: "40px", padding: '5px', minWidth: '0px', margin: 0}}
          >
            <AddPhotoAlternateIcon style={{marginLeft: '0px'}} fontSize={'small'}/>
            <input
              type="file"
              hidden
              onChange={(event) => {
                addImage(event)
              }}
            />
          </Button>
        </Box>

        <Box style={{position: 'absolute', bottom: '-28px', right: '80px'}}>
          <Button
            sx={{ml: 1, border: '0px solid rgba(255,255,255,0.6)', color: 'rgba(255,255,255,0.6)', 
              backgroundColor: selectedEle !== undefined ? (images[selectedEle] !== undefined ? (images[selectedEle].locked ? 'rgba(255,255,255,0.4)' : '') : '') : ''}}
            component="label"
            style={{width: "40px", padding: '5px', minWidth: '0px', margin: 0}}
            onClick={lockImg}
          >
            <LockIcon style={{marginLeft: '0px'}} fontSize={'small'}/>
          </Button>
        </Box>

      </Box>

      { showGenerator ? <CodeGenerator images={images}></CodeGenerator> : ''}
    </div>
  ) 
}


export default ParallaxScrolling;
