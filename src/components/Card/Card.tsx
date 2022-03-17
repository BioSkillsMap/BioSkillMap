import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Handle, Position } from "react-flow-renderer";
import { Data } from "../Tree/assets/tree";
import { Link } from "react-router-dom";
const bull = (
  <Box
    component='span'
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}>
    •
  </Box>
);

const CustomCard: React.FC<{ data: Data }> = ({ data }) => {
  console.log(data);
  return (
    <Card
      sx={{ minWidth: 275 }}
      style={{
        maxWidth: "350px",
      }}>
      <Handle type='target' position={Position.Top} />
      <Handle type='source' position={Position.Bottom} />
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
          {data.level}
        </Typography>
        <Typography variant='h5' component='div'>
          {data.id}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color='text.secondary'></Typography>
        <Typography variant='body2'>{data.description}</Typography>
      </CardContent>
      <CardActions>
        <Button size='small'>
          <a href={data.resource}> Resource </a>
        </Button>
      </CardActions>
    </Card>
  );
};

export default CustomCard;
