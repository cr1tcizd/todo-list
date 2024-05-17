import React, { forwardRef } from 'react';
import cl from './PaletteModal.module.css'

const PaletteModal = ({ref, style, setBackground}) => {
  return (
    <div ref={ref} style={style} className={cl.palette__modal}>
      <span style={{background: 'none'}} className={cl.palette__modal__color} onClick={() => setBackground({background: 'none'})}></span>
      <span style={{background: '#2A1258', transition: "background-color 0.9s ease-in-out"}} className={cl.palette__modal__color} onClick={() => setBackground({background: '#2A1258'})}></span>
      <span style={{background: '#9625E6'}} className={cl.palette__modal__color} onClick={() => setBackground({background: '#9625E6'})}></span>
      <span style={{background: '#6F6529'}} className={cl.palette__modal__color} onClick={() => setBackground({background: '#6F6529'})}></span>
      <span style={{background: '#B1487C'}} className={cl.palette__modal__color} onClick={() => setBackground({background: '#B1487C'})}></span>
      <span style={{background: '#7C3762'}} className={cl.palette__modal__color} onClick={() => setBackground({background: '#7C3762'})}></span>
    </div>
  );
}

export default PaletteModal;
