const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const { sendMail } = require('./controllers/confirmMail');
const { scheduleEmail } = require('./controllers/agenda'); // Import the scheduleEmail function
dotenv.config();
const PORT = 5000;

const app = express();
app.use(cors());
app.use(express.json());

app.post('/send', sendMail);

app.post('/api/save-flowchart', async (req, res) => {
  const flowcharts = req.body.flowcharts;
  
  if (!flowcharts) {
    return res.status(400).send('No flowcharts data provided');
  }

  // Loop through each flowchart
  for (const flowchart of flowcharts) {
    const flowchartId = flowchart.flowchartId;
    let nodeConnections = [];
    console.log(`Processing Flowchart ID: ${flowchartId}`);

    // Loop through each node to gather the connections and details
    for (const node of flowchart.nodes) {
      console.log(`Processing node: ${node.data.type}`);

      // Check for nodes that are of type 'text' (email-related nodes)
      if (node.data.type === 'text') {
        const { recipient, delay, emailContent } = node.data; // Destructure relevant details

        // Log node information
        console.log(`Node Info: Recipient: ${recipient}, Delay: ${delay}, Message: ${emailContent}`);

        // Format node information
        const nodeInfo = `Send Email to ${recipient} in ${delay} minutes with the message: "${emailContent}"`;
        nodeConnections.push(nodeInfo); // Add formatted string for email node
        
        // Schedule the email
        const sendAt = new Date(Date.now() + delay * 60 * 1000); // Calculate send time based on delay
        try {
          console.log(`Scheduling email for ${recipient} at ${sendAt.toLocaleString()}`);
          await scheduleEmail(recipient, 'Scheduled Email', emailContent, sendAt); // Call the scheduleEmail function
          console.log(`Scheduled email to ${recipient} at ${sendAt.toLocaleString()}`);
        } catch (err) {
          console.error('Error scheduling email:', err);
        }
      }
    }

    // Format the output to match the required format
    if (nodeConnections.length > 0) {
      console.log(`Flowchart ID: ${flowchartId}: ${nodeConnections.join(' -> ')}`);
    } else {
      console.log(`Flowchart ID: ${flowchartId}: No email nodes`);
    }
  }

  res.status(200).send('Flowchart data received, emails scheduled if applicable');
});

app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${PORT}`);
});
