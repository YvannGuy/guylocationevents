"use client";
import Grid from "@mui/material/Grid2";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import Image from "next/image";

const AccordionContent = ({ faqData }) => {
  const [expanded, setExpanded] = useState("panel0");

  const handleChange = (panel) => (_event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <section className="faqs-area">
      <Grid className="container">
        <Grid className="row">
          <Grid className="col-lg-12">
            <Grid className="top-image">
              <Image
                src="/images/faq-img.png"
                width="285"
                height="195"
                alt="image"
              />
            </Grid>
            <Grid className="section-title">
              <p>Toutes les réponses pour louer en toute sérénité</p>
              <h2>QUESTIONS FRÉQUENTES SUR NOS SERVICES</h2>
              <Image
                src="/images/title-border.png"
                width="130"
                height="16"
                alt="border"
              />
            </Grid>
            <Grid className="accordion-question-answer">
              {faqData?.map((item, index) => (
                <Accordion
                  key={index}
                  expanded={expanded === `panel${index}`}
                  onChange={handleChange(`panel${index}`)}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${index}-content`}
                    id={`panel${index}-header`}
                  >
                    <Typography>{item.question}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>{item.answer}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </section>
  );
};

export default AccordionContent;
