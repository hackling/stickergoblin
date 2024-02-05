import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, ImageList, ImageListItem, ImageListItemBar, Paper } from '@mui/material';
import { styled } from '@mui/system';
import Sticker from './Sticker'; // Adjust the path as needed
import { useMediaQuery } from '@mui/material';

const CenteredContainer = styled(Container)({
  overflowX: 'hidden',
  overflowY: 'hidden',
  padding: '15px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
});

const App = () => {
  const [stickers, setStickers] = useState([]);
  const [initialLoad, setInitialLoad] = useState(true);
  const [shuffledStickers, setShuffledStickers] = useState(stickers);
  const [resetKey, setResetKey] = useState(0);
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const defaultCols = isSmallScreen ? 2 : 3;

  useEffect(() => {
    const fetchStickers = async () => {
      try {
        const response = await fetch('sticker-goblin/stickers.json'); // Adjust the path as needed
        console.log(response);
        const data = await response.json();
        setStickers(data);
        setShuffledStickers(data)
      } catch (error) {
        console.error('Error fetching stickers:', error);
      }
    };

    fetchStickers();
  }, []);
const handleRandomSelection = () => { 
    const randomizedStickers= [...stickers].sort(() => Math.random() - 0.5);
    const selected = randomizedStickers.slice(0, 3);
    setShuffledStickers(selected);
    setInitialLoad(true);
    setResetKey((prevKey) => prevKey + 1); // Update the key to reset the Sticker components
  };

  return (
    <CenteredContainer maxWidth="md">
      <Button variant="contained" color="primary" onClick={handleRandomSelection}>
        Randomly Select Stickers
      </Button>
      <ImageList cols={defaultCols} gap={16} style={{ width: '100%', maxWidth: '800px' }}>
        {shuffledStickers.map((sticker, index) => (
          <Paper elevation={0}>
            <Sticker key={`sticker-${resetKey}-${index}`} sticker={sticker} initialLoad={initialLoad} />
          </Paper>
        ))}
      </ImageList>
    </CenteredContainer>
  );
};

export default App;
