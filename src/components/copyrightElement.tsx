import { Link, Typography } from "@mui/material";

export function Copyright({ site, link }: ICopyrightProps) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" my={2}>
      {"Copyright © "}
      <Link color="inherit" href={link} target="_blank">
        {site}
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
