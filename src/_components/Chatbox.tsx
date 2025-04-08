"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import {
  Box,
  Button,
  Paper,
  Typography,
  Grow,
  IconButton,
  TextareaAutosize,
} from "@mui/material";
import { ChatBubble, Close } from "@mui/icons-material";
import { useTranslations } from "next-intl";

interface Message {
  sender: "user" | "bot";
  text: string;
}

// Palette orange personnalisée
const orangePalette = {
  main: "#ff6f00",
  light: "#ff9e40",
  dark: "#c43e00",
  contrastText: "#fff",
};

export default function ChatBox() {
  const t = useTranslations();

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Questions pré-définies mises à jour pour être cohérentes avec les clés du serveur
  const presetQuestions = [
    t("bonjour"),
    t("quels sont vos horaires"),
    t("quels types déquipements sono proposez-vous"),
    t("comment fonctionne la location"),
    t("comment réserver"),
    t("avez-vous un service technicien?"),
  ];

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  };

  useEffect(() => {
    if (open) {
      setTimeout(scrollToBottom, 100);
    }
  }, [messages, open]);

  const toggleChat = () => setOpen(!open);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { sender: "user", text };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await response.json();
      console.log(data, "data");
      const botMessage: Message = { sender: "bot", text: data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: `${t(
            "Service temporairement indisponible Veuillez réessayer"
          )}`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePresetClick = (question: string) => sendMessage(question);

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
      setInput("");
    }
  };

  return (
    <>
      {!open && (
        <IconButton
          onClick={toggleChat}
          sx={{
            position: "fixed",
            bottom: 15,
            right: 15,
            bgcolor: orangePalette.main,
            color: "white",
            width: 56,
            height: 56,
            borderRadius: "50%",
            boxShadow: 3,
            zIndex: 11111,
            "&:hover": { bgcolor: orangePalette.dark },
          }}
        >
          <ChatBubble fontSize="large" />
        </IconButton>
      )}

      <Grow in={open}>
        <Paper
          elevation={6}
          sx={{
            position: "fixed",
            bottom: 24,
            right: 24,
            width: 350,
            height: "70vh",
            maxHeight: "90vh",
            display: "flex",
            flexDirection: "column",
            zIndex: 100011,
            overflow: "hidden",
            bgcolor: "background.paper",
          }}
        >
          {/* En-tête */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              bgcolor: orangePalette.main,
              color: "white",
              p: 2,
              flexShrink: 0,
            }}
          >
            <Typography variant="h6">{t("Assistance Client")}</Typography>
            <IconButton
              onClick={toggleChat}
              sx={{
                color: "white",
                "&:hover": { bgcolor: orangePalette.dark },
              }}
            >
              <Close />
            </IconButton>
          </Box>

          {/* Questions pré-définies */}
          <Box
            sx={{
              p: 2,
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              borderBottom: "1px solid",
              borderColor: "divider",
              flexShrink: 0,
            }}
          >
            {presetQuestions.map((q, i) => (
              <Button
                key={i}
                variant="outlined"
                size="small"
                onClick={() => handlePresetClick(q)}
                sx={{
                  color: orangePalette.main,
                  borderColor: orangePalette.light,
                  "&:hover": {
                    borderColor: orangePalette.dark,
                    bgcolor: `${orangePalette.light}10`,
                  },
                }}
              >
                {q}
              </Button>
            ))}
          </Box>

          {/* Zone de messages avec scroll */}
          <Box
            ref={containerRef}
            sx={{
              flex: 1,
              overflowY: "auto",
              p: 2,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              "&::-webkit-scrollbar": {
                width: "6px",
              },
              "&::-webkit-scrollbar-track": {
                bgcolor: "#f5f5f5",
              },
              "&::-webkit-scrollbar-thumb": {
                bgcolor: orangePalette.light,
                borderRadius: "4px",
                "&:hover": {
                  bgcolor: orangePalette.main,
                },
              },
            }}
          >
            {messages.map((msg, i) => (
              <Box
                key={i}
                sx={{
                  alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                  maxWidth: "85%",
                  p: 2,
                  borderRadius: 4,
                  bgcolor:
                    msg.sender === "user" ? orangePalette.main : "grey.100",
                  color: msg.sender === "user" ? "white" : "text.primary",
                  boxShadow: 1,
                  wordBreak: "break-word",
                }}
              >
                <Typography variant="body2">{msg.text}</Typography>
              </Box>
            ))}
            <div ref={messagesEndRef} />
          </Box>

          {/* Zone de saisie */}
          <Box
            sx={{
              p: 2,
              borderTop: "1px solid",
              borderColor: "divider",
              flexShrink: 0,
            }}
          >
            <Box sx={{ display: "flex", gap: 1, alignItems: "flex-end" }}>
              <TextareaAutosize
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Écrivez votre message..."
                disabled={isLoading}
                style={{
                  flex: 1,
                  minHeight: 40,
                  maxHeight: 100,
                  padding: "8px 12px",
                  borderRadius: "8px",
                  border: `1px solid ${orangePalette.light}`,
                  resize: "none",
                }}
              />
              <Button
                variant="contained"
                onClick={() => {
                  sendMessage(input);
                  setInput("");
                }}
                disabled={isLoading}
                sx={{
                  height: 40,
                  minWidth: 40,
                  bgcolor: orangePalette.main,
                  "&:hover": { bgcolor: orangePalette.dark },
                }}
              >
                {isLoading ? "..." : "↵"}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Grow>
    </>
  );
}
