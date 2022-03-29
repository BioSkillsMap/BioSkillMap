import { FC } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Handlers from "./Handler/Handler";
import { useReactFlow } from "react-flow-renderer";
import { useAppDispatch } from "../../../redux-hooks";
import Link from "next/link";
import type { Data } from "../../../utils/create-card";

const CustomCard: FC<{ data: Data; id: string }> = ({ data, id }) => {
  return (
    <Card
      sx={{ minWidth: 275 }}
      style={{
        maxWidth: "350px",
      }}>
      <Handlers id={id} />
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
          {data.level}
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
            <a>ZOOM</a>
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
};

export default CustomCard;
