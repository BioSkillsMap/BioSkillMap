import { useEffect, FC, useState, useRef } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardTypeMap } from "@mui/material";
import {
  addEdge,
  Connection,
  Handle,
  Position,
  useUpdateNodeInternals,
} from "react-flow-renderer";
import { insertEdges$ } from "../Toolbar/Buttons/Add-Edge/AddEdge";
import { Data } from "../Tree/data/tree";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { Subject } from "rxjs";

const bull = (
  <Box
    component='span'
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}>
    •
  </Box>
);
const handler$ = new Subject<{ id: string; handler: JSX.Element }>();
export const newEdge$ = new Subject<Connection>();
const CustomCard: FC<{ data: Data }> = ({ data }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [handlers, setHandlers] = useState([] as JSX.Element[]);
  useEffect(() => {
    insertEdges$.subscribe(setIsEditing);
    handler$.subscribe(({ id, handler }) => {
      if (id === data.CardId) setHandlers([...handlers, handler]);
    });
  }, []);
  const updateNodeInternals = useUpdateNodeInternals();

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
        onConnect={({ source, sourceHandle, target, targetHandle }) => {
          handler$.next({
            id: target!,
            handler: (
              <Handle
                position={Position.Left}
                type='target'
                id='f'
                key={`${source} ${sourceHandle} ${target} ${targetHandle}`}
              />
            ),
          });
          updateNodeInternals(target!);
          newEdge$.next({
            source,
            sourceHandle,
            target,
            targetHandle: "f",
          });
        }}
        type='source'
      />
      {handlers.map((handler) => handler)}
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
