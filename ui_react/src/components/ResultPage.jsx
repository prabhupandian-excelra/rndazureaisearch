import { Grid } from "@mui/material";
import ResultsList from "./ResultsList";
import DetailsPanel from "./DetailsPanel";

const ResultPage = ({ data, selected, setSelected }) => {
    return (
        <Grid container>
            <Grid size={selected ? 8 : 12}>
                <ResultsList data={data} onSelect={setSelected} selected={selected} />
            </Grid>
            {selected?.name && (
                <Grid size={3} sx={{ position: "fixed", right:'1%'  }}>
                    <DetailsPanel data={selected} />
                </Grid>
            )}
        </Grid>
    )
}
export default ResultPage