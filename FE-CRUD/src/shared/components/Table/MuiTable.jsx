import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const MuiTable = ({
    rows,
    columns,
    pagination,
    pageSize,
    filterModel,
    onFilterModelChange,
    checkboxSelection,
    selectionModel,
    onSelectionModelChange,
    editable,
    onEditRow,
  }) => {
    return (
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pagination={pagination}
          pageSize={pageSize}
          filterModel={filterModel}
          onFilterModelChange={onFilterModelChange}
          checkboxSelection={checkboxSelection}
          selectionModel={selectionModel}
          onSelectionModelChange={onSelectionModelChange}
          editable={editable}
          onEditRow={onEditRow}
        />
      </div>
    );
  };
  
  export default MuiTable;