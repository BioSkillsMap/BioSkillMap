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
  useReactFlow,
  useUpdateNodeInternals,
} from "react-flow-renderer";
import { insertEdges$ } from "../Toolbar/Buttons/Add-Edge/AddEdge";
import { Data } from "../Tree/data/tree";
import { first, Subject } from "rxjs";
import { useAppDispatch, useAppSelector } from "../../../redux-hooks";
import { addHandler } from "./card-slice";
import { mousePosition$ } from "../Tree/Tree";

const bull = (
  <Box
    component='span'
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}>
    •
  </Box>
);
// const handler$ = new Subject<{ id: string; handler: JSX.Element }>();
export const newEdge$ = new Subject<Connection>();
const CustomCard: FC<{ data: Data; id: string }> = ({ data, id }) => {
  const ReactFlowInstance = useReactFlow();
  const [isEditing, setIsEditing] = useState(false);
  const handler = useAppSelector(({ handler }) => handler);
  const dispatch = useAppDispatch();
  useEffect(() => {
    insertEdges$.subscribe(setIsEditing);
  }, []);
  const updateNodeInternals = useUpdateNodeInternals();
  useEffect(() => {
    console.log(handler);
  }, [handler]);
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
          mousePosition$.pipe(first()).subscribe(({ x, y }) => {
            const targetID = (Math.random() + 1).toString(36).substring(7);
            const targetCard = ReactFlowInstance.getNode(target!);
            const { x: mapX, y: mapY } = ReactFlowInstance.project({ x, y });
            const { x: cardX, y: cardY } = targetCard!.position;

            console.log(mapX, mapY);
            console.log(cardX, cardY);
            const deltaX = mapX - cardX;
            const deltaY = mapY - cardY;

            let handleX = 0;
            let handleY = 0;
            if (deltaX < deltaY) {
              handleX = cardX;
              handleY = mapY;
            } else {
              handleX = mapX;
              handleY = cardY;
            }

            dispatch(
              addHandler({ id: targetCard!.id, handleX, handleY, targetID })
            );
            updateNodeInternals(target!);
            newEdge$.next({
              source,
              sourceHandle,
              target,
              targetHandle: targetID,
            });
          });
        }}
        type='source'
      />
      {handler[id]?.length
        ? handler[id].map(({ handleX, handleY, targetID }, index) => (
            <Handle
              // style={{
              //   left: handleX,
              //   top: handleY,
              // }}

              position={!(index % 2) ? Position.Left : Position.Right}
              type='target'
              id={targetID}
              key={targetID}
            />
          ))
        : null}
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
