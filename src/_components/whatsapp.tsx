"use client";

import { useState, useRef, useEffect } from "react";
import { Box, Button, Paper, Typography, Grow } from "@mui/material";
import { WhatsApp, Close } from "@mui/icons-material";

const WhatsAppButton: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const toggleModal = () => {
    setOpen((prev) => !prev);
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => document.removeEventListener("click", handleClickOutside);
  }, [open]);

  return (
    <Box sx={{ position: "fixed", bottom: 24, left: 24, zIndex: 1000 }}>
      {/* WhatsApp Button */}
      <Button
        onClick={toggleModal}
        sx={{
          width: 56,
          height: 56,
          minWidth: "unset",
          borderRadius: "50%",
          backgroundColor: "#25D366",
          boxShadow: 3,
          "&:hover": { backgroundColor: "#128C7E" },
        }}
      >
        {open ? (
          <Close sx={{ color: "white", fontSize: 28 }} />
        ) : (
          <WhatsApp sx={{ color: "white", fontSize: 28 }} />
        )}
      </Button>

      {/* Modal (Positioned above the button, aligned to the left) */}
      <Grow in={open}>
        <Paper
          ref={modalRef}
          elevation={6}
          sx={{
            position: "absolute",
            bottom: 80, // Adjusted distance from button
            left: 0, // Aligned to the left
            width: 300,
            bgcolor: "white",
            borderRadius: 2,
            boxShadow: 3,
            p: 2,
            border: "1px solid #e0e0e0",
          }}
        >
          {/* Modal Header */}
          <Box
            sx={{
              bgcolor: "#25D366",
              color: "white",
              p: 2,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
            }}
          >
            <Typography variant="h6" sx={{ fontSize: 16, fontWeight: "bold" }}>
              Contact WhatsApp
            </Typography>
          </Box>

          {/* Modal Content */}
          <Box sx={{ p: 2 }}>
            <Typography
              variant="body2"
              sx={{ color: "green", fontWeight: "bold", mb: 1 }}
            >
              Disponible de 9h30 à 21h00
            </Typography>
            <Typography variant="body2" sx={{ color: "gray" }}>
              Service client expert :
              <br />• Conseil technique personnalisé
              <br />• Support installation/réparation
            </Typography>

            <Button
              href="https://wa.me/+33651084994"
              target="_blank"
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                backgroundColor: "#25D366",
                "&:hover": { backgroundColor: "#128C7E" },
              }}
              startIcon={<WhatsApp />}
            >
              Contactez-nous
            </Button>
          </Box>
        </Paper>
      </Grow>
    </Box>
  );
};

export default WhatsAppButton;
