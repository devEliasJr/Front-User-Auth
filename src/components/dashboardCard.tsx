import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

type CardProps = {
  name: string;
  email: string;
};

const handleSeeMore = () => {
  console.log('See')
};
const handleEdit = () => {
  console.log('Edit')
};
const handleDelete = () => {
  console.log('delete')
};

const buttonsActions = [
  { key: 1, text: "See More", action: handleSeeMore },
  { key: 2, text: "Edit", action: handleEdit },
  { key: 3, text: "Delete", action: handleDelete },
];

export default function DashboardCard({ name, email }: CardProps) {
  return (
    <Card>
      <CardMedia
        image="https://anbc.org.br/wp-content/uploads/2015/12/placeholder.gif"
        sx={{ width: "100%", height: 200 }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography gutterBottom variant="body2" component="div">
          {email}
        </Typography>
      </CardContent>
      <CardActions>
        {buttonsActions.map((item) => (
          <Button size="small" key={item.key} onClick={item.action}>
            {item.text}
          </Button>
        ))}
      </CardActions>
    </Card>
  );
}
