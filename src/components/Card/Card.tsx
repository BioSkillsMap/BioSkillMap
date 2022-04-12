import { FC, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Handlers from "./Handler/Handler";
import { NodeHandleBounds, useReactFlow } from "react-flow-renderer";
import Link from "next/link";
import type { Data } from "../../../utils/card-helpers";
import { useAppSelector } from "redux-hooks";
const CustomCard: FC<{
  data: Data;
  id: string;
  handleBounds: NodeHandleBounds;
}> = ({ data, id, handleBounds }) => {
  useEffect(() => {
    console.log(handleBounds);
  }, [handleBounds]);
  const changes = useAppSelector(({ changes }) => changes);
  const ReactFlowInstance = useReactFlow();
  return (
    <Card
      sx={{ minWidth: 275 }}
      style={{
        maxWidth: "350px",
      }}>
      <Handlers id={id} />
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
          {data.difficulty}
        </Typography>
        <Typography variant='h5' component='div'>
          {data.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color='text.secondary'></Typography>
        <Typography variant='body2'>{data.description}</Typography>
      </CardContent>
      <CardActions>
        <Button size='small'>
          <Link href={`/map/${id}`}>
            <a
              onClick={(e) => {
                const totalChanges = changes.reduce((acc, curr) => {
                  return (
                    acc +
                    changes
                      .filter((change) => change.id === curr.id)
                      .reduce((acc, curr) => {
                        const action = curr.type === "add" ? 1 : -1;
                        return acc + action;
                      }, 0)
                  );
                }, 0);
                if (totalChanges) e.preventDefault();
                const node = ReactFlowInstance.getNode(id);
                const coordinates = node?.positionAbsolute;
                const dimensions = { width: node?.width, height: node?.height };
                ReactFlowInstance.setCenter(
                  coordinates!.x + dimensions.width / 2,
                  coordinates!.y + dimensions.height / 2,
                  {
                    duration: 800,
                    zoom: 2,
                  }
                );
              }}>
              ZOOM
            </a>
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
};

export default CustomCard;
