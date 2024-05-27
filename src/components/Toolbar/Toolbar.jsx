import React, { useRef, useState } from 'react';
import cl from './Toolbar.module.css'
import PaletteModal from '../UI/paletteModal/PaletteModal';
import Palette from '../../assets/palette1.svg?react'
import { useOutsideAlerter } from '../../hook/useOutsideAlerter';

const Toolbar = React.forwardRef(({background, setBackground}) => {
  const [displayPalette, setDisplayPalette] = useState({display: 'none'})

  const paletteTool = useRef('')
  const paletteToolModal = useRef('')

  useOutsideAlerter(() => setDisplayPalette({display: 'none'}), paletteTool, paletteToolModal)
 
  const paletteClick = () => {
    if (displayPalette.display === "none") {
      setDisplayPalette({display: 'flex'})
    } else {
      setDisplayPalette({display: 'none'})
    }
  }

  return (
    <div ref={paletteTool} className={cl.toolbar}>
      <PaletteModal paletteTool={paletteToolModal} style={displayPalette} background={background} setBackground={setBackground} />
      <Palette className={cl.palette} onClick={paletteClick} />
    </div>
  );
})

export default Toolbar;
