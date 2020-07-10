import React, { useState, useCallback } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  Typography,
  Button,
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
  Container,
} from "@material-ui/core";
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

const ImportDataScreen: React.FC = () => {
  const classes = useStyles();

  const [filesB64, setfilesB64] = useState<Base64[]>([]);
  const [filesVisual, setFilesVisual] = useState<File[]>([]);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [numCfdis, setNumCfdis] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setFilesVisual(acceptedFiles);
    try {
      setfilesB64(
        await Promise.all(
          acceptedFiles.map(
            async (file: File): Promise<Base64> => await toBase64(file)
          )
        )
      );
    } catch (error) {
      console.log(error);
    }
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
    <Container>
      <Grid container spacing={3}>
        <Grid item>
          <h1>Cargar paquetes de XML</h1>
        </Grid>
        <Grid item lg={12} md={12} sm={12}>
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
        <Grid item lg={12} md={12} sm={12}>
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
            </CardContent>
          </Card>
          <br />
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={sendData}
            endIcon={<Icon>cloud</Icon>}
            fullWidth={true}
            disabled={disabled}
          >
            Cargar a la nube
          </Button>
          <br />
          {disabled && (
            <div className={classes.loading}>
              <LinearProgress />
            </div>
          )}
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
        </Grid>
      </Grid>
    </Container>
  );
};

export default ImportDataScreen;
