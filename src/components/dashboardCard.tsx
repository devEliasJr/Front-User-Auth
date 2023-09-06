import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { deleteUser, getUser } from "../hooks/useUserActions";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useState } from "react";
import EditUserModal from "./editUserModal";

export default function DashboardCard({ id, name, email }: CardProps) {
  const [userId, setUserId] = useState<string>();
  const queryClient = useQueryClient();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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

  const handleEdit = async (id: string) => {
    setUserId(id);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
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
          {/* Modal de edição */}
          <EditUserModal
            isOpen={isEditModalOpen}
            onClose={handleCloseEditModal}
            userId={userId}
          />
        </Card>
      )}
    </>
  );
}
