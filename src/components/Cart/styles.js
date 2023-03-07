import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
  container: {
    position: "relative",
    marginTop: 100,
    backgroundColor: "#f5f4f2",
  },
  content: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 20,
  },
  buttons: {
    display: "flex",
    gap: 10,
  },
}));
