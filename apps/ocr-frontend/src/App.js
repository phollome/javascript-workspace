import React from "react";
import { CssBaseline, Drawer } from "@material-ui/core";
import { KeyProvider, ImageDataProvider, ResultProvider } from "./contexts";
import { AppToolbar, PreviewContainer } from "./components";
import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 400;

const useStyles = makeStyles(theme => ({
  appToolbar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
  },
}));

function App() {
  const classes = useStyles();
  return (
    <KeyProvider>
      <ImageDataProvider>
        <ResultProvider>
          <CssBaseline />
          <AppToolbar className={classes.appToolbar} />
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            <PreviewContainer />
          </Drawer>
        </ResultProvider>
      </ImageDataProvider>
    </KeyProvider>
  );
}

export default App;
