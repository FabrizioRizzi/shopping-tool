import {
  AppBar,
  Box,
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { spesaSnapshot, startFirebase, updatePurchased } from './firebase';
import { ShoppingItem } from './interfaces';
import { onSnapshot } from "firebase/firestore";

function App() {
  const [spesa, setSpesa] = useState<ShoppingItem[]>([]);

  useEffect(() => {
    startFirebase();

    const query = spesaSnapshot();
    const subscription = onSnapshot(query, (querySnapshot) => {
      setSpesa(querySnapshot.docs.map(doc => ({ ...doc.data() as ShoppingItem, id: doc.id })));
    });

    return () => subscription();
  }, [])

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Shopping Tool
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <List>
        {spesa.map((shoppingItem) => (
          <ListItem key={shoppingItem.id}>
            <ListItemIcon>
              <Checkbox
                checked={shoppingItem.purchased}
                onChange={(event) => updatePurchased(shoppingItem.id, event.target.checked)}
              />
            </ListItemIcon>
            <ListItemText primary={shoppingItem.description} />
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default App;
