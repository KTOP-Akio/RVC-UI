import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
// @mui
import { Container, Card, CardHeader, Box, Button, Grid } from '@mui/material';
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
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

    const onAddRow = () => {
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
        </GridToolbarContainer >
    );
}
