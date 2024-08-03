import Image from "next/image";
import styles from "./page.module.css";
import { Container, Typography } from "@mui/material";

export default function Home() {
  return (
   <>
   <Container>
    <Typography variant="h1" sx={{color: 'primary.main'}}>Pantry Tracker</Typography>
   </Container>
   </>
  );
}
