import {
  Box,
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useEffect, useState } from "react";
import { deleteShoppingItem, spesaSnapshot, startFirebase, updatePurchased } from "./firebase";
import { ShoppingItem } from "./interfaces";
import { onSnapshot } from "firebase/firestore";
import Header from "./components/Header";
import AddModal from "./components/AddModal";

function App() {
  const [spesa, setSpesa] = useState<ShoppingItem[]>([]);
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);

  const onOpenAddModal = () => {
    setOpenAddModal(true);
  };

  const onCloseAddModal = () => {
    setOpenAddModal(false);
  };

  useEffect(() => {
    startFirebase();

    const query = spesaSnapshot();
    const subscription = onSnapshot(query, (querySnapshot) => {
      setSpesa(querySnapshot.docs.map(doc => ({ ...doc.data() as ShoppingItem, id: doc.id })));
    });

    return () => subscription();
  }, []);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Header addItem={onOpenAddModal} />
      </Box>
      <List>
        {spesa.map((shoppingItem) => (
          <ListItem
            key={shoppingItem.id}
            secondaryAction={
              <Button color="inherit" onClick={() => deleteShoppingItem(shoppingItem.id)}>Delete</Button>
            }
          >
            <ListItemIcon>
              <Checkbox
                checked={shoppingItem.purchased}
                onChange={(event) => updatePurchased(shoppingItem.id, event.target.checked)}
              />
            </ListItemIcon>
            <ListItemText primary={`${shoppingItem.description} (${shoppingItem.price} €)`} />
          </ListItem>
        ))}
      </List>
      <AddModal openAddModal={openAddModal} onCloseAddModal={onCloseAddModal} />
    </>
  );
}

export default App;
