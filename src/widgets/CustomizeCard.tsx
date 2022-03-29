import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { BehaviorSubject, Subject } from "rxjs";
import { useObservableState } from "observable-hooks";
import { FC, useState } from "react";
import { Node } from "react-flow-renderer";
import { createCard } from "../../utils/create-card";
export const openModal$ = new BehaviorSubject<boolean>(true);
export const Nodes$ = new Subject<Node>();
const CustomizeCard = () => {
  const open = useObservableState(openModal$);
  const close = () => openModal$.next(false);
  const [difficulty, setDifficulty] = useState("beginner");
  const [title, setTitle] = useState("");
  return (
    <Modal
      open={open}
      onClose={close}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <Box
        sx={{
          minWidth: "400px",
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "5px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}>
        <Typography id='modal-modal-title' variant='h5'>
          Create a new card
        </Typography>
        <TextField
          fullWidth
          sx={{
            margin: "1rem 0",
          }}
          value={title}
          id='standard-basic'
          label='Title'
          variant='standard'
          size='medium'
          onChange={(input) => setTitle(input.target.value)}
        />
        <FormControl
          sx={{
            minWidth: "150px",
            margin: "1rem 0",
          }}>
          <InputLabel id='demo-simple-select-label'>Difficulty</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={difficulty}
            label='Difficulty'
            onChange={(ch) => setDifficulty(ch.target.value)}>
            <MenuItem value='beginner'>Beginner</MenuItem>
            <MenuItem value='intermediate'>Intermediate</MenuItem>
            <MenuItem value='advanced'>Advanced </MenuItem>
          </Select>
        </FormControl>
        <Button
          sx={{
            maxWidth: "auto",
            marginTop: "1rem",
          }}
          variant='outlined'
          onClick={() => {
            Nodes$.next(createCard(title, difficulty));
          }}>
          SAVE
        </Button>
      </Box>
    </Modal>
  );
};

export default CustomizeCard;
