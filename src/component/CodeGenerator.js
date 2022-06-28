import { Box, TextareaAutosize, Typography } from '@mui/material/'
import React, { useState, useEffect } from 'react'
import CodeGenerateHelper from '../helper/CodeGenerateHelper'

const CodeGenerator = (props) => {
  const Code = CodeGenerateHelper(props)

  const [html, setHtml] = useState('')
  const [css, setCss] = useState('')
  const [js, setJs] = useState('')

  const [imgType, setImgType] = useState(['svg', 'png', 'jpg'])

  useEffect(()=>{
    setHtml(generateHtml())
    setCss(generateCss())
    setJs(generateJs())
  }, [])

  const generateHtml = () => {
    let html = `<html>\n  <div width='100%' height='2000px' background-color='#171719'>\n`
    html += `    <div class="container">\n`
    for (const img of props.images) {
      let format = ''
      for (const type of imgType) {
        if (img.format && img.format.includes(type)) {
          format = type
        }
      }

      html += `      <img src='./${img.name}.${format}' class='${img.name}-${img.type}'/>\n`
    }

    html += `    </div>\n  </div>\n</html>`

    return html
  }

  const generateCss = () => {
    let css =`.container {\n  width: 100%;\n  position: relative;\n  height: 100%;\n}\n\n`
    for (const img of props.images) {
      css += `.${img.name}-${img.type} {`
      
      css +=`\n}\n\n`
    }
    return css
  }

  const generateJs = () => {
    let js =''
    return js
  }

  return (
    <Box
      display="grid" gridTemplateColumns="repeat(12, 1fr)"
      gap={0}
      style={{
        width: '100%',
        backgroundColor: '#292c31',
        height: '30%',
        position: 'fixed',
        bottom: 0,
        left: 0,
        zIndex: 1001,
        borderTop: '1px solid rgba(255,255,255,0.3)'
      }}
    >
      <Box gridColumn="span 4">
        <div
          style={{
            padding:'0px 0 50px 25px',
            height: '100%'}}>
          <Typography sx={{pl: 1, pt: 1, mb:1}} variant="h6" display="block" gutterBottom>
              HTML
          </Typography>
          <textarea 
            className='input-box'
            aria-label="empty textarea"
            readOnly
            placeholder="/**/"
            value={html}
            style={{width: '100%', height: '75%', resize: 'none', borderRadius: '4px'}}
          />
        </div>
      </Box>
      <Box gridColumn="span 4">
        <div
          style={{
            padding:'0px 0 50px 25px',
            height: '100%'}}>
          <Typography sx={{pl: 1, pt: 1, mb:1}} variant="h6" display="block" gutterBottom>
              CSS
          </Typography>
          <textarea 
            className='input-box'
            aria-label="empty textarea"
            readOnly
            placeholder="/**/"
            value={css}
            style={{width: '100%', height: '75%', resize: 'none', borderRadius: '4px'}}
          />
        </div>
      </Box>
      <Box gridColumn="span 4">
        <div
          style={{
            padding:'0px 0 50px 25px',
            height: '100%'}}>
          <Typography sx={{pl: 1, pt: 1, mb:1}} variant="h6" display="block" gutterBottom>
              JS
          </Typography>
          <textarea 
            className='input-box'
            aria-label="empty textarea"
            readOnly
            placeholder="/**/"
            value={js}
            style={{width: '100%', height: '75%', resize: 'none', borderRadius: '4px'}}
          />
        </div>
      </Box>
    </Box>
  )
}

export default CodeGenerator