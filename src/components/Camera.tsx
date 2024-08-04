import React, { useRef, useState } from 'react';
import { Camera } from 'react-camera-pro';
import { Button } from '@mui/material';

interface CameraComponentProps {
  onCapture: (image: string) => void;
  onClose: () => void;
}

const CameraComponent: React.FC<CameraComponentProps> = ({ onCapture, onClose }: CameraComponentProps) => {
  const camera = useRef<any>(null);
  const [isFrontCamera, setIsFrontCamera] = useState(true); // State to track camera facing mode

  const handleCapture = async () => {
    try {
      const photo = await camera.current.takePhoto();
      onCapture(photo);
    } catch (error) {
      console.error("Error capturing photo:", error);
    }
  };

  const handleToggleCamera = () => {
    setIsFrontCamera(!isFrontCamera); // Toggle between front and back camera
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ width: '100%', height: '400px' }}>
        <Camera 
          ref={camera} 
          aspectRatio={16 / 9} 
          facingMode={isFrontCamera ? 'user' : 'environment'} // Switch camera based on state
          errorMessages={{}} // Provide an empty object or appropriate error messages
        />
      </div>
      <Button variant="contained" onClick={handleCapture} style={{ marginTop: '10px' }}>Capture</Button>
      <Button variant="contained" onClick={handleToggleCamera} style={{ marginTop: '10px', marginLeft: '10px' }}>
        {isFrontCamera ? 'Switch to Back Camera' : 'Switch to Front Camera'}
      </Button>
      <Button variant="contained" onClick={onClose} style={{ marginTop: '10px', marginLeft: '10px' }}>Close</Button>
    </div>
  );
};

export default CameraComponent;
