import { AppBar, Button, Toolbar, Typography } from "@mui/material";

interface HeaderProps {
  addItem: () => void;
}

const Header = ({addItem}: HeaderProps) => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Shopping Tool
      </Typography>
      <Button color="inherit" onClick={addItem}>Add</Button>
    </Toolbar>
  </AppBar>
)

export default Header;
