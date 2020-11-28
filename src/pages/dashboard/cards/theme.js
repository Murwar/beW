import {createMuiTheme} from "@material-ui/core/styles";

export default createMuiTheme({
    overrides: {
        MuiCardActionArea: {
            root: {
                color: "#9E9E9E",

                "&:hover": {
                    backgroundColor: "#E3F2FD",
                    color: "#2E3A59"
                },

                "&:focus": {
                    backgroundColor: "rgba(33,150,243,0.44)",
                    color: "#2E3A59"
                }
            }
        }
    }
});