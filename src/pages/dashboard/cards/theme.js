import {createMuiTheme} from "@material-ui/core/styles";

export default createMuiTheme({
    overrides: {
        MuiCardActionArea: {
            root: {
                color: "#9E9E9E",

                "&:hover": {
                    backgroundColor: "rgba(33,150,243,0.44)",
                    color: "#2E3A59"
                },

                "&:focus": {
                    backgroundColor: "#2196F3",
                    color: "#2E3A59"
                }
            }
        }
    }
});