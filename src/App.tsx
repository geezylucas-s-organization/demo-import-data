import React, { FunctionComponent, Fragment } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Modal,
  Fade,
  Backdrop,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Icon from "@material-ui/core/Icon";
import { useDropzone } from "react-dropzone";
import axios, { AxiosResponse } from "axios";

type Base64 = string | ArrayBuffer | null;

interface ServerResponse {
  data: ServerData;
}

interface ServerData {
  cfdisInsertados: number;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    pos: {
      marginBottom: 12,
    },
    titleSize: {
      fontSize: 14,
    },
    cardDrag: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px",
      borderWidth: 2,
      borderRadius: 2,
      borderColor: "#eeeeee",
      borderStyle: "dashed",
      backgroundColor: "#fafafa",
      color: "#bdbdbd",
      outline: "none",
      transition: "border .24s ease-in-out",
    },
    loading: {
      width: "100%",
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

const toBase64 = (file: File) =>
  new Promise<Base64>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const App: FunctionComponent<{}> = () => {
  const classes = useStyles();
  const [filesB64, setfilesB64] = React.useState<Base64[]>([]);
  const [filesVisual, setFilesVisual] = React.useState<File[]>([]);
  const [disabled, setDisabled] = React.useState<boolean>(false);
  const [numCfdis, setNumCfdis] = React.useState<number>(0);
  const [open, setOpen] = React.useState<boolean>(false);

  const onDrop = React.useCallback(async (acceptedFiles: File[]) => {
    setFilesVisual(acceptedFiles);
    setfilesB64(
      await Promise.all(
        acceptedFiles.map(
          async (file: File): Promise<Base64> => await toBase64(file)
        )
      )
    );
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: ".zip",
    onDrop,
  });

  const sendData = async () => {
    setDisabled(true);
    try {
      const response: AxiosResponse<ServerResponse> = await axios.post<
        ServerResponse
      >(
        "http://192.168.100.31:5000/api/cfdis/insertcfdismanually/5ee71721a66b4ae8e8eec2c5",
        {
          files: filesB64,
        }
      );
      setNumCfdis(response.data.data.cfdisInsertados);
    } catch (error) {
      console.log(error);
    } finally {
      setOpen(true);
      setDisabled(false);
    }
  };

  return (
    <Fragment>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Faccloud
          </Typography>
          <Button color="inherit">GUGH791023DD0</Button>
        </Toolbar>
      </AppBar>
      <Grid
        container
        spacing={3}
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item lg={8} md={8} sm={8}>
          <h1>Importar datos</h1>
        </Grid>
        <Grid item lg={8} md={8} sm={8}>
          <Card>
            <CardContent>
              <h4>Seleccionar únicamente los archivos ZIP</h4>
              <div {...getRootProps()} className={classes.cardDrag}>
                <input {...getInputProps()} />
                <p>Arrastre los archivos aquí, o click para seleccionarlos.</p>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={8} md={8} sm={8}>
          <Card>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Lista de archivos ZIP
              </Typography>
              <List>
                {filesVisual.map((file: File, index: number) => (
                  <ListItem key={index} button>
                    <ListItemText
                      primary={file.name}
                      secondary={`${Math.round(
                        file.size / Math.pow(1024, 1)
                      )} KB`}
                    />
                  </ListItem>
                ))}
              </List>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={sendData}
                endIcon={<Icon>send</Icon>}
                fullWidth={true}
                disabled={disabled}
              >
                Importar
              </Button>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={() => setOpen(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={open}>
                  <div className={classes.paper}>
                    <h2 id="transition-modal-title">Importar archivio ZIP</h2>
                    <p id="transition-modal-description">
                      Se insertaron {numCfdis} archivos XML correctamente.
                    </p>
                  </div>
                </Fade>
              </Modal>
            </CardContent>
          </Card>
          <br />
          {disabled && (
            <div className={classes.loading}>
              <LinearProgress />
            </div>
          )}
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default App;
