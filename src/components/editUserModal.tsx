import React, { useEffect, useState } from "react";
import { Modal, Button, TextField, Box } from "@mui/material";
import { editUser, getUser} from "../hooks/useUserActions";
import { useQueryClient } from "react-query";

type EditUserModalProps = {
  isOpen: boolean;
  onClose: () => void;
  userId: string | undefined;
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const EditUserModal: React.FC<EditUserModalProps> = ({
  isOpen,
  onClose,
  userId,
}) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchUserById = async () => {
      if (userId) {
        const response = await getUser(userId);
        setName(response.name);
        setEmail(response.email);
      }
    };
    fetchUserById();
  }, [userId]);

  const handleSave = async () => {
    const user = {
      name,
      email,
    };

    if (userId) {
      await editUser(userId, user);
      queryClient.invalidateQueries("usersdata");
    }
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <h2 id="modal-title">Edit User</h2>
        <TextField
          label="Nome"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="outlined"
          margin="normal"
        />
        <TextField
          label="Email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          margin="normal"
        />
        <Box display={"flex"} justifyContent={"center"} gap={4} py={2}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditUserModal;
