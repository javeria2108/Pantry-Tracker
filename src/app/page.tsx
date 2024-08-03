import Image from "next/image";
import styles from "./page.module.css";
import { Container, Typography, Box } from "@mui/material";
import ItemCard from "@/components/ItemCard";

export default function Home() {
  return (
    <Container 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
      }}
    >
      <Typography variant="h1" sx={{color: 'primary.main', mb: 4}}>
        Pantry Tracker
      </Typography>
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', gap: 2 }}>
        <ItemCard name="Apples" details="5 in stock" />
        <ItemCard name="Milk" details="2 cartons" />
        <ItemCard name="Bread" details="1 loaf" />
      </Box>
    </Container>
  );
}