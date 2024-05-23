import React, { forwardRef, useState } from 'react';
import cl from './PaletteModal.module.css'

const PaletteModal = React.forwardRef(({style, background, setBackground, paletteTool}) => {
  const [colorList, setColorList] =  useState([
    {id: 1, color: '#252525'}, 
    {id: 2, color: '#2A1258'}, 
    {id: 3, color: '#9625E6'},
    {id: 4, color: '#6F6529'},
    {id: 5, color: '#B1487C'},
    {id: 6, color: '#7C3762'}
])
  const handleClickSetColor = (color) => {
    setBackground({background: `${color.color}`})
  } 
  return (
    <div ref={paletteTool} style={style} className={cl.palette__modal}>
      {colorList.map(c => 
        <span 
          key={c.id} 
          style={{background: `${c.color}`}} 
          className={background.background === c.color ? `${cl.palette__modal__color} ${cl.palette__modal__color_active}` : cl.palette__modal__color}
          onClick={() => handleClickSetColor(c)} 
        />
      )}
    </div>
  );
})

export default PaletteModal;
