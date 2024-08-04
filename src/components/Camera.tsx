import React, { useRef } from 'react';
import { Camera } from 'react-camera-pro';
import { Button } from '@mui/material';

interface CameraComponentProps {
  onCapture: (image: string) => void;
  onClose: () => void;
}

const CameraComponent: React.FC<CameraComponentProps> = ({ onCapture, onClose }: CameraComponentProps) => {
  const camera = useRef<any>(null);

  const handleCapture = () => {
    const photo = camera.current.takePhoto();
    onCapture(photo);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ width: '100%', height: '400px' }}>
        <Camera ref={camera} aspectRatio={16 / 9}   errorMessages={{}} />
      </div>
      <Button variant="contained" onClick={handleCapture} style={{ marginTop: '10px' }}>Capture</Button>
      <Button variant="contained" onClick={onClose} style={{ marginTop: '10px', marginLeft: '10px' }}>Close</Button>
    </div>
  );
};

export default CameraComponent;
