import React from 'react';
import { Container, Typography, Paper, Box, Grid } from '@mui/material';
import { motion } from 'framer-motion';

const About = () => {
  const steps = [
    { title: 'Upload Image', description: 'Click the upload area to select an image from your device.' },
    { title: 'Analyze', description: 'Click the "Predict" button to analyze the image using our AI model.' },
    { title: 'View Results', description: 'See the detected objects and their probabilities.' },
    { title: 'Explore', description: 'Check out related content and learn more about the detected objects.' },
  ];

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h2" align="center" sx={{ mb: 6 }} className="rajdhani-bold">
          About Nirikshaka
        </Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Paper elevation={3} sx={{ p: 4, mb: 8 }}>
          <Typography variant="body1" sx={{ mb: 2 }} className="rajdhani-regular">
            Nirikshaka is an advanced object detection tool powered by TensorFlow.js and MobileNet. It leverages state-of-the-art machine learning algorithms to analyze images and identify objects with high accuracy.
          </Typography>
          <Typography variant="body1" className="rajdhani-regular">
            Our model is trained on a vast dataset, enabling it to recognize a wide range of objects across various categories. From everyday items to complex scenes, Nirikshaka provides quick and reliable object detection.
          </Typography>
        </Paper>
      </motion.div>

      <Typography variant="h4" align="center" sx={{ mb: 4 }} className="rajdhani-bold">
        How to Use Nirikshaka
      </Typography>

      <Grid container spacing={4}>
        {steps.map((step, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.2, duration: 0.5 }}
            >
              <Paper elevation={3} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Typography variant="h2" sx={{ mb: 2, color: 'primary.main' }}>
                    {index + 1}
                  </Typography>
                </motion.div>
                <Typography variant="h6" align="center" sx={{ mb: 2 }} className="rajdhani-semibold">
                  {step.title}
                </Typography>
                <Typography variant="body2" align="center" className="rajdhani-regular">
                  {step.description}
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default About;