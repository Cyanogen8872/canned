import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

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
    width: 600,
    height: 400,
  }

  state = {
    canvas: null,
  }

  componentDidMount() {
    const canvas = new fabric.Canvas(this.c)
    this.setState({ canvas })
  }

  render() {
    console.log(this.props.allChildren)
    const children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        canvas: this.state.canvas,
      })
    })

    console.log(children)

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
        </Fragment>
      </div>
    )
  }
}

export default DesignCanvas
