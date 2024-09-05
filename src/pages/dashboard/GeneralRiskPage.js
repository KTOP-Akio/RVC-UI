import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { useState, forwardRef } from 'react';
// @mui
import {
    Container,
    Card,
    CardHeader,
    Box,
    Button,
    Grid,
    Slide,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    TextField,
} from '@mui/material';
import {
    DataGrid,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarExport,
    GridToolbarFilterButton
} from '@mui/x-data-grid';
// icons
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
// components
import { useSettingsContext } from '../../components/settings';
// _mock_
import _mock from '../../_mock';

// ----------------------------------------------------------------------

const _dataGrid = [...Array(36)].map((_, index) => ({
    id: _mock.id(index),
    symbol: "",
    trading_engine_id: "",
    trading_account: "",
    max_short_position: "",
    max_long_position: "",
    max_lot_size: ""
}));

// ----------------------------------------------------------------------

export default function GeneralRiskPage() {
    const { themeStretch } = useSettingsContext();

    return (
        <>
            <Helmet>
                <title>General: Risk | Minimal UI</title>
            </Helmet>

            <Container maxWidth={themeStretch ? false : 'xl'}>
                <Card>
                    <CardHeader title="Risk Management" sx={{ mb: 2 }} />
                    <Box sx={{ height: 720 }}>
                        <CustomDataGrid data={_dataGrid} />
                    </Box>
                </Card>
            </Container>
        </>
    );
}

// ----------------------------------------------------------------------

const columns = [
    {
        field: 'id',
        hide: true,
    },
    {
        field: 'symbol',
        headerName: 'Symbol',
        flex: 1,
        editable: true,
    },
    {
        field: 'trading_engine_id',
        headerName: 'Trading Engine ID',
        flex: 1,
        editable: true,
    },
    {
        field: 'trading_account',
        headerName: 'Trading Account',
        flex: 1,
        editable: true,
    },
    {
        field: 'max_short_position',
        headerName: 'Max Short Position',
        type: 'number',
        flex: 1,
        editable: true,
    },
    {
        field: 'max_long_position',
        headerName: 'Max Long Position',
        type: 'number',
        flex: 1,
        editable: true,
    },
    {
        field: 'max_lot_size',
        headerName: 'Max Lot Size',
        type: 'number',
        flex: 1,
        editable: true,
    },
];

// ----------------------------------------------------------------------

CustomDataGrid.propTypes = {
    data: PropTypes.array,
};

function CustomDataGrid({ data }) {
    const [selectionModel, setSelectionModel] = useState([]);

    const selected = data.filter((row) => selectionModel.includes(row.id));

    console.log('SELECTED', selected);

    const onCellChange = (e) => {
        console.log(e);
    }

    return (
        <DataGrid
            checkboxSelection
            disableSelectionOnClick
            rows={data}
            columns={columns}
            pagination
            onSelectionModelChange={(newSelectionModel) => {
                setSelectionModel(newSelectionModel);
            }}
            components={{
                Toolbar: GridToolbarCustom,
            }}
            onCellEditCommit={onCellChange}
        />
    );
}

// ----------------------------------------------------------------------

function GridToolbarCustom() {
    const [openDialog, setOpenDialog] = useState(false);

    const onAddRow = () => {
        setOpenDialog(true);
        console.log("Add button clicked")
    };
    const onSave = () => {
        console.log("Save button clicked")
    };
    const onDelete = () => {
        console.log("Delete button clicked")
    };

    return (
        <GridToolbarContainer>
            <Grid container item xs>
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
                <GridToolbarExport />
            </Grid>

            <Grid>
                <Button startIcon={<AddCircleIcon />} onClick={onAddRow}>
                    Add
                </Button>
                <Button startIcon={<SaveIcon />} onClick={onSave}>
                    Save
                </Button>
                <Button startIcon={<DeleteIcon />} onClick={onDelete}>
                    Delete
                </Button>
            </Grid>
            <TransitionsDialogs openDialog={openDialog} setOpenDialog={setOpenDialog} />
        </GridToolbarContainer >
    );
}

// ----------------------------------------------------------------------

const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

TransitionsDialogs.propTypes = {
    openDialog: PropTypes.bool.isRequired,
    setOpenDialog: PropTypes.func.isRequired
};

function TransitionsDialogs({ openDialog, setOpenDialog }) {
    const [rowData, setRowData] = useState({
        symbol: '',
        tranding_engine_id: '',
        trading_account: '',
        max_short_position: '',
        max_long_position: '',
        max_lot_size: ''
    });

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleChange = (e) => {
        setRowData({ ...rowData, [e.target.name]: e.target.value });
    }

    const handleSave = () => {
        console.log(rowData);
        setOpenDialog(false);
    }

    return (
        <div>
            <Dialog
                open={openDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">Add New Row</DialogTitle>

                <DialogContent>
                    <TextField
                        name='symbol'
                        variant='outlined'
                        fullWidth
                        label="Symbol"
                        sx={{ mt: 2 }}
                        onChange={handleChange}
                    />
                    <TextField
                        name='tranding_engine_id'
                        variant='outlined'
                        fullWidth
                        label="Trading Engine ID"
                        sx={{ mt: 2 }}
                        onChange={handleChange}
                    />
                    <TextField
                        name='trading_account'
                        variant='outlined'
                        fullWidth
                        label="Trading Account"
                        sx={{ mt: 2 }}
                        onChange={handleChange}
                    />
                    <TextField
                        name='max_short_position'
                        variant='outlined'
                        fullWidth
                        label="Max Short Position"
                        sx={{ mt: 2 }}
                        onChange={handleChange}
                    />
                    <TextField
                        name='max_long_position'
                        variant='outlined'
                        fullWidth
                        label="Max Long Position"
                        sx={{ mt: 2 }}
                        onChange={handleChange}
                    />
                    <TextField
                        name='max_lot_size'
                        variant='outlined'
                        fullWidth
                        label="Max Lot Size"
                        sx={{ mt: 2 }}
                        onChange={handleChange}
                    />
                </DialogContent>

                <DialogActions>
                    <Button color="inherit" onClick={handleClose}>
                        Cancel
                    </Button>

                    <Button variant="contained" onClick={handleSave}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}