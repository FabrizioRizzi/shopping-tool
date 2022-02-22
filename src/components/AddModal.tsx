import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import { addShoppingItem } from "../firebase";

interface AddModalProps {
  openAddModal: boolean;
  onCloseAddModal: () => void;
}

const AddModal = ({ openAddModal, onCloseAddModal }: AddModalProps) => {
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);

  const onChangeDescription = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };
  const onChangePrice = (event: ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(event.target.value));
  };

  const addNewItem = () => {
    addShoppingItem({ description, price }).then(() => onCloseAddModal());
  };

  return (
    <Dialog open={openAddModal} onClose={onCloseAddModal}>
      <DialogTitle>Add Shopping Item</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Descrizione"
            onChange={onChangeDescription}
          />
          <TextField
            margin="dense"
            type="number"
            id="price"
            label="Prezzo"
            onChange={onChangePrice}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseAddModal}>Cancel</Button>
        <Button onClick={addNewItem}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddModal;
