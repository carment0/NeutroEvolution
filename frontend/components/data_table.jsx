import React from 'react';
import PropTypes from 'prop-types';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import uuid from 'uuid/v1';


class DataTable extends React.Component {
  static propTypes = {
    avgStats: PropTypes.array.isRequired,
    fittestWhiteBloodCell: PropTypes.object.isRequired
  };

  get avgWhiteBloodCellStats() {
    const rows = this.props.avgStats.slice(0, this.props.avgStats.length).map((stat) => {
      return (
        <TableRow key={uuid()}>
          <TableCell numeric>{stat.fitness}</TableCell>
          <TableCell numeric>{stat.age}</TableCell>
          <TableCell numeric>{stat.eaten}</TableCell>
        </TableRow>
      );
    });
    return <TableBody>{rows}</TableBody>;
  }

  render() {
    return (
      <Paper className="data-table">
        <img src="/images/cartoon_background.jpg"/>
        
        <Typography className="title" color="primary" align="center">CURRENT FITTEST WBC</Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell >Fittness</TableCell>
              <TableCell >Age</TableCell>
              <TableCell >Bacterial Phagocytosis</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell numeric>{this.props.fittestWhiteBloodCell.fitness}</TableCell>
              <TableCell numeric>{this.props.fittestWhiteBloodCell.age}</TableCell>
              <TableCell numeric>{this.props.fittestWhiteBloodCell.eaten}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Typography className="title" color="primary" align="center">AVERAGE WBC STATS</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell >Average Fittness</TableCell>
              <TableCell >Average Age</TableCell>
              <TableCell >Average Bacterial Phagocytosis</TableCell>
            </TableRow>
          </TableHead>
          {this.avgWhiteBloodCellStats}
        </Table>
      </Paper>
    );
  }
}

export default DataTable;
