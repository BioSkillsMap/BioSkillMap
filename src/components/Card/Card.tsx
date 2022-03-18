import { useEffect, FC, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Handle, Position } from "react-flow-renderer";
import { insertEdges$ } from "../Toolbar/Buttons/Add-Edge/AddEdge";
import { Data } from "../Tree/data/tree";

const bull = (
  <Box
    component='span'
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}>
    •
  </Box>
);

const CustomCard: FC<{ data: Data }> = ({ data }) => {
  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
    insertEdges$.subscribe(setIsEditing);
  }, []);
  return (
    <Card
      sx={{ minWidth: 275 }}
      style={{
        maxWidth: "350px",
      }}>
      <Handle
        style={{
          position: "absolute",
          top: 0,
          visibility: isEditing ? "visible" : "hidden",
          width: "100%",
          height: "100%",
          borderRadius: "0",
          border: "none",
          background: "transparent",
          zIndex: "1",
        }}
        type='source'
      />
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
