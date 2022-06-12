import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash.omit'

const fabric = window.fabric

class DesignCanvas extends React.Component {
  setData = (imageData) => {
    this.props.setImageData.setImageData(imageData);
  }

  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }

  static defaultProps = {
    width: 700,
    height: 500,
  }

  state = {
    canvas: null,
  }

  cropObject = null
  cropRect = null

  componentDidMount() {
    const canvas = new fabric.Canvas(this.c)
    this.setState({ canvas })
  }

  removeObject = () => {
    const activeObj = this.state.canvas.getActiveObject()
    const index = this.state.canvas.getObjects().indexOf(activeObj)
    if (index > -1) {
      let result =  this.props.allChildren
      result.splice(index, 1)
      this.props.setAllChildren(result)
      this.state.canvas.remove(this.state.canvas.getActiveObject())
    }
  }

  cropObject = () => {
    this.cropObject = this.state.canvas.getActiveObject()
    const { left, top } = this.cropObject
    this.cropRect = new fabric.Rect({
      width: this.cropObject.width,
      height: this.cropObject.height,
      scaleX: this.cropObject.scaleX,
      scaleY: this.cropObject.scaleY,
      originX: 'left',
      originY: 'top',
      left,
      top,
      hasRotatingPoint: false,
      fill: 'rgba(0, 0, 0, 0.2)',
    })

    this.state.canvas.add(this.cropRect)
    this.state.canvas.setActiveObject(this.cropRect)
    this.cropObject.selectable = false
    this.cropObject.evented = false
    this.state.canvas.renderAll()
  }

  saveCropObject = () => {

    
    // console.log(this.cropRect)
		// const { left, top, width, height, scaleX, scaleY } = this.cropRect
    // console.log(this.cropObject)
    // console.log(width * scaleX)

    // const objX = this.cropObject.scaleX
    // const objY = this.cropObject.scaleY
    // const objTop = this.cropObject.top
    // const objLeft = this.cropObject.left

    // const rectX = this.cropRect.scaleX
    // const rectY = this.cropRect.scaleY

    // const objScaleX = 1 / this.cropObject.scaleX
    // const objScaleY = 1 / this.cropObject.scaleY

    // this.cropObject.scaleX = 1
    // this.cropObject.scaleY = 1


    // this.cropRect.scaleX = this.cropRect.scaleX * objScaleX
    // this.cropRect.scaleY = this.cropRect.scaleY * objScaleY

    // this.cropRect.top = ((top - objTop) * objScaleY) + objTop
    // this.cropRect.left = ((left - objLeft) * objScaleX) + objLeft
    // console.log(this.cropRect)
    // console.log(this.cropObject)

    // // this.cropObject.left = this.cropObject.left - (this.cropRect.left -  this.cropObject.left)
    // // this.cropObject.top = this.cropObject.top - (this.cropRect.top - this.cropObject.top)
    // console.log(this.cropObject.left - (this.cropRect.left -  this.cropObject.left))
		// const croppedImg = this.cropObject.toDataURL({})
    // console.log(croppedImg)
		// this.setImage(this.cropObject, croppedImg)
		// this.cancel()
	}

  setImage = (obj, source) => {
		if (!source) {
			this.loadImage(obj, null);
			obj.set('file', null);
			obj.set('src', null);
			return;
		}
		if (source instanceof File) {
			const reader = new FileReader();
			reader.onload = () => {
				this.loadImage(obj, reader.result);
				obj.set('file', source);
				obj.set('src', null);
			};
			reader.readAsDataURL(source);
		} else {
			this.loadImage(obj, source);
			obj.set('file', null);
			obj.set('src', source);
		}
	}

  loadImage = (obj, src) => {
		let url = src;
		if (!url) {
			url = './images/sample/transparentBg.png';
		}
		fabric.util.loadImage(url, source => {
			if (obj.type !== 'image') {
				obj.set(
					'fill',
					new fabric.Pattern({
						source,
						repeat: 'repeat',
					}),
				);
				obj.setCoords();
				this.canvas.renderAll();
				return;
			}
			obj.setElement(source);
			obj.setCoords();
			this.state.canvas.renderAll();
		});
	}

  cancel = () => {
		this.cropObject.selectable = true;
		this.cropObject.evented = true;
		this.state.canvas.setActiveObject(this.cropObject);
		this.state.canvas.remove(this.cropRect);
		this.cropRect = null;
		this.cropObject = null;
		this.state.canvas.renderAll();
	};

  render() {
    console.log(this.props.allChildren)
    const children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        canvas: this.state.canvas,
      })
    })

    const { width, height } = this.props
    return (
      <div>
        <Fragment>
          <canvas ref={c => (this.c = c)} width={width} height={height} />
          {this.state.canvas && children}
          <button onClick={e => {
            e.preventDefault()
            this.setData(this.state.canvas.toJSON());
          }}>To JSON</button>

        <button onClick={e => {
              this.removeObject();
            }}>Remove Image</button>

        <button onClick={e => {
              this.cropObject()
            }}>Crop Image</button>
        <button onClick={e => {
              this.saveCropObject()
            }}>save croped Image</button>
        </Fragment>
      </div>
    )
  }
}

export default DesignCanvas
