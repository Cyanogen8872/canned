import uuid from 'react-uuid'

const scrollingEffectTemplate = () => {
    return [
    {
        name: 'vertical-1',
        data: [{
            image: require('../assets/template/vertical-1/bg.png'),
            name: 'bg',
            id: uuid(),
            format: 'png',
            type: 'image',
            locked: false,
            depth: 0,
            moveLeftValue: 0,
            moveTopValue: 0,
            marginLeftValue: 0,
            marginTopValue: 0.7,
            style: {
              position: 'absolute',
              width: '100%',
              height: 'auto',
              draggable: 'true',
              marginTop: 0,
              marginLeft: 0,
              top: 0,
              left: '204px',
              zIndex: 1,
            },
            pos1: null,
            pos2: null,
            pos3: null,
            pos4: null,
          }, {
            image: require('../assets/template/vertical-1/moon.png'),
            name: 'moon',
            id: uuid(),
            format: 'png',
            type: 'image',
            locked: false,
            depth: 0,
            moveLeftValue: 0,
            moveTopValue: 0,
            marginLeftValue: 0,
            marginTopValue: 0.85,
            style: {
              position: 'absolute',
              width: '8%',
              height: 'auto',
              draggable: 'true',
              marginTop: 0,
              marginLeft: 0,
              top: '193px',
              left: '852px',
              zIndex: 2,
            },
            pos1: null,
            pos2: null,
            pos3: null,
            pos4: null,
          }, {
            image: require('../assets/template/vertical-1/room.png'),
            name: 'room',
            id: uuid(),
            format: 'png',
            type: 'image',
            locked: false,
            depth: 0,
            moveLeftValue: 0,
            moveTopValue: 0,
            marginLeftValue: 0,
            marginTopValue: 0.4,
            style: {
              position: 'absolute',
              width: '120%',
              height: 'auto',
              draggable: 'true',
              marginTop: 0,
              marginLeft: 0,
              top: 0,
              left: '-204px',
              zIndex: 3,
            },
            pos1: null,
            pos2: null,
            pos3: null,
            pos4: null,
          }, {
            image: require('../assets/template/vertical-1/table.png'),
            name: 'table',
            id: uuid(),
            format: 'png',
            type: 'image',
            locked: false,
            depth: 0,
            moveLeftValue: 0,
            moveTopValue: 0,
            marginLeftValue: 0,
            marginTopValue: 0.38,
            style: {
              position: 'absolute',
              width: '25%',
              height: 'auto',
              draggable: 'true',
              marginTop: 0,
              marginLeft: 0,
              top: '573px',
              left: '693px',
              zIndex: 4,
            },
            pos1: null,
            pos2: null,
            pos3: null,
            pos4: null,
          }, {
            image: require('../assets/template/vertical-1/shadow.png'),
            name: 'shadow',
            id: uuid(),
            format: 'png',
            type: 'image',
            locked: false,
            depth: 0,
            moveLeftValue: 0,
            moveTopValue: 0,
            marginLeftValue: 0,
            marginTopValue: 0.38,
            style: {
              position: 'absolute',
              width: '25%',
              height: 'auto',
              draggable: 'true',
              marginTop: 0,
              marginLeft: 0,
              top: '822px',
              left: '693px',
              zIndex: 4,
            },
            pos1: null,
            pos2: null,
            pos3: null,
            pos4: null,
          }, {
            image: require('../assets/template/vertical-1/block.png'),
            name: 'block',
            id: uuid(),
      format: 'png',
      type: 'image',
    locked: false,
            depth: 0,
            moveLeftValue: 0,
            moveTopValue: 0,
            marginLeftValue: 0,
            marginTopValue: 0.35,
            style: {
              position: 'absolute',
              width: '100%',
              height: 'auto',
              draggable: 'true',
              marginTop: 0,
              marginLeft: 0,
              top: '-55px',
              left: '-32px',
              zIndex: 5,
            },
            pos1: null,
            pos2: null,
            pos3: null,
            pos4: null,
          }, {
            image: require('../assets/template/vertical-1/black.jpg'),
            name: 'black-cover',
            id: uuid(),
            format: 'png',
            type: 'image',
            locked: false,
            depth: 0,
            moveLeftValue: 0,
            moveTopValue: 0,
            marginLeftValue: 0,
            marginTopValue: 0.4,
            style: {
              position: 'absolute',
              width: '100%',
              height: 'auto',
              draggable: 'true',
              marginTop: 0,
              marginLeft: 0,
              top: '900px',
              left: '0px',
              zIndex: 6,
            },
            pos1: null,
            pos2: null,
            pos3: null,
            pos4: null,
          }],
    }, {
        name: 'vertical-2',
        data: [{
            image: require('../assets/template/vertical-2/sky.png'),
            name: 'sky',
            id: uuid(),
            format: 'png',
            type: 'image',
            locked: false,
            depth: 0,
            moveLeftValue: 0,
            moveTopValue: 0,
            marginLeftValue: 0,
            marginTopValue: 0.8,
            style: {
              position: 'absolute',
              width: '100%',
              height: 'auto',
              draggable: 'true',
              marginTop: 0,
              marginLeft: 0,
              top: '-85px',
              left: '0px',
              zIndex: 1,
            },
            pos1: null,
            pos2: null,
            pos3: null,
            pos4: null,
        }, {
          image: require('../assets/template/vertical-2/sea.png'),
          name: 'sea',
          id: uuid(),
          format: 'png',
          type: 'image',
          locked: false,
          depth: 0,
          moveLeftValue: 0,
          moveTopValue: 0,
          marginLeftValue: 0,
          marginTopValue: 0.75,
          style: {
            position: 'absolute',
            width: '100%',
            height: 'auto',
            draggable: 'true',
            marginTop: 0,
            marginLeft: 0,
            top: '733px',
            left: '0px',
            zIndex: 2,
          },
          pos1: null,
          pos2: null,
          pos3: null,
          pos4: null,
      }, {
        image: require('../assets/template/vertical-2/moon.png'),
        name: 'moon',
        id: uuid(),
        format: 'png',
        type: 'image',
        locked: false,
        depth: 0,
        moveLeftValue: 0,
        moveTopValue: 0,
        marginLeftValue: 0,
        marginTopValue: 0.95,
        style: {
          position: 'absolute',
          width: '20%',
          height: 'auto',
          draggable: 'true',
          marginTop: 0,
          marginLeft: 0,
          top: '108px',
          left: '797px',
          zIndex: 3,
        },
        pos1: null,
        pos2: null,
        pos3: null,
        pos4: null,
    }, {
      image: require('../assets/template/vertical-2/cloud.png'),
      name: 'cloud',
      id: uuid(),
      format: 'png',
      type: 'image',
      locked: false,
      depth: 0,
      moveLeftValue: 0,
      moveTopValue: 0,
      marginLeftValue: 0,
      marginTopValue: 0.7,
      style: {
        position: 'absolute',
        width: '100%',
        height: 'auto',
        draggable: 'true',
        marginTop: 0,
        marginLeft: 0,
        top: '-102px',
        left: '0px',
        zIndex: 4,
      },
      pos1: null,
      pos2: null,
      pos3: null,
      pos4: null,
    }, {
      image: require('../assets/template/vertical-2/mountains_front.png'),
      name: 'mountains_front',
      id: uuid(),
      format: 'png',
      type: 'image',
      locked: false,
      depth: 0,
      moveLeftValue: 0,
      moveTopValue: 0,
      marginLeftValue: 0,
      marginTopValue: 0.35,
      style: {
        position: 'absolute',
        width: '100%',
        height: 'auto',
        draggable: 'true',
        marginTop: 0,
        marginLeft: 0,
        top: '-68px',
        left: '0px',
        zIndex: 5,
      },
      pos1: null,
      pos2: null,
      pos3: null,
      pos4: null,
  }, {
    image: require('../assets/template/vertical-1/black.jpg'),
    name: 'black-cover',
    id: uuid(),
    format: 'png',
    type: 'image',
    locked: false,
    depth: 0,
    moveLeftValue: 0,
    moveTopValue: 0,
    marginLeftValue: 0,
    marginTopValue: 0.35,
    style: {
      position: 'absolute',
      width: '100%',
      height: 'auto',
      draggable: 'true',
      marginTop: 0,
      marginLeft: 0,
      top: '1000px',
      left: '0px',
      zIndex: 6,
    },
    pos1: null,
    pos2: null,
    pos3: null,
    pos4: null,
  },],},
  ]
}

export default scrollingEffectTemplate