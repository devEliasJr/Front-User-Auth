import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { deleteUser, getUsers } from "../hooks/useUserActions";
import { useMutation, useQuery, useQueryClient } from "react-query";

type CardProps = {
  id: string;
  name: string;
  email: string;
};

export default function DashboardCard({ id, name, email }: CardProps) {
  const queryClient = useQueryClient();

  const buttonsActions = [
    { key: 1, text: "See More", action: () => handleSeeMore(id) },
    { key: 2, text: "Edit", action: () => handleEdit(id) },
    { key: 3, text: "Delete", action: () => handleDelete(id) },
  ];

  const mutation = useMutation({
    mutationFn: deleteUser,
  });

  const handleDelete = async (id: string) => {
    const shouldDelete = window.confirm(
      "Tem certeza que deseja excluir este usuário?"
    );

    if (shouldDelete) {
      await deleteUser(id);
      queryClient.invalidateQueries("usersdata");
    }
  };

  const handleSeeMore = (id: string) => {
    console.log(`See ${id}`);
  };

  const handleEdit = (id: string) => {
    console.log(`Edit ${id}`);
  };

  return (
    <>
      {mutation.isLoading ? (
        "loading"
      ) : (
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
      )}
    </>
  );
}
