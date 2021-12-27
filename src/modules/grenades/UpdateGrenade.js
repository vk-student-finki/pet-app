import {
  Alert,
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  Icon,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Slide,
  Table,
  TableCell,
  TableRow,
  TextField,
  DialogActions,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { GrenadesRepository } from "./GrenadesRepository";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { ProducersRepository } from "../producers/ProducersRepository";
import { CountriesRepository } from "../countries/CountriesRepository";
import EditIcon from "@mui/icons-material/Edit";
import { UpdateGrenadeValidator } from "./GrenadeValidator";
import { Upload } from "../common/Upload";
import axios from "axios";
import { SETTINGS } from "../common/Settings";
import DeleteIcon from "@mui/icons-material/Delete";
import { AttributeTypeRepository } from "../attributeTypes/AttributeTypeRepository";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const UpdateGrenade = ({}) => {
  const [globalFormError, setGlobalFormError] = useState();
  const [formFieldErrors, setFormFieldErrors] = useState();
  const [successMessage, setSuccessMessage] = useState(null);
  const [grenade, setGrenade] = useState({});
  const { id } = useParams();
  const [countries, setCountries] = useState();
  const [producers, setProducers] = useState();
  const [attachments, setAttachments] = useState([]);
  const [picturesDialogOpen, setPicturesDialogOpen] = useState(false);
  const [attributesDialogOpen, setAttributesDialogOpen] = useState(false);
  const [attributeTypes, setAttributeTypes] = useState([]);
  const [attributeValues, setAttributeValues] = useState([]);
  const [deletePictureDialogOpen, setDeletePictureDialogOpen] = useState();

  useEffect(() => {
    loadDataAttrubuteType(0, 1000);
  }, []);

  useEffect(() => {
    loadById(id);
  }, [attributeTypes]);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (attributesDialogOpen) => {
    setAttributesDialogOpen(attributesDialogOpen);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (picture) => {
    GrenadesRepository.removePicture(id, picture)
      .then((res) => {
        loadById(id);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const handleClickOpenDeletePicture = (grenade) => {
    setDeletePictureDialogOpen(grenade);
    setOpen(true);
  };

  const loadDataAttrubuteType = (page, size) => {
    AttributeTypeRepository.all(page, size)
      .then((res) => {
        // let values = [];
        // res.data.content.forEach((key, index) => {
        //   values[key.id + "_"] = null;
        // });
        // setAttributeValues(values);
        setAttributeTypes(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleUpload = () => {
    if (attachments && attachments.length > 0) {
      let data = new FormData();
      Object.keys(attachments).forEach((key) =>
        data.append("files", attachments[key])
      );

      GrenadesRepository.uploadPictures(id, "GRENADE", attachments)
        .then((res) => {
          console.log(res.data);
          setAttachments([]);
          loadById(id);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const loadById = (id) => {
    GrenadesRepository.get(id)
      .then((res) => {
        setGrenade(res.data);
        let values = [];
        attributeTypes?.content?.forEach((key, index) => {
          // console.log(key);
          console.log(res.data?.attributes);
          values[key.id + "_"] = res.data?.attributes[index]?.value;
          // console.log(values[key.id + "_"]);
        });
        setAttributeValues(values);
        console.log(values);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = () => {
    let attributes = [];
    for (var key in attributeValues) {
      attributes.push({
        attributeType: {
          id: key.substring(0, key.length - 1),
        },
        value: attributeValues[key],
      });
    }
    console.log(attributes);
    let formData = { ...grenade };
    formData.attributes = attributes;
    let valid = UpdateGrenadeValidator.isValidSync(formData);
    setFormFieldErrors();
    if (!valid) {
      let validationErrors = {};
      UpdateGrenadeValidator.validate(grenade, { abortEarly: false }).catch(
        (err) => {
          console.log(err.inner);
          err.inner.forEach((validationError) => {
            validationErrors[validationError.path] = {};
            validationErrors[validationError.path] = validationError.message;
          });
          console.log(validationErrors);
          setFormFieldErrors(validationErrors);
          return;
        }
      );
      return;
    }
    setGlobalFormError(null);
    setSuccessMessage(null);
    GrenadesRepository.updateGrenade(formData)
      .then((res) => {
        console.log(res);
        setSuccessMessage("Grenade is updated successfully");
        console.log("grenade updated");
      })
      .catch((err) => {
        console.log(err);
        setGlobalFormError(err);
      });
  };

  const handleChangeAttributeValue = (key, value) => {
    let data = { ...attributeValues };
    data[key] = value;
    setAttributeValues(data);
    console.log(data);
  };
  const handleChangeGrenadeData = (name, value) => {
    let data = { ...grenade };
    data[name] = value;
    setGrenade(data);
    console.log(data);
  };

  useEffect(() => {
    loadDataCountries(0, 1000);
  }, []);

  useEffect(() => {
    loadDataProducers(0, 1000);
  }, []);

  const loadDataCountries = (page, size) => {
    CountriesRepository.all(page, size)
      .then((res) => setCountries(res.data))
      .catch((err) => console.log(err));
  };

  const handleChangeCountry = (e) => {
    console.log(e.target.value);
    handleChangeGrenadeData(
      "country",
      countries.content.filter((c) => c.id === e.target.value)[0]
    );
  };

  const loadDataProducers = (page, size) => {
    ProducersRepository.all(page, size)
      .then((res) => setProducers(res.data))
      .catch((err) => console.log(err));
  };

  const handleChangeProducer = (e) => {
    console.log(e.target.value);
    handleChangeGrenadeData("producer", e.target.value);
  };

  return (
    <>
      {successMessage && (
        <>
          <Container style={{ marginTop: "20px", marginBottom: "-30px" }}>
            <Alert variant="filled" severity="success">
              {successMessage}
            </Alert>
          </Container>
        </>
      )}
      {globalFormError && (
        <Grid item xs={12} style={{ marginBottom: "10px" }}>
          <Alert severity="error">
            {globalFormError?.response?.data?.message}
          </Alert>
        </Grid>
      )}
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "#D35400" }}>
          <EditIcon />
        </Avatar>
        <Typography component="h1" variant="h5" style={{ fontWeight: "bold" }}>
          Edit Grenade
        </Typography>
      </Box>
      <Container maxWidth="xs" style={{ marginTop: "20px" }}>
        <Grid item xs={12}>
          <TextField
            label="Name"
            size="small"
            variant="outlined"
            color="warning"
            autoFocus
            fullWidth
            value={grenade?.name ? grenade?.name : ""}
            onChange={(e) => handleChangeGrenadeData("name", e.target.value)}
            error={formFieldErrors?.name}
            helperText={formFieldErrors?.name}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Description"
            size="small"
            variant="outlined"
            color="warning"
            multiline
            rows={4}
            fullWidth
            value={grenade?.description ? grenade?.description : ""}
            onChange={(e) =>
              handleChangeGrenadeData("description", e.target.value)
            }
            error={formFieldErrors?.description}
            helperText={formFieldErrors?.description}
            style={{ marginTop: "8px" }}
          />
        </Grid>
        <Grid item xs={12}>
          {countries?.content && (
            <FormControl color="warning" fullWidth style={{ marginTop: "8px" }}>
              <InputLabel id="demo-country-select-label">Country</InputLabel>
              <Select
                label="Country"
                labelId="demo-country-select-label"
                id="demo-country-select"
                value={grenade?.country?.id ? grenade?.country?.id : ""}
                onChange={handleChangeCountry}
                error={formFieldErrors?.description}
                helperText={formFieldErrors?.description}
              >
                <MenuItem> / </MenuItem>
                {countries?.content.map((country) => (
                  <MenuItem value={country?.id}>{country.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Grid>
        <Grid item xs={12}>
          {producers?.content && (
            <FormControl
              color="warning"
              fullWidth
              style={{ marginTop: "8px", marginBottom: "8px" }}
            >
              <InputLabel id="demo-producer-select-label">Producer</InputLabel>

              <Select
                label="Producer"
                labelId="demo-producer-select-label"
                id="demo-producer-select"
                value={grenade?.producer?.id ? grenade?.producer?.id : ""}
                onChange={handleChangeProducer}
              >
                <MenuItem> / </MenuItem>
                {producers?.content?.map((producer) => (
                  <MenuItem value={producer?.id}>{producer.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          <Grid container spacing={0.5} style={{ marginTop: "10px" }}>
            <Grid item xs={12} md={6}>
              <Button
                // color="warning"
                size="small"
                variant="contained"
                fullWidth
                onClick={() => {
                  setPicturesDialogOpen(true);
                }}
                style={{ backgroundColor: "#D35400" }}
              >
                Pictures
              </Button>
            </Grid>

            <Grid item xs={12} md={6}>
              <Button
                fullWidth
                size="small"
                variant="contained"
                onClick={() => {
                  handleClickOpen(true);
                }}
                style={{ backgroundColor: "#D35400" }}
              >
                Attributes
              </Button>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Button
              onClick={() => {
                handleSubmit();
              }}
              type="submit"
              style={{ backgroundColor: "#17202A", marginTop: "8px" }}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              fullWidth
            >
              Update
            </Button>
          </Grid>
        </Grid>
      </Container>
      <Dialog
        maxWidth="md"
        fullWidth={true}
        open={picturesDialogOpen}
        onClose={() => setPicturesDialogOpen(false)}
      >
        <DialogTitle>Pictures</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Upload
                attachments={attachments}
                setAttachments={setAttachments}
              />
              <Button
                color="success"
                variant="contained"
                size="small"
                onClick={() => {
                  handleUpload();
                }}
                style={{ marginLeft: "5px" }}
              >
                Submit pictures
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Table size="small">
                {grenade &&
                  grenade.pictures &&
                  grenade.pictures.map((picture, index) => (
                    <TableRow>
                      <TableCell>
                        <img
                          height="30px"
                          src={`${SETTINGS.API_BASE_URL}grenades/downloadGrenadeImage/${picture.id}`}
                        />
                      </TableCell>
                      <TableCell>{picture.name}</TableCell>
                      <TableCell style={{ width: "100px" }}>
                        {picture.type}
                      </TableCell>
                      <TableCell style={{ width: "50px" }}>
                        <IconButton
                          onClick={(e) => {
                            handleDelete(picture);
                          }}
                        >
                          <DeleteIcon color="error" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </Table>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
      <Dialog
        maxWidth="sm"
        fullWidth={true}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <EditIcon
          style={{
            color: "#F15E5E",
            marginLeft: "auto",
            marginRight: "auto",
            fontSize: "70px",
            marginTop: "10px",
          }}
        />
        <DialogTitle
          style={{
            fontWeight: "bold",
            fontFamily: "Monaco, monospace",
            float: "center",
          }}
        >
          Edit Attributes
        </DialogTitle>
        <DialogContent style={{ textAlign: "center" }}>
          <Container maxWidth="xs">
            {attributeValues &&
              attributeTypes?.content?.map((attributeType, index) => (
                <Grid item xs={12}>
                  <TextField
                    label={attributeType.name}
                    size="small"
                    value={
                      attributeValues[attributeType?.id + "_"]
                        ? attributeValues[attributeType?.id + "_"]
                        : ""
                    }
                    onChange={(e) =>
                      handleChangeAttributeValue(
                        attributeType?.id + "_",
                        e.target.value
                      )
                    }
                    variant="outlined"
                    color="warning"
                    fullWidth
                    style={{ marginTop: "8px" }}
                  ></TextField>
                </Grid>
              ))}
          </Container>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="outlined"
            size="large"
            style={{
              backgroundColor: "#C1C1C1",
              color: "white",
              border: "#C1C1C1",
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
