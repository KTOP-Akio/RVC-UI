import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
// @mui
import { Container, Card, CardHeader, Box, IconButton } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
// components
import { useSettingsContext } from '../../components/settings';
import Iconify from '../../components/iconify';
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
                <title> General: Risk | Minimal UI</title>
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
    // OPTIONS
    // https://mui.com/x/api/data-grid/grid-col-def/#main-content
    // - hide: false (default)
    // - editable: false (default)
    // - filterable: true (default)
    // - sortable: true (default)
    // - disableColumnMenu: false (default)

    // FIELD TYPES
    // --------------------
    // 'string' (default)
    // 'number'
    // 'date'
    // 'dateTime'
    // 'boolean'
    // 'singleSelect'

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
    {
        field: 'action',
        headerName: ' ',
        align: 'right',
        width: 80,
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        renderCell: (params) => (
            <IconButton onClick={() => console.log('ID', params.row.id)}>
                <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
        ),
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
                Toolbar: GridToolbar,
            }}
        />
    );
}