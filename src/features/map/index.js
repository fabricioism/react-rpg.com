import React       from 'react';
import { connect } from 'react-redux';

import { SPRITE_SIZE } from '../../config/constants';

function getTileSprite(type) {
  switch(type) {
    case -2:
      return 'chest-open'
    case -1:
      return 'blood-splatter'
    case 0:
      return 'ground'
    case 1:
      return 'stone-wall' // fake stone-wall obstacles
    case 2:
      return 'stairs-down'
    case 3:
      return 'stairs-up'
    case 4:
      return 'chest'
    case 5:
      return 'stone-wall'
    case 6:
      return 'cracked-wall'
    case 7:
      return 'skull-wall'
    case 8:
      return 'eye-wall'
    case 9:
      return 'shop'
    case 10:
      return 'shrine'
    default:
  }
}

function MapTile(props) {
  let inSight = false;
  // if you need to render the sightBox
  if(props.sightBox) {
    // check the sight box tiles
    props.sightBox.forEach(sightBox => {
      // if the current tile is in range
      if(JSON.stringify(sightBox) === JSON.stringify(props.index)) {
        // remove the overlay
        return inSight = true;
      }
    });
  }

  if(!props.tile.explored) {
    return (
      <div style={{
          backgroundColor: 'black',
          display: 'inline-flex',
          height: SPRITE_SIZE,
          width: SPRITE_SIZE,
        }} />
    );
  }
  return (
    <div
      style={{
        backgroundImage: 'url(\'/tiles/ground.png\')',
        backgroundSize: 'contain',
        display: 'inline-flex',
        height: SPRITE_SIZE,
        width: SPRITE_SIZE,
      }}>
      <div
        style={{
          backgroundImage: `url(/tiles/${getTileSprite(props.tile.value)}.png)`,
          backgroundSize: 'contain',
          height: SPRITE_SIZE,
          width: SPRITE_SIZE,
        }}>
        {
          inSight ?
            null
            :
            <div style={{
              backgroundColor: 'rgba(0,0,0,0.5)',
              display: 'inline-flex',
              height: SPRITE_SIZE,
              width: SPRITE_SIZE,
            }} />
        }
      </div>
    </div>
  );
}

function MapRow(props) {
  return (
    <div className="row"
      style={{
        height: SPRITE_SIZE,
      }}>
      {
        props.tiles.map((tile, index) => {
          return(
            <MapTile
              tile={tile}
              index={[props.index, index]}
              sightBox={props.sightBox}
              key={JSON.stringify(tile) + index} />
          );
        })
      }
    </div>
  )
}

function Map(props) {
  const { map } = props;

  return (
    <div style={{
      width: '800px',
      height: '600px'
    }}>
      {
        map.tiles.map((row, index) => {
          return (
            <MapRow
              tiles={row}
              index={index}
              sightBox={map.sightBox}
              key={JSON.stringify(row) + index} />
          );
        })
      }
    </div>
  );
}

const mapStateToProps = ({ map }) => {
  return { map };
}

export default connect(mapStateToProps)(Map);
