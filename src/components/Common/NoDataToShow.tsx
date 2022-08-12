import { TableCell, TableRow } from '@material-ui/core';
import * as React from 'react';

export interface NoDataToShowProps {}

export function NoDataToShow(props: NoDataToShowProps) {
  return (
    <TableRow>
      <TableCell colSpan={6} style={{ textAlign: 'center' }}>
        <em>No data to show</em>
      </TableCell>
    </TableRow>
  );
}
